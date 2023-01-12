import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HEIGHT=Dimensions.get("window").height;
import moment from 'moment';

export default function ProceedingsTotalTime({navigation}) {
 const[ProceedConcludeTime,setProceedConcludeTime]=useState('');
 const[ProceedStartTime,setProceedStartTime]=useState('');

 var startTime = moment(ProceedStartTime, 'HH:mm')
 var endTime = moment(ProceedConcludeTime, 'HH:mm')

 var hoursDiff = endTime.diff(startTime, 'hours',true)
 var TotalTime=moment.utc(moment.duration(hoursDiff , "hours").asMilliseconds()).format("HH:mm")
 //var minutesDiff = endTime.diff(startTime, 'minutes');
 //console.log('Hours:' + hoursDiff +' Minutes:' + minutesDiff );

   {/*---------------------------------------- useEffect----------------------------------------- */}
 useEffect(()=>{
  getData();
  getData1();
 },[])

   {/*---------------------------------------- getData using AsyncStorage----------------------------------------- */}
 const getData=async()=>{
try {
  const data1= await AsyncStorage.getItem('Screen-11')
  setProceedConcludeTime(data1)
} catch (error) {
  console.log(error)
}
 }

   {/*---------------------------------------- getData1 using AsyncStorage----------------------------------------- */}

 const getData1=async()=>{
  try {
    const data2= await AsyncStorage.getItem('Screen-08')
    setProceedStartTime(data2)
  } catch (error) {
    console.log(error)
  }
   }

       {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

       const StoreData=async()=>{
        try {
          var user={
            Total_Time:TotalTime
                   }
         await AsyncStorage.setItem('Screen-16',JSON.stringify(user))
         
        } catch (error) {
          console.log(error)
        }
      }
      

      
  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>Total duration of the proceedings:</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput}
 editable={false}
 keyboardType="numeric" 
 value={String(TotalTime)}  />
</View>


<TouchableOpacity 
onPress={()=>{if(ProceedConcludeTime.length==0)
  {
  Alert.alert('Error in Fetching date')
  }else{
    StoreData()
    navigation.navigate('17 of 37')
  }
}} 
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('15 of 37')} style={styles.backBtn}>
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