import { TextInput } from 'react-native-paper'

export default InputComponent = ({ value, onChange, label, placeholder }) => {

  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      style={{ marginBottom: 10, height: 40 }}
      theme={{ colors: { primary: '#003761', text: '#003761' } }}
      value={value}
      onChangeText={onChange}
    />
  )
}