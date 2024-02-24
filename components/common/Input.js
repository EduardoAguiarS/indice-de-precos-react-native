import { TextInput, StyleSheet, Text, View } from 'react-native'

export default InputComponent = ({ value, onChange, label, placeholder, type, editable, press }) => {

  return (
    <View>
      <Text style={{ color: '#003761', marginBottom: 5 }}>{label}</Text>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        style={styles.input}
        theme={{ colors: { primary: '#003761', text: '#003761' } }}
        value={value}
        onChangeText={onChange}
        keyboardType={type}
        editable={editable}
        onPressIn={press}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#003761',
    borderRadius: 5,
    padding: 10,
    color: '#003761'
  }
})