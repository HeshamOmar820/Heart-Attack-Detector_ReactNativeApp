import React, { useState , useEffect} from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation,  } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import  {SafeAreaView} from 'react-native-safe-area-context'
const api = require('../api');

const WelcomeScreen = () => {
    const navigation = useNavigation();

  return (
    <View className="bg-white flex items-center justify-center h-full w-full">
        <View className="flex-1 justify-center items-center pb-4 w-full">
            <Image
                source={ require('../assets/HomeHeaderImage.png')}
                className="w-auto h-auto flex content-center justify-center"
            />
        </View>
        <View className="flex-1 justify-start items-start relative">
            <View className="w-full px-5 flex items-center pt-10">
                <Text className="text-4xl max-w-4/5 text-justify flex-wrap pt-10 font-semibold text-[#090F29]">Welcome to your personal health care app</Text>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}} className="absolute flex flex-row items-center space-x-2 w-full mt-4 justify-end bottom-24 right-5">
                <Text className="text-3xl font-medium">
                    Get Started
                </Text>
                <AntDesign name="rightcircle" size={30} color="#090F29"/>
            </TouchableOpacity>
            
        </View>
    </View>
  );
};

export default WelcomeScreen;
