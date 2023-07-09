import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';

const api = require('../api');


const SignUpScreen = () => {
    const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('male');
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [geneticDiabetes, setGeneticDiabetes] = useState(false);
  const [geneticHeartDiseases, setGeneticHeartDiseases] = useState(false);
  const [smoker, setSmoker] = useState(false);
    
  const handleSignUp = () => {
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
    <ScrollView>
      <View className="bg-white w-full flex items-center justify-center min-h-screen overflow-y-scroll px-5 py-10">
        <Image
          source={ require('../assets/heart.png')}
          className="w-[250px] h-[250px] mb-5 flex content-center justify-center"
        />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          className="w-full h-12 border border-slate-200 px-4 text-xl mb-5"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          className="w-full h-12 border border-slate-200 px-4 text-xl mb-5"
          inputMode='email'
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          className="w-full h-12 border border-slate-200 px-4 text-xl mb-5"
        />
        <TextInput
          placeholder="age"
          value={age}
          onChangeText={text => setAge(text)}
          className="w-full h-12 border border-slate-200 px-4 text-xl mb-5"
          inputMode='tel'
        />
        <View className="w-full flex items-start">
          <Picker
            selectedValue={sex}
            style={{ height: 40, width: 180, padding:0, margin:0,}}
            onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
            className="w-full h-10 border-slate-200 border "
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <TextInput
          autoComplete='off'
          placeholder="height in Cm"
          value={height}
          onChangeText={text => setHeight(text)}
          className="w-full h-12 border border-slate-200 px-4 text-xl mb-5 mt-5"
          inputMode='tel'
        />
        <TextInput
          autoComplete='off'
          placeholder="weight in kg"
          value={weight}
          onChangeText={text => setWeight(text)}
          className="w-full h-12 border border-slate-200 px-4 text-xl mb-5"
          inputMode='tel'
        />
        <View className="w-full flex flex-row items-center space-x-2 mb-2">
          <Text className="text-lg font-medium">
              Check if you have genetic diabetes
          </Text>
          <Checkbox
            value={geneticDiabetes}
            onValueChange={setGeneticDiabetes}
            color={geneticDiabetes ? '#42A9E6' : '#000'}
          />
        </View>
        <View className="w-full flex flex-row items-center space-x-2 mb-2">
          <Text className="text-lg font-medium">
              Check if you have genetic heart diseases
          </Text>
          <Checkbox
            value={geneticHeartDiseases}
            onValueChange={setGeneticHeartDiseases}
            color={geneticHeartDiseases ? '#42A9E6' : '#000'}
          />
        </View>
        <View className="w-full flex flex-row items-center space-x-2 mb-5">
          <Text className="text-lg font-medium">
              Check if you are smoker
          </Text>
          <Checkbox
            value={smoker}
            onValueChange={setSmoker}
            color={smoker ? '#42A9E6' : '#000'}
          />
        </View>
        
        <TouchableOpacity className="bg-[#42A9E6] w-full h-8 flex justify-center items-center mb-5" onPress={handleSignUp} >
            <Text className="text-base uppercase">Sign Up</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
