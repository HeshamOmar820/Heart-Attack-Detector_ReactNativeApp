import React, { useState , useEffect} from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const api = require('../api');

const SignInScreen = () => {
    const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const storeToken = async (token) => {
    try {
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
        await AsyncStorage.setItem('localName', name);
        console.log(name);
        const strName = await AsyncStorage.getItem('localName')
        console.log(strName);
        
      } catch(e) {
        console.error('Error storing name:', error);
      }
  };
  const handleSignIn = () => {
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
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };
    
  return (
    <ScrollView className="bg-white">
      <View className="bg-white flex items-center justify-center min-h-screen py-10">
        <View className="flex-1 items-center justify-center w-full px-5">
          <Image
              source={ require('../assets/heart.png')}
              className="w-[300px] h-[300px] mb-16 flex content-center justify-center"
          />
          <TextInput
            placeholder="Email"
            value={email}
            inputMode='email'
            onChangeText={text => setEmail(text)}
            className="w-full h-12 border border-slate-200 px-4 text-xl mb-5"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            className="w-full h-12 border border-slate-200 px-4 text-xl mb-5"
          />
          <TouchableOpacity className="bg-[#42A9E6] w-full h-8 flex justify-center items-center mb-5" onPress={handleSignIn} >
            <Text className="text-base uppercase">Sign In</Text>
          </TouchableOpacity>

          <Pressable className="w-full" onPress={()=>{navigation.navigate('SignUp')}}>
            <Text className="text-sm text-left">
              Don't have an account yet? sign up!
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
