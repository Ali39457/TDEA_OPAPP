import { StyleSheet, Text, View,TouchableOpacity,TextInput,Alert,Image,Pressable} from 'react-native';
import React,{useEffect,useState,useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LoginScreen({navigation}) {

  
  //--------------------------------States------------------------------------//

  const [username,setusername]=useState("");
  const URL='http://openparliament.pk/op_app/user_login_new.php?username='+username;
  


const HandleSubmit=async()=>{
  try {
    const resp =await axios.post(URL,{username:username})
    if(resp.data.status=='false'){
      Alert.alert(resp.data.message)
    }else{
      setTimeout(()=>{if (resp.data!= null) {
        AsyncStorage.setItem('@ApiData',JSON.stringify(resp.data))
        navigation.navigate('1 of 37')
        Alert.alert("Login Successfully!")
     
        }
        else {
          console.log('error')
        }
        },1000)
    }
   

  } catch (error) {
    console.log(error)
  }
}

   //--------------------------------Main Code------------------------------------//

  return (
      
    <View style={styles.container}>

<View style={styles.ProfileView}>
<Text style={styles.Text}>Welcome to TDEA-FAFEN Parliamentary Observation App</Text>
<Image source={require('../assets/user.png')} resizeMode="cover" style={styles.Image}></Image>
</View>
       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  value={username} placeholder="Username" onChangeText={(username)=>setusername(username)} />
       </View>
       
       <View style={styles.AddBtnView}>
<TouchableOpacity style={styles.AddBtn} onPress={HandleSubmit}>
    <Text style={styles.AddBtnText}>LOGIN</Text>
</TouchableOpacity>
</View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
         flex:1,
         padding:33,
         justifyContent:"center",
         backgroundColor:"#48C9B0",
    },
    TextInputView:{
        paddingLeft:13,
        paddingRight:13,
      },
      TextInput:{
        backgroundColor:"#fff",
        height:50,
        borderRadius:15,
        elevation:5,
        borderWidth:1,
        borderColor:"#F2F3F4",
        color:"#000",
        fontSize:15,
        fontFamily:"Montserrat-Regular",
        paddingHorizontal:10,
        marginTop:10
      },
      AddBtnView:{
        justifyContent:"center",
        alignItems:"center"
      },
      ProfileView:{
        justifyContent:"center",
        alignItems:"center"
      },
      AddBtn:{
        backgroundColor:"#40E0D0",
        height:40,
        borderRadius:15,
        elevation:5,
        borderTopWidth:0.5,
        borderLeftWidth:1,
        borderRightWidth:0.5,
        borderBottomWidth:1,
        borderColor:"#40E0D0",
        color:"#fff",
        paddingHorizontal:10,
        justifyContent:"center",
        width:"50%",
        marginTop:20
      },
      AddBtnText:{
        fontSize:14,
        paddingHorizontal:2,
        fontFamily:"Montserrat-Regular",
        color:"#fff",
        textAlign:"center"
    },
    Image:{
        height:120,
        width:120,
        borderRadius:60,
        borderColor:"lightgrey",
        overflow:"hidden",
        marginBottom:30,
        marginTop:30
          },
    Text:{
          fontFamily:"Montserrat-Medium",
          fontSize:17,
          textAlign:"center",
          color:"#fff"
          },
})