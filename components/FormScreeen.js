import { Text, View, StyleSheet, Pressable, Platform, ScrollView } from 'react-native'
import { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../Firebase';
import { ref, set, onValue, push } from "firebase/database";
import { useIsFocused } from '@react-navigation/native';

import InputComponent from './common/Input'
import ButtonComponent from './common/Button'

export default FormScreen = () => {
  const [produtos, setProdutos] = useState([])
  const [estabelecimento, setEstabelecimento] = useState('')
  const [categoria, setCategoria] = useState('')
  const [nome, setNome] = useState('')
  const [unidadeMedida, setUnidadeMedida] = useState('')
  const [preco, setPreco] = useState('')
  const [dateRegistration, setDateRegistration] = useState('')

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const [visible, setVisible] = useState(false)
  const onDismissSnackBar = () => setVisible(false)
  const [message, setMessage] = useState('')

  const inserirProduto = () => {
    const newKey = push(ref(db, 'prod')).key
    set(ref(db, 'prod/' + newKey), {
      estabelecimento,
      categoria,
      nome,
      unidadeMedida,
      preco,
      dateRegistration
    }).then(() => {

    }).catch((error) => {
      setMessage(error)
    })
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      let lista = []
      onValue(ref(db, 'prod'), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key
          const childData = childSnapshot.val()

          lista.push({
            key: childKey,
            estabelecimento: childData.estabelecimento,
            categoria: childData.categoria,
            nome: childData.nome,
            unidadeMedida: childData.unidadeMedida,
            preco: childData.preco,
            dateRegistration: childData.dateRegistration
          })
        })

        if (lista.length > 0) {
          setProdutos(lista)
        }
      })
    }
  }, [isFocused]);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate
      if (Platform.OS === 'android') {
        toggleDatePicker()
      }
      setDate(currentDate)
      setDateRegistration(currentDate.toLocaleDateString('pt-BR'))
    } else {
      toggleDatePicker()
    }
  }

  const dateInputRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
  const priceInputRegex = /^\d+(\.\d{1,2})?$/

  const onSubmit = () => {
    if (!estabelecimento.trim() || !categoria.trim() || !nome.trim() || !unidadeMedida.trim() || !preco.trim() || !dateRegistration) {
      setMessage('Preencha todos os campos!')
      setVisible(true)
      return
    }
    if (produtos) {
      for (let i = 0; i < produtos.length; i++) {
        if (produtos[i]?.nome === nome && produtos[i]?.estabelecimento === estabelecimento) {
          setMessage('Produto já foi cadastrado!')
          setVisible(true)
          return
        }
      }
    }

    if (!dateInputRegex.test(dateRegistration)) {
      setMessage('Data inválida! Formato: dd/mm/aaaa')
      setVisible(true)
      return
    }

    if (preco <= 0 || !priceInputRegex.test(preco)) {
      setMessage('Preço inválido!')
      setVisible(true)
      return
    }

    inserirProduto()
    setEstabelecimento('')
    setCategoria('')
    setNome('')
    setUnidadeMedida('')
    setPreco('')
    setDateRegistration('')
    setMessage('Produto cadastrado com sucesso!')
    setVisible(true)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Produto</Text>
        <InputComponent label={"Estabelecimento"} placeholder={"Supermercado XPTO"} value={estabelecimento} onChange={setEstabelecimento} />
        <InputComponent label={"Categoria"} placeholder={"Bebidas"} value={categoria} onChange={setCategoria} />
        <InputComponent label={"Nome"} placeholder={"Coca-cola"} value={nome} onChange={setNome} />
        <InputComponent label={"Unidade de Medida"} placeholder={"KG"} value={unidadeMedida} onChange={setUnidadeMedida} />
        <InputComponent label={"Preço"} placeholder={"5.00"} value={preco} onChange={setPreco} type={"number-pad"} />
        {
          showPicker && (
            <DateTimePicker
              mode="date"
              value={date}
              display="default"
              onChange={onChange}
              style={styles.datePicker}
            />
          )
        }

        {
          Platform.OS !== 'android' && (
            <InputComponent label={"Data de Registro"} placeholder={"01/01/2024"} value={dateRegistration} onChange={setDateRegistration} editable={true} />
          )
        }

        {
          Platform.OS === 'android' && (
            <Pressable onPress={toggleDatePicker}>
              <InputComponent label={"Data de Registro"} placeholder={"01/01/2024"} value={dateRegistration} onChange={setDateRegistration} editable={false} press={toggleDatePicker} />
            </Pressable>
          )
        }

        <ButtonComponent title="Cadastrar" onPress={() => onSubmit()} />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
            style={{ backgroundColor: '#003661', color: '#fff' }}
            action={{
              label: 'Ok',
            }}
          >
            {message}
          </Snackbar>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000'
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
})