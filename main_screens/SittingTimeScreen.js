import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import React, { useState,useEffect} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HEIGHT=Dimensions.get("window").height;

export default function SittingTimeScreen({navigation}) {


   //--------------------States-----------------//
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const[time,setTime]=useState(moment().format('HH:mm'));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setShowTime(true)
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTime(moment(date).format('HH:mm'));
    hideDatePicker();
  };


  {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

const StoreData=async()=>{
  try {
    var user={
      Scheduled_Start_Time:time
    }
   await AsyncStorage.setItem('Screen-07',JSON.stringify(user))
   
  } catch (error) {
    console.log(error)
  }
}


{/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
const removeData=async()=>{
  try {
   await AsyncStorage.removeItem('Screen-07')
   navigation.replace('7 of 37')
   console.log("removed")
  } catch (error) {
    console.log(error)
  }
}


     //--------------------Main Code-----------------//

  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>Scheduled time of the sitting:</Text>

<View style={styles.btnView}>
<TouchableOpacity 
onPress={showDatePicker}
activeOpacity={0.5} 
style={styles.btn}>
    {
        showTime ? <Text style={styles.Text1}>{time}</Text>: null
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

       <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity> 

<TouchableOpacity 
onPress={()=>{if(showTime==false)
  {
  Alert.alert('Please select date')
  }else{
    StoreData();
    navigation.navigate('8 of 37')
  }
}} 
style={styles.forwardBtn}>

<Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('6 of 37')} style={styles.backBtn}>
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