// OAW ----- official assembly website --------- //
import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProceedingInterrupt({navigation}) {


  const data = [{label: 'Yes',},{ label: 'No'}];
  const [ProceedInterrupt,setProceedInterrupt]=useState('')

  //--------------------------Store data using AsyncStorage---------------------------//

  const StoreData=async()=>{
    try {
      var user={
        'Any_Suspension/Break':ProceedInterrupt
      }
      await AsyncStorage.setItem('Screen-19',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }

    //--------------------------remove data using AsyncStorage---------------------------//

    const removeData=async()=>{
      try {
        await AsyncStorage.removeItem('Screen-19')
        navigation.replace('19 of 37')
        console.log("removed")
      } catch (error) {
        console.log(error)
      }
    }

  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>Did the proceedings face any interruption?</Text>

<View style={styles.RadioBTnView}>
<RadioButtonRN
  data={data}
  textStyle={styles.RNLabelText}
  selectedBtn={(item)=>setProceedInterrupt(item.label)}
/>
</View>


      <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>


<TouchableOpacity 
onPress={()=>{ 
  if(ProceedInterrupt==='No'){
  StoreData();
  navigation.navigate("21 of 37")
}else{
  StoreData();
  navigation.navigate("20 of 37")
}} 
}
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('18 of 37')} style={styles.backBtn}>
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