import { Text, View, StyleSheet } from 'react-native'

export default Header = ({ title }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003761',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: '#d58500',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
})