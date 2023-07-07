import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer ,  useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/signupScreen';
import SignInScreen from './screens/signinScreen';
import HomeScreen from './screens/homeScreen';
import {useEffect, useState, Component} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  //let strToken;
  var [strToken, setToken] = useState();
  var [strName, setName] = useState();
  var flag = false;
  const getToken = async () => {
    try {
        strToken = await AsyncStorage.getItem('localToken')
        if (!strToken){
          //console.log('no token')
          setToken(null)
          
        } else {
          //console.log('yes token')
          setToken(strToken)
        }
        //console.log(strToken);
      } catch(e) {
        console.log('Error storing token:', e);
      }
  };
  const getName = async () => {
    try {
        strName = await AsyncStorage.getItem('localName')
        if (!strName){
          //console.log('no token')
          setName('User')
          
        } else {
          //console.log('yes token')
          setName(strName)
        }
        //console.log(strToken);
      } catch(e) {
        console.log('Error storing name:', e);
      }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // Code to run every 30 seconds
      getToken()
      getName()
    }, 700); 

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [strToken]);
  console.log(strToken)
  console.log(strName)


  return (
    <NavigationContainer>
        {(strToken == null || undefined) ?
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: 'Sign In' }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Sign Up' }}
          />
        </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
        </Stack.Navigator>
        }
    </NavigationContainer>
  );
}
