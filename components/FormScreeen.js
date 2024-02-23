import { Text, View, StyleSheet } from 'react-native'

export default FormScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>Form</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})