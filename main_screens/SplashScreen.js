import { StyleSheet, Text, View,Image,Dimensions } from 'react-native'
import React,{ useEffect } from 'react';
const Height=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {

     //--------------------------------useEffect------------------------------------//

     useEffect(()=>{
      retrieveData();
      removeKeys();
      },[retrieveData])

      //--------------------------------retrieveData------------------------------------//
      
    const retrieveData = async () => {
  
      try {
         const Token = await AsyncStorage.getItem("@ApiData");

         setTimeout(()=>{if (Token != null) {
          navigation.navigate('1 of 37')
        }
        else {
          navigation.navigate('LoginScreen')
        }
        },3000)
      } catch (e) {
        console.log('Failed to fetch the data from storage!', e)
      }
    };

 //--------------------------------removeKeys-----------------------------------//

  const removeKeys=async()=>{
    try {
      const keys = ['Screen-01','Screen-02','Screen-03','Screen-04','Screen-05','Screen-06','Screen-07','Screen-08','Screen-09','Screen-10',
      'Screen-11','Screen-12','Screen-13','Screen-14','Screen-15','Screen-16','Screen-17','Screen-18','Screen-19','Screen-20','Screen-21',
      'Screen-22','Screen-23','Screen-24','Screen-25','Screen-26','Screen-27','Screen-28','Screen-29','Screen-30','Screen-31','Screen-32',
      'Screen-33','Screen-34','Screen-35','Screen-36','Screen-37']
      await AsyncStorage.multiRemove(keys)
     
    } catch (error) {
      console.log(error)
    }
  }

 //--------------------------------Main Code-----------------------------------//

  return (
    <View style={styles.container}>

      <View style={styles.TextView}>
      <Image source={require('../assets/TDEA-logo.png')} resizeMode="contain" style={styles.Image} />
      <Text style={styles.Text}>Welcome to TDEA-FAFEN Parliamentary Observation App</Text>
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#48C9B0",
    
  },
  TextView:{
   justifyContent:"center",
   alignItems:"center",
   height:Height-200
  },
  Text:{
    fontFamily:"Montserrat-Medium",
    fontSize:16,
    textAlign:"center",
    color:"#fff",
    width:"90%"
  },
  Image:{
    height:125,
    width:125,
    marginBottom:10
  }
})