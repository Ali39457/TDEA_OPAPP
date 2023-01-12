// OAW ----- official assembly website --------- //
import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LeaveAppRead({navigation}) {


  //--------------------------------------States-------------------------------------------//
  const data = [
    {label: 'Yes',},
    { label: 'No',onpress:"16 of 37"}
    ];
    const [show,setShow]=useState(false);
    const[LeaveRead,setLeaveRead]=useState('');
    const[LeaveDenied,setLeaveDenied]=useState('');
    const[LeaveApplication,setLeaveApplication]=useState('');

    //--------------------------Store data using AsyncStorage---------------------------//

  const StoreData=async()=>{
    try {
      var user={
        Leave_Applications:LeaveApplication
               }
      await AsyncStorage.setItem('Screen-15',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }

  const StoreData1=async()=>{
    try {
      var user={
        LeaveRead:LeaveRead,
        LeaveDenied:LeaveDenied,
        Leave_Applications:LeaveApplication
               }
      await AsyncStorage.setItem('Screen-15',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }

    //--------------------------remove data using AsyncStorage---------------------------//

    const removeData=async()=>{
      try {
        await AsyncStorage.removeItem('Screen-15')
        navigation.replace('15 of 37')
        console.log("removed")
      } catch (error) {
        console.log(error)
      }
    }


//--------------------------------------Main Code-------------------------------------------//

  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>Were leave applications read out or not?</Text>

{/*--------------------------------------RadioButtonRN-------------------------------------------*/}

<View style={styles.RadioBTnView}>
<RadioButtonRN
  data={data}
  textStyle={styles.RNLabelText}
  selectedBtn={(item)=>{if(item.label==='No'){
    setLeaveApplication(item.label)
    setShow(false)
  }else{
    setLeaveApplication(item.label)
    setShow(true)
  }
}}
/>
</View>

{/*--------------------------------------Modal Show on Yes -------------------------------------------*/}

{ show? 
    <View>
          <Text style={styles.Text1}>How many leave applications were read out?</Text>
          <View style={styles.TextInputView}>
          <TextInput style={styles.TextInput} keyboardType="numeric" maxLength={3} onChangeText={(value)=>setLeaveRead(value)} />
          </View>
          <Text style={styles.Text1}>How many leaves were denied?</Text>
          <View style={styles.TextInputView}>
          <TextInput style={styles.TextInput} keyboardType="numeric" maxLength={3} onChangeText={(value)=>setLeaveDenied(value)} />
          </View>
    </View> :null
}

{/*--------------------------------------Clear-------------------------------------------*/}

      <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>

{/*--------------------------------------Handle Btn-------------------------------------------*/}


<TouchableOpacity 
onPress={()=>{if(LeaveApplication.length==0 )
    {
    Alert.alert('Please select one option?')
    }
    else if(show==true && (LeaveRead.length==0 || LeaveDenied.length==0))
    {
      Alert.alert('Please enter details in all fields')
    }
    else if(LeaveApplication=='Yes' && (LeaveRead.length!=null || LeaveDenied.length!=null))
    {
      StoreData1();
      navigation.navigate('16 of 37');
    }
    else
    {
      StoreData();
      navigation.navigate('16 of 37');
    }
  }} 
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('14 of 37')} style={styles.backBtn}>
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
    marginTop:15,
    marginBottom:10,
    fontFamily:"Montserrat-Medium",
    fontSize:17,
    paddingHorizontal:35,
  },
  RadioBTnView:{
    paddingLeft:33,
    paddingRight:33,
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
RNLabelText:{
  fontFamily:"Montserrat-Regular",
  fontSize:14,
}
 
 
  
 
})