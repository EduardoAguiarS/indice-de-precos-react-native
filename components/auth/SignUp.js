import { Text, View, StyleSheet, ScrollView, Pressable} from 'react-native'
import { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';

import InputComponent from '../common/Input'
import ButtonComponent from '../common/Button'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export default SignUp = ({ navigation: navi }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    message: '',
  })

  const [visible, setVisible] = useState(false)
  const onDismissSnackBar = () => setVisible(false)

  async function register() {
    if (value.password !== value.confirmPassword) {
      setValue({ ...value, message: 'As senhas precisam ser iguais' })
      setVisible(true)
      return
    }

    if (value.password.length < 6) {
      setValue({ ...value, message: 'As senhas precisam ter pelo menos 6 caracteres' })
      setVisible(true)
      return
    }

    if (value.email === '' || value.password === '') {
      setValue({ ...value, message: 'Preencha todos os campos' })
      setVisible(true)
      return
    }

    setValue({ ...value, message: '' })
    setVisible(false)

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password)
      setValue({ ...value, message: 'Usuário criado com sucesso' })
      setVisible(true)

      navi.navigate('Lista de Produtos')
    } catch (error) {
      setValue({ ...value, message: error.message })
      setVisible(true)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
        <InputComponent
          label="Email"
          value={value.email}
          onChange={(text) => setValue({ ...value, email: text })}
          type={'email-address'}
          keyboardType={'email-address'}
        />
        <InputComponent
          label="Senha"
          value={value.password}
          type="password"
          onChange={(text) => setValue({ ...value, password: text })}
          secure={true}
        />
        <InputComponent
          label="Confirmar Senha"
          value={value.confirmPassword}
          type="password"
          onChange={(text) => setValue({ ...value, confirmPassword: text })}
          secure={true}
        />
        <ButtonComponent
          title="Cadastrar"
          onPress={() => register()}
        />

        <Pressable
          onPress={() => navi.navigate('Sign In')}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: '#003661', textAlign: 'center' }}>Ja tem uma conta? <Text style={{ fontWeight: 'bold' }}>Entrar</Text></Text>
        </Pressable>

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
            {value.message}
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
})