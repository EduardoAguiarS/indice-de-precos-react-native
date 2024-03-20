import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import { useAuth } from '../../Firebase';
import { useIsFocused } from '@react-navigation/native';

import InputComponent from '../common/Input'
import ButtonComponent from '../common/Button'

import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth();

export default SignIn = ({ navigation: navi }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    message: '',
  })

  const isFocused = useIsFocused();

  const [visible, setVisible] = useState(false)
  const onDismissSnackBar = () => setVisible(false)

  async function login() {
    if (value.email === '' || value.password === '') {
      setValue({ ...value, message: 'Preencha todos os campos' })
      setVisible(true)
      return
    }

    setValue({ ...value, message: '' })
    setVisible(false)

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password)
      
      if (isFocused) {
        navi.navigate('Lista de Produtos')
      }
    } catch (error) {
      setValue({ ...value, message: error.message })
      setVisible(true)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
        <InputComponent
          label="Email"
          value={value.email}
          onChange={text => setValue({ ...value, email: text })}
        />
        <InputComponent
          label="Senha"
          value={value.password}
          secureTextEntry
          onChange={text => setValue({ ...value, password: text })}
        />
        <ButtonComponent
          title="Entrar"
          onPress={login}
        />

        <Pressable
          onPress={() => navi.navigate('Sign Up')}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: '#003661', textAlign: 'center' }}>Não tem uma conta? <Text style={{ fontWeight: 'bold' }}>Cadastrar</Text></Text>
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