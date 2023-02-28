import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../data.json'
import {useDispatch} from 'react-redux';
import {loginUser} from '../src/store/userSlice';


const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation()
  const dispatch = useDispatch();

  const handleSignIn = () => {
    const user = data.users.find(user => user.username === username && user.password === password);

    if (user) {
      // Store authentication data in AsyncStorage
      AsyncStorage.setItem('auth', JSON.stringify(user));
       dispatch(loginUser(user));
      // Navigate to home screen
      navigation.navigate('Dashboard');
    } else {
      setError('Invalid username or password');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign In" onPress={handleSignIn} />
      <Text style={styles.footer}>Don't have an account? <Text onPress={() => navigation.navigate('SignUp')}>Sign up here</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
  },
});

export default SignInScreen;
