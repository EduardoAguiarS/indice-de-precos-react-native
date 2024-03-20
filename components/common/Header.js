import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useAuth } from '../../Firebase';

import { getAuth, signOut } from "firebase/auth";

export default Header = ({ title, navigation: navi }) => {
  const { user } = useAuth();

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navi.navigate('Sign In')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      
      {/* logout button */}
      {user &&<Pressable
        onPress={logout}
        style={styles.logoutBtn}
      >
        <Text style={{ color: '#fff', textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Sair</Text>
      </Pressable>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003761',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  logoutBtn: {
    backgroundColor: '#d58500',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 80,
  },
})