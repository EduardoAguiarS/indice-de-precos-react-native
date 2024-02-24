import { Text, View, StyleSheet } from 'react-native'
import { useState, useContext } from 'react';

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
  const [date, setDate] = useState(null)

  const onSubmit = () => {
    if (!estabelecimento.trim() || !categoria.trim() || !nome.trim() || !unidadeMedida.trim() || !preco.trim() || !date) {
      alert('Preencha todos os campos')
      return
    }
    for (let i = 0; i < produtos.length; i++) {
      if (produtos[i]?.nome === nome && produtos[i]?.estabelecimento === estabelecimento) {
        alert('Produto ja existe')
        return
      }
    }
    setProdutos([...produtos, { estabelecimento, categoria, nome, unidadeMedida, preco, date }])
    setEstabelecimento('')
    setCategoria('')
    setNome('')
    setUnidadeMedida('')
    setPreco('')
    setDate(null)
    alert('Produto cadastrado')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Produto</Text>
      <InputComponent label={"Estabelecimento"} placeholder={"Supermercado XPTO"} value={estabelecimento} onChange={setEstabelecimento} />
      <InputComponent label={"Categoria"} placeholder={"Bebidas"} value={categoria} onChange={setCategoria} />
      <InputComponent label={"Nome"} placeholder={"Coca-cola"} value={nome} onChange={setNome} />
      <InputComponent label={"Unidade de Medida"} placeholder={"KG"} value={unidadeMedida} onChange={setUnidadeMedida} />
      <InputComponent label={"Preço"} placeholder={"R$ 5,00"} value={preco} onChange={setPreco} />
      <ButtonComponent title="Cadastrar" onPress={() => onSubmit()} />
      <Text>{JSON.stringify(produtos)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#d58500'
  }
})