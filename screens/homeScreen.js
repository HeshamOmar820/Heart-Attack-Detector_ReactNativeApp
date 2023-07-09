import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Fontisto,
} from '@expo/vector-icons';
const api = require('../api');


const HomeScreen = () => {
    //var [heartRate, setHeartRate] = useState(0);
    let heartRate;
    let systolicBloodPressure;
    let diastolicBloodPressure;
    let heartRateVariability;
    let saturationPerOxygen;
    let temperature;
    let respirationRate;
    let faint;
    let sleep;
    let smoker;
    //let avgHR = 5;
    var [name, setName] = useState('fetching..');
    var [diagnose, setDiagnose] = useState('..');
    var [update, setUpdate] = useState('..');
    var [avgHR, setAvgHR] = useState('..');
    var [avgHRV, setAvgHRV] = useState('..');
    var [avgSBP, setAvgSBP] = useState('..');
    var [avgDBP, setAvgDBP] = useState('..');
    var [avgRR, setAvgRR] = useState('..');
    var [avgSpO2, setAvgSpO2] = useState('..');
    var [avgTemp, setAvgTemp] = useState('..');
  let strToken ;
  useEffect(() => {
    // Code to run when the screen is loaded
    const getToken = async () => {
      try {
          strToken = await AsyncStorage.getItem('localToken')
          console.log(strToken);
        } catch(e) {
          console.error('Error storing token:', error);
        }
    };
    getToken()
    const getName = async () => {
      try {
          strName = await AsyncStorage.getItem('localName')
          //console.log(strName);
          setName(strName)
        } catch(e) {
          console.error('Error storing token:', error);
        }
    };
    getName()

  }, []); 
  const logoutButton = () => {
    const getToken = async () => {
        try {
            strToken = await AsyncStorage.removeItem('localToken')
            //strToken = await AsyncStorage.setItem('localToken', null);
            console.log(strToken);
            //Restart();
          } catch(error) {
            console.error('Error storing token:', error);
          }
      };
      getToken()
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Code to run every 30 seconds
      //console.log({heartRate, SystolicBloodPressure, DiastolicBloodPressure, heartRateVariability, saturationPerOxygen, temperature, respirationRate, faint, sleep})
        heartRate = Math.floor(Math.random() * (110 - 50 + 1)) + 50;
        systolicBloodPressure = Math.floor(Math.random() * (130 - 80 + 1)) + 80;
        diastolicBloodPressure = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
        heartRateVariability = Math.floor(Math.random() * (105 - 55 + 1)) + 55;
        saturationPerOxygen = Math.floor(Math.random() * (100 - 95 + 1)) + 95;
        temperature = Math.floor(Math.random() * (39 - 35 + 1)) + 35;
        respirationRate = Math.floor(Math.random() * (18 - 12 + 1)) + 12;
        faint = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        sleep = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        smoker = Math.floor(Math.random() * (1 - 0 + 1)) + 0;


      fetch( api+'/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + strToken,
        },
        body: JSON.stringify({
            heartRate,
            systolicBloodPressure, 
            diastolicBloodPressure, 
            heartRateVariability, 
            saturationPerOxygen, 
            temperature, 
            respirationRate,
            sleep,
            faint,
            smoker,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.log);

        })
        .catch(error => {
          console.error(error);
        });
    
        fetch(api+'/avgLogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + strToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          setAvgHR(data.average.avgHR);
          setAvgHRV(data.average.avgHRV);
          setAvgRR(data.average.avgRR);
          setAvgDBP(data.average.avgDBP);
          setAvgSBP(data.average.avgSBP);
          setAvgSpO2(data.average.avgSpO2);
          setAvgTemp(data.average.avgTemp);
          //console.log({avgHR, avgHRV, avgRR, avgDBP ,avgSBP, avgSpO2, avgTemp});
        })
        .catch(error => {
          console.error(error);
        });
        fetch(api+'/diagnose', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + strToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          setDiagnose(data.diagnose.diagnose);
          setUpdate(data.diagnose.updatedAt);
          //console.log(diagnose)
        })
        .catch(error => {
          console.error(error);
        });
    }, 300000); // 30 seconds in milliseconds

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <ScrollView className="bg-white">
      <View className="w-full px-5 mt-14 mb-5">
        <Text className="text-2xl">
            Hello,
        </Text>
        <Text className="text-5xl font-bold mt-2">
            {name}
        </Text>
        <View className="flex mt-3">
          <View className="flex flex-row justify-between">
            <Text>
                Just now
            </Text>
            <Ionicons name="sync-outline" size={20} color="black"/>
          </View>
          <View className="grid grid-cols-2 gap-4 my-1">
            <View className="flex justify-center flex-row space-x-3">
              <View className="bg-[#FDEAF0] w-1/2 flex flex-col items-center justify-center rounded-2xl space-y-5 p-6">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row space-x-1 justify-center items-center">
                    <Ionicons name="heart-outline" size={26} color="#E10E73"/>
                    <Text className="text-[#E10E73] text-lg">
                      Heart Rate
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col items-center space-x-2">
                  <Text className="text-5xl font-bold text-[#E10E73]">
                    {avgHR}
                  </Text>
                  <Text className="text-lg text-[#E10E73]">
                    bpm
                  </Text>
                </View>
              </View>
              <View className="bg-[#F3E9FB] w-1/2 flex flex-col items-center justify-center rounded-2xl space-y-5 p-6">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row space-x-1 justify-center items-center">
                    <Ionicons name="heart-half-outline" size={26} color="#8500CD"/>
                    <Text className="text-[#8500CD] text-lg">
                      HRV
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col items-center space-x-2">
                  <Text className="text-5xl font-bold text-[#8500CD]">
                    {avgHRV}
                  </Text>
                  <Text className="text-lg text-[#8500CD]">
                    milliseconds
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex justify-center flex-row space-x-3">
              <View className="bg-[#E5F8F7] w-1/2 flex flex-col items-center justify-center rounded-2xl space-y-5 p-6">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row space-x-1 justify-center items-center">
                      <Fontisto name="blood-drop" size={26} color="#00B8AE" />
                      <Text className="text-[#00B8AE] text-lg">
                        SBP
                      </Text>
                  </View>
                </View>
                <View className="flex flex-col items-center space-x-2">
                  <Text className="text-5xl font-bold text-[#00B8AE]">
                    {avgSBP}
                  </Text>
                  <Text className="text-lg text-[#00B8AE]">
                    mmHg
                  </Text>
                </View>
              </View>
              <View className="bg-[#E8F1FC] w-1/2 flex flex-col items-center justify-center rounded-2xl space-y-5 p-6">
                  <View className="flex flex-row justify-between">
                    <View className="flex flex-row space-x-1 justify-center items-center">
                        <Fontisto name="blood-drop" size={26} color="#3466D6" />
                        <Text className="text-[#3466D6] text-lg">
                          DBP
                        </Text>
                    </View>
                  </View>
                  <View className="flex flex-col items-center space-x-2">
                    <Text className="text-5xl font-bold text-[#3466D6]">
                      {avgDBP}
                    </Text>
                    <Text className="text-lg text-[#3466D6]">
                      mmHg
                    </Text>
                  </View>
              </View>
            </View>
            <View className="flex justify-center flex-row space-x-3">
              <View className="bg-[#f6f8e5] w-1/2 flex flex-col items-center justify-center rounded-2xl space-y-5 p-6">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row space-x-1 justify-center items-center">
                      <Entypo name="air" size={26} color="#b8b500" />
                      <Text className="text-[#b8b500] text-lg">
                        RR
                      </Text>
                  </View>
                </View>
                <View className="flex flex-col items-center space-x-2">
                  <Text className="text-5xl font-bold text-[#b8b500]">
                    {avgRR}
                  </Text>
                  <Text className="text-lg text-[#b8b500]">
                    bpm
                  </Text>
                </View>
              </View>
              <View className="bg-[#fcf1e8] w-1/2 flex flex-col items-center justify-center rounded-2xl space-y-5 p-6">
                  <View className="flex flex-row justify-between">
                    <View className="flex flex-row space-x-1 justify-center items-center">
                        <FontAwesome5 name="fill" size={26} color="#d69b34" />
                        <Text className="text-[#d69b34] text-lg">
                          SpO2
                        </Text>
                    </View>
                  </View>
                  <View className="flex flex-col items-center space-x-2">
                    <Text className="text-5xl font-bold text-[#d69b34]">
                      {avgSpO2}
                    </Text>
                    <Text className="text-lg text-[#d69b34]">
                      percent (%)
                    </Text>
                  </View>
              </View>
            </View>
            <View className="flex justify-center flex-row space-x-3">
              <View className="bg-[#ecf8e5] w-1/2 flex flex-col items-center justify-center rounded-2xl space-y-5 p-6">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row space-x-1 justify-center items-center">
                      <FontAwesome5 name="temperature-high" size={26} color="#00b831" />
                      <Text className="text-[#00b831] text-lg">
                        Temperature
                      </Text>
                  </View>
                </View>
                <View className="flex flex-col items-center space-x-2">
                  <Text className="text-5xl font-bold text-[#00b831]">
                    {avgTemp}
                  </Text>
                  <Text className="text-lg text-[#00b831]">
                  C°
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex justify-center">
              <View className="bg-[#e1e3de] w-full flex flex-col items-center justify-center px-2 rounded-2xl space-y-5 p-6">
                <View className="flex flex-col justify-center items-center space-y-3">
                  <View className="flex flex-row w-full space-x-1 justify-start items-center">
                    <FontAwesome5 name="briefcase-medical" size={26} color="#acaaa5" />
                    <Text className="text-[#acaaa5] text-lg">
                      Diagnose
                    </Text>
                  </View>
                  <Text className="text-4xl font-bold text-left text-[#acaaa5]">
                    {diagnose}
                  </Text>
                  <Text className="text-base text-left text-[#acaaa5]">
                    Updated at {update}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity className="flex flex-row justify-end items-center my-2 space-x-2" onPress={logoutButton}>
              <Text className="font-bold text-lg">
                  Logout
              </Text>
              <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

  );
};

export default HomeScreen;
