import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    var [diagnose, setDiagnose] = useState('fetching..');
    var [avgHR, setAvgHR] = useState('fetching..');
    var [avgHRV, setAvgHRV] = useState('fetching..');
    var [avgSBP, setAvgSBP] = useState('fetching..');
    var [avgDBP, setAvgDBP] = useState('fetching..');
    var [avgRR, setAvgRR] = useState('fetching..');
    var [avgSpO2, setAvgSpO2] = useState('fetching..');
    var [avgTemp, setAvgTemp] = useState('fetching..');
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
          setDiagnose(data.diagnose.diagnose)
          //console.log(diagnose)
        })
        .catch(error => {
          console.error(error);
        });
    }, 30000); // 30 seconds in milliseconds

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <View>
      <Text>
        diagnose : {diagnose}
      </Text>
      <Text>
        heloo : {name}
      </Text>
      <Text>
        heartRate : {avgHR}
      </Text>
      <Text>
        heartRateVariability : {avgHRV}
      </Text>
      <Text>
        systolicBloodPressure : {avgSBP}
      </Text>
      <Text>
        diastolicBloodPressure : {avgDBP}
      </Text>
      <Text>
        respirationRate : {avgRR}
      </Text>
      <Text>
        saturationPerOxygen : {avgSpO2}
      </Text>
      <Text>
        temperature : {avgTemp}
      </Text>
      
        <Text onPress={logoutButton}>
            Logout
        </Text>
    </View>

  );
};

export default HomeScreen;
