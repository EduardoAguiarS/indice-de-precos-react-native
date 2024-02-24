import { Pressable, Text, StyleSheet } from 'react-native'

export default ButtonComponent = ({ onPress, title }) => {
  return (
    <Pressable mode="contained" onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d58500',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})