
import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InformationScreen({navigation}) {


{/*-------------------------------------------States----------------------------------------- */}

    const data = [{label: 'Yes',}, { label: 'No'}];
    const [show,setShow]=useState(false);
    const[InformationDetail,setInformationDetail]=useState('');
    const[InformationData,setInformationData]=useState('');

 {/*---------------------------------------- StoreData----------------------------------------- */}
 const StoreData=async()=>{
  try {
    var user={
      Other_Information:[{
         InformationDetail:InformationDetail,
         InformationData:InformationData}]
             }
    await AsyncStorage.setItem('Screen-35',JSON.stringify(user))
  } catch (error) {
    console.log(error)
  }
}

 {/*---------------------------------------- removeData----------------------------------------- */}

   const removeData=async()=>{
    try {
      await AsyncStorage.removeItem('Screen-35')
      navigation.replace('35 of 37')
      console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }



{/*---------------------------------------- Main Code----------------------------------------- */}

  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>Other Information</Text>

{/*---------------------------------------- RadioButtonRN----------------------------------------- */}

<View style={styles.RadioBTnView}>
<RadioButtonRN
  data={data}
  textStyle={styles.RNLabelText}
  selectedBtn={(item)=>{
      if(item.label==='No')
      {
          setInformationData(item.label)
          setShow(false)
      }
      else
        {
          setInformationData(item.label)
          setShow(true)
        }
}}
/>
</View>

{ show? 
    <View>
          <Text style={styles.Text1}>Details</Text>
          <View style={styles.TextInputView}>
          <TextInput style={styles.TextInput}  onChangeText={(value)=>setInformationDetail(value)} />
          </View>
    </View> :null
}

{/*--------------------------------------Clear-------------------------------------------*/}

<TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>


{/*---------------------------------------- Handle Buttons----------------------------------------- */}

<TouchableOpacity 
onPress={()=>{if(InformationData=='No')
    {
      StoreData();
      navigation.navigate('36 of 37')
    }else if(InformationData=='Yes' && InformationDetail.length==0){
      Alert.alert('Please enter details in all fields')
    }else{
      StoreData();
      navigation.navigate('36 of 37')
    }
  }} 
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('34 of 37')} style={styles.backBtn}>
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
    marginBottom:10,
    fontFamily:"Montserrat-Bold",
    fontSize:17,
    paddingHorizontal:35,
  },
  Text1:{
    marginTop:25,
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
  modalBtn1:{
    position:"absolute",
    right:90,
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