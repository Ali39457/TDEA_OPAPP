import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HEIGHT=Dimensions.get("window").height;

export default function ProceedingsHighAttend({navigation}) {


//-------------------retrieveData---------------//
const[CheckStartTime,setCheckStartTime]=useState(moment().format('HH:mm'));
const retrieveStartTime = async () => {
  try{
    const user = await AsyncStorage.getItem('Screen-08')
    .then(value=>{if(value!=null){
      const user=JSON.parse(value)
      setCheckStartTime(user.Actual_Start_Time)
    }})
    
  }
   catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }
};

//-------------------retrieveData---------------//
const[CheckEndTime,setCheckEndTime]=useState(moment().format('HH:mm'));
const retrieveEndTime = async () => {
  try{
    const user = await AsyncStorage.getItem('Screen-11')
    .then(value=>{if(value!=null){
      const user=JSON.parse(value)
      setCheckEndTime(user.End_Time)
    }})
    
  }
   catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }
};



     //---------------------------------useEffect------------------------------------------//
     useEffect(()=>{
      retrieveData();
      retrieveStartTime();
      retrieveEndTime();
      },[])
      
      const retrieveData=async()=>{
     try {
       const userToken=await AsyncStorage.getItem('Screen-12')
       .then(value=>{if(value!=null){
        const user=JSON.parse(value)
        setValue(userToken)
      }})

     } catch ({error}) {
       console.log(error)
     }
      }


  //----------------------------------States--------------------------------------//
 const[HighAttend,setHighAttend]=useState('');
 const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 const [showTime, setShowTime] = useState(false);
 const[ObservationTime,setObservationTime]=useState(moment().format('HH:mm'));
 const[Value,setValue]=useState('');

 const showDatePicker = () => {
    setDatePickerVisibility(true);
    setShowTime(true)
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setObservationTime(moment(date).format('HH:mm'));
    hideDatePicker();
  };

  //----------------------------------StoreData--------------------------------------//

  const StoreData=async()=>{
    try {
      var user={
        Max_Members_present_at_a_point:[{ HighAttend:HighAttend,
          ObservationTime:ObservationTime,
          }]  
        }
      await AsyncStorage.setItem('Screen-13',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }

    //----------------------------------removeData--------------------------------------//

    const removeData=async()=>{
      try {
        await AsyncStorage.removeItem('Screen-13')
        navigation.replace('13 of 37')
        console.log('removed')
      } catch (error) {
        console.log(error)
      }
    }


 //----------------------------------Main Code--------------------------------------//

  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>Highest attendance during the proceedings?</Text>

{/*----------------------------------Give a head count--------------------------------------*/}
<Text style={styles.Text2}>Give a head count</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={3} onChangeText={(value)=>setHighAttend(value)} />
</View>

{/*----------------------------------Observation Time--------------------------------------*/}
<Text style={styles.Text2}>Observation Time</Text>

<View style={styles.btnView}>
<TouchableOpacity 
onPress={showDatePicker}
activeOpacity={0.5} 
style={styles.btn}>
    {
        showTime ? <Text style={styles.Text1}>{ObservationTime}</Text>: null
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

{/*----------------------------------Clear BTn--------------------------------------*/}

      <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>

{/*----------------------------------Handle BTn--------------------------------------*/}

<TouchableOpacity 
onPress={()=>{if(showTime==false)
  {
  Alert.alert('Please select time!')
  }else if (ObservationTime>CheckStartTime && ObservationTime<CheckEndTime){
    StoreData();
    navigation.navigate('14 of 37')
  }else{
    Alert.alert(
      "Please select time between start & end time!",
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

 <TouchableOpacity onPress={()=>navigation.navigate('12 of 37')} style={styles.backBtn}>
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
  Text2:{
    marginTop:10,
    marginBottom:10,
    fontFamily:"Montserrat-Medium",
    fontSize:17,
    paddingHorizontal:35,
  },
  Text1:{
    fontFamily:"Montserrat-Regular",
    fontSize:17,
    color:"#fff"
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
    paddingHorizontal:10,
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