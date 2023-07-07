import React, { useState , useEffect} from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const api = require('../api');

const SignInScreen = () => {
    const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const storeToken = async (token) => {
    try {
        //const jsonValue = JSON.stringify(token)
        await AsyncStorage.setItem('localToken', token);
        console.log(token);
        const strToken = await AsyncStorage.getItem('localToken')
        console.log(strToken);
        
      } catch(e) {
        console.error('Error storing token:', error);
      }
  };
  const storeName = async (name) => {
    try {
        //const jsonValue = JSON.stringify(token)
        await AsyncStorage.setItem('localName', name);
        console.log(name);
        const strName = await AsyncStorage.getItem('localName')
        console.log(strName);
        
      } catch(e) {
        console.error('Error storing name:', error);
      }
  };
  const handleSignIn = () => {
    // Send sign-in data to the server using an HTTP request (Axios or Fetch API)
    // Make sure to replace the API endpoint with your server's URL
    fetch(api+'/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        storeToken(data.token);
        storeName(data.name);
        //navigation.navigate('Home')

        // Handle success or error messages from the server
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };
    
  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSignIn} />

      <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
        <Text>
            son't have an account? sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
