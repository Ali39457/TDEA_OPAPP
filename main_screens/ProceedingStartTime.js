import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import React, { useState,useEffect} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HEIGHT=Dimensions.get("window").height;

export default function ProceedingStartTime({navigation}) {



//--------------------useEffect-----------------//
useEffect((date) => {
  retrieveData();
  handleConfirm();
}, [])

//-------------------retrieveData---------------//
const[CheckTime,setCheckTime]=useState(moment().format('HH:mm'));
const retrieveData = async () => {
  try{
    const user = await AsyncStorage.getItem('Screen-07')
    .then(value=>{if(value!=null){
      const user=JSON.parse(value)
      setCheckTime(user.Scheduled_Start_Time)
    }})
    
  }
   catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }

};


  //------------------------------------States------------------------------------------//

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const[startTime,setStartTime]=useState(moment().format('HH:mm'));
  const[TotalTime,setTotalTime]=useState(moment().format('HH:mm'));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setShowTime(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {if(TotalTime>startTime){
    var start_Time = moment(CheckTime, 'HH:mm')
    var end_Time = moment(startTime, 'HH:mm')
    var hoursDiff = end_Time.diff(start_Time, 'hours',true)
    var Total_Time=moment.utc(moment.duration(hoursDiff , "hours").asMilliseconds()).format("HH:mm")
    setTimeout(()=>{
      setTotalTime(Total_Time)
    },1000)
    Alert.alert("Cannot be less than sitting time!Clear Screen")
  }else{
    setStartTime(moment(date).format('HH:mm'));
    hideDatePicker();
  }
  };

{/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

const StoreData=async()=>{
  try {
    var user={
      Actual_Start_Time:startTime
    }
   await AsyncStorage.setItem('Screen-08',JSON.stringify(user))
   
  } catch (error) {
    console.log(error)
  }
}


{/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
const removeData=async()=>{
  try {
   await AsyncStorage.removeItem('Screen-08')
   navigation.replace('8 of 37')
   console.log("removed")
  } catch (error) {
    console.log(error)
  }
}
  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>When did the proceedings start?</Text>

<View style={styles.btnView}>
<TouchableOpacity 
onPress={showDatePicker}
activeOpacity={0.5} 
style={styles.btn}>
    {
        showTime ? <Text style={styles.Text1}>{startTime}</Text>: null
    }
</TouchableOpacity>
</View>

<DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="time"
      is24Hour={true}
      display='spinner'
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
    
<TouchableOpacity 
onPress={()=>{if(showTime==false)
  {
  Alert.alert('Please select time')
  }else if (startTime>CheckTime){
    StoreData();
    navigation.navigate('9 of 37')
  }else{
    Alert.alert(
      "Cannot be less than sitting time!",
      "",
      [
        { text: "OK", onPress: () => removeData() }
      ]
    );
  }
}} 
style={styles.forwardBtn}>

<Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('7 of 37')} style={styles.backBtn}>
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
  Text1:{
    fontFamily:"Montserrat-Regular",
    fontSize:17,
    color:"#fff"
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
btnView:{
    paddingLeft:33,
    paddingRight:33,
    paddingBottom:7
  },
btn:{
    backgroundColor:"#48C9B0",
    height:60,
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4"
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