import { Text, View, StyleSheet } from 'react-native'
import { useState, useContext } from 'react';
import { Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import InputComponent from './common/Input'
import ButtonComponent from './common/Button'

import { ProductsContext } from '../Context/Produtos'

export default FormScreen = ({ navigation }) => {
  const { produtos, setProdutos } = useContext(ProductsContext)
  const [estabelecimento, setEstabelecimento] = useState('')
  const [categoria, setCategoria] = useState('')
  const [nome, setNome] = useState('')
  const [unidadeMedida, setUnidadeMedida] = useState('')
  const [preco, setPreco] = useState('')
  const [date, setDate] = useState(new Date())

  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')

  const [visible, setVisible] = useState(false)
  const onDismissSnackBar = () => setVisible(false)
  const [message, setMessage] = useState('')

  const onChange = (e, selected) => {
    setShow(false)
    setDate(selected)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const onSubmit = () => {
    if (!estabelecimento.trim() || !categoria.trim() || !nome.trim() || !unidadeMedida.trim() || !preco.trim()) {
      setMessage('Preencha todos os campos!')
      setVisible(true)
      return
    }
    for (let i = 0; i < produtos.length; i++) {
      if (produtos[i]?.nome === nome && produtos[i]?.estabelecimento === estabelecimento) {
        setMessage('Produto já foi cadastrado!')
        setVisible(true)
        return
      }
    }

    setProdutos([...produtos, { estabelecimento, categoria, nome, unidadeMedida, preco, date }])
    setEstabelecimento('')
    setCategoria('')
    setNome('')
    setUnidadeMedida('')
    setPreco('')
    setDate(new Date())
    setVisible(true)
    setMessage('Produto cadastrado com sucesso!')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Produto</Text>
      <InputComponent label={"Estabelecimento"} placeholder={"Supermercado XPTO"} value={estabelecimento} onChange={setEstabelecimento} />
      <InputComponent label={"Categoria"} placeholder={"Bebidas"} value={categoria} onChange={setCategoria} />
      <InputComponent label={"Nome"} placeholder={"Coca-cola"} value={nome} onChange={setNome} />
      <InputComponent label={"Unidade de Medida"} placeholder={"KG"} value={unidadeMedida} onChange={setUnidadeMedida} />
      <InputComponent label={"Preço"} placeholder={"5.00"} value={preco} onChange={setPreco} type={"number-pad"} />
      <Text style={styles.dateText} onPress={() => showMode('date')}>{date.toLocaleDateString('pt-BR')}</Text>
      <ButtonComponent title="Cadastrar" onPress={() => onSubmit()} />
      {
        show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            display="default"
            locale="pt-BR"
            testID="dateTimePicker"
          />
        )
      }

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          // center element
          style={{ backgroundColor: '#003661', color: '#fff' }}
          action={{
            label: 'Ok',
          }}
        >
          {message}
        </Snackbar>
      </View>
    </View>
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
  dateText: {
    color: '#717171',
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
  }
})