import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { useContext, useState, useEffect } from 'react';
import { ProductsContext } from '../Context/Produtos'
import { Card } from 'react-native-paper';

export default HomeScreen = ({ navigation }) => {
  const optionsPerPage = [5, 10, 15, 20]
  const { produtos, setProdutos } = useContext(ProductsContext)

  const deleteProduct = (index) => {
    produtos.splice(index, 1)
    setProdutos([...produtos])
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={styles.container}>
        {
          produtos.length > 0 ?
            <>
              <Text style={styles.title}>Lista de Produtos</Text>
              {
                produtos.map((item, index) => (
                  <Card key={item.nome + item.estabelecimento + index} style={styles.card}>
                    <Card.Title titleStyle={styles.cardTitle} subtitleStyle={styles.cardSubtitle} title={item.nome} subtitle={item.estabelecimento} right={() => <Card.Actions><Text style={styles.action} onPress={() => deleteProduct(index)}>Excluir</Text></Card.Actions>} />
                    <Card.Content style={styles.cardContent}>
                      <Text><Text style={{ fontWeight: 'bold' }}>Categoria: </Text>{item.categoria}</Text>
                      <Text><Text style={{ fontWeight: 'bold' }}>Unidade de Medida: </Text> {item.unidadeMedida}</Text>
                      <Text><Text style={{ fontWeight: 'bold' }}>Preço: </Text> {Number(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                      <Text><Text style={{ fontWeight: 'bold' }}>Data: </Text> {item.dateRegistration}</Text>
                    </Card.Content>
                  </Card>
                ))
              }
            </>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#717171', textTransform: 'uppercase' }}>Nenhum registro encontrado</Text>
            </View>
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000'
  },
  card: {
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#F6F6F6'
  },
  action: {
    color: '#fff',
    backgroundColor: '#eb3b4f',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#d58500',
    marginBottom: -3
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: 8,
  }
})