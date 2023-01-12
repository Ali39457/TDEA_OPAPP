import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MinorityPresentCount({navigation}) {
  //-------------------------------------------useEffect----------------------------------//
  const[Value,setValue]=useState('');
  const[MinorityCount,setMinorityCount]=useState('');

 //-------------------------------------------useEffect to retrieveData for Screen-12----------------------------------//

 useEffect(()=>{
 retrieveData();
 },[])
 
 const retrieveData=async()=>{
try {
  const user = await AsyncStorage.getItem('Screen-12')
      .then(value=>{if(value!=null){
        const user=JSON.parse(value)
        setValue(user.Member_Attendance_Available)
      }})
      
} catch ({error}) {
  console.log(error)
}
 }

 //---------------------------------store data using AsyncStorage------------------------//

const StoreData=async()=>{
  try {
    var user={
      Minority_Members_present:MinorityCount
    }
    await AsyncStorage.setItem('Screen-14',JSON.stringify(user))
  } catch (error) {
    console.log(error)
  }

}

 //---------------------------------remove data using AsyncStorage------------------------//


 const removeData=async()=>{
  try {
    await AsyncStorage.removeItem('Screen-14')
  } catch (error) {
    console.log(error)
  }
}

 //-------------------------------------------Main Code----------------------------------//
  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>How many minority members were present?</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={1} onChangeText={(value)=>setMinorityCount(value)} />
</View>

      <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>

<TouchableOpacity 
onPress={()=>{if(MinorityCount.length==0)
  {
  Alert.alert('Give a head count!')
  }else{
    StoreData();
    navigation.navigate('15 of 37')
  }
}} 
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity 
 onPress={()=>{if(Value=='No')
  {
    navigation.navigate('13 of 37')
  }else{
    navigation.navigate('12 of 37')
  }
}}
  style={styles.backBtn}>
          <Text style={styles.icon2}>➤</Text>
 </TouchableOpacity>
        </View>
    
   
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#FFF",
    height:HEIGHT,
  },
  Text:{
    marginTop:25,
    marginBottom:20,
    fontFamily:"Montserrat-Bold",
    fontSize:17,
    paddingHorizontal:35,
    
  },
  TextInputView:{
    paddingLeft:33,
    paddingRight:33,
  },
  TextInput:{
    backgroundColor:"#48C9B0",
    height:60,
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    color:"#fff",
    fontSize:17,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10
  },
  forwardBtn:{
    backgroundColor:"#48C9B0",
    height:70,
    width:70,
    position:"absolute",
    bottom:20,
    right:33,
    borderRadius:35,
    justifyContent:"center",
    alignItems:"center",
    elevation:5,
    borderWidth:1,
    borderColor:"#F2F3F4",
    zIndex: 1
  },
  backBtn:{
    backgroundColor:"#48C9B0",
    height:70,
    width:70,
    position:"absolute",
    bottom:20,
    left:33,
    borderRadius:35,
    justifyContent:"center",
    alignItems:"center",
    elevation:5,
    borderWidth:1,
    borderColor:"#F2F3F4",
  },
  icon1:{
    fontSize:45,
    color:"#fff",
    left:4,
    bottom:2
  },
  icon2:{
    fontSize:45,
    color:"#fff",
    right:4,
    bottom:2,
    transform: [
        { rotateY: "180deg" },
      ]
},
modalBtn:{
  position:"absolute",
  right:10,
  top:5,
  backgroundColor:"#48C9B0",
  borderWidth:0.45,
  elevation:5,
  borderColor:"#F4F6F6",
  borderRadius:15,
  paddingHorizontal:15,
},
modalBtnText:{
  fontFamily:"Montserrat-Medium",
  fontSize:14,
  color:"#fff"
},  
 
  
 
})