import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
const api = require('../api');


const SignUpScreen = () => {
    const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [geneticDiabetes, setGeneticDiabetes] = useState(false);
  const [geneticHeartDiseases, setGeneticHeartDiseases] = useState(false);
  const [smoker, setSmoker] = useState(false);
    //console.log(AsyncStorage.getItem('jwtToken'))
    
    const storeToken = async (token) => {
        try {
            const jsonValue = JSON.stringify(token)
            await AsyncStorage.setItem('localToken', jsonValue);
            console.log(jsonValue);
            const strToken = await AsyncStorage.getItem('localToken')
            console.log(strToken);
          } catch(e) {
            console.error('Error storing token:', error);
          }
          
        
      };

  // Add other form fields as per your requirements
  const handleSignUp = () => {
    // Send sign-up data to the server using an HTTP request (Axios or Fetch API)
    // Make sure to replace the API endpoint with your server's URL
    fetch(api+'/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        name,
        email,
        password,
        age,
        sex,
        height,
        weight,
        geneticDiabetes,
        geneticHeartDiseases,
        smoker,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigation.navigate('SignIn');

      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
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
       <TextInput
        placeholder="age"
        value={age}
        onChangeText={text => setAge(text)}
      />
       <TextInput
        placeholder="sex"
        value={sex}
        onChangeText={text => setSex(text)}
      />
       <TextInput
        placeholder="height"
        value={height}
        onChangeText={text => setHeight(text)}
      />
       <TextInput
        placeholder="weight"
        value={weight}
        onChangeText={text => setWeight(text)}
      />
      <Checkbox
          value={geneticDiabetes}
          onValueChange={setGeneticDiabetes}
          color={geneticDiabetes ? '#4630EB' : '#222'}
        />
      <Checkbox
          value={geneticHeartDiseases}
          onValueChange={setGeneticHeartDiseases}
          color={geneticHeartDiseases ? '#4630EB' : '#222'}
        />
      <Checkbox
          value={smoker}
          onValueChange={setSmoker}
          color={geneticHeartDiseases ? '#4630EB' : '#222'}
        />
      {/* Add other form fields here */}
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
