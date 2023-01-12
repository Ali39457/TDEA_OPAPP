
import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert,ScrollView} from 'react-native';
import React,{useState,useEffect} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function KeyMemberAttend({navigation,route}) {

  useEffect(()=>{
    retrieveData();
 },[])

    //-------------------retrieveData---------------//
  const [HouseName,setHouseName]=useState('')
  const retrieveData = async () => {
    try{
      const user = await AsyncStorage.getItem('Screen-01')
      .then(value=>{if(value!=null){
        const user=JSON.parse(value)
        setHouseName(user.House)
      }})
      
    }
     catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };


  const[RadioBtnData1,setRadioBtnData1]=useState('');
  const[RadioBtnData2,setRadioBtnData2]=useState('');

   // ----- StoreData using AsyncStorage --------- //

  const StoreData=async()=>{
try {
  var user={
     Key_Members_Attendance:[{attendance:RadioBtn1,name:RadioBtnData1,Hour:MinisterHour,Min:MinisterMin},
      {attendance:RadioBtn2,name:RadioBtnData2,Hour:OppositionHour,Min:OppositionMin}]
  }
  await AsyncStorage.setItem('Screen-21',JSON.stringify(user))
} catch (error) {
  console.log(error)
}
  }

     // ----- removeData using AsyncStorage --------- //

  const removeData=async()=>{
    try {
      await AsyncStorage.removeItem('Screen-21')
      navigation.replace('21 of 37')
      console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }

   // ------------------ States ---------------- //

  const data1 = [{label: ' P'},{ label: ' A'}];
  const data2 = [{label: ' P'},{ label: ' A'}];
    const[MinisterHour,setMinisterHour]=useState('');
    const[MinisterMin,setMinisterMin]=useState('');

    const[OppositionHour,setOppositionHour]=useState('');
    const[OppositionMin,setOppositionMin]=useState('');

    const[RadioBtn1,setRadioBtn1]=useState('');
    const[RadioBtn2,setRadioBtn2]=useState('');


  return (
      
        <View style={styles.container}>
          
 {/* ----- Key Members Attendance --------- */}

      <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>


<Text style={styles.Text}>Key Members Attendance</Text>

 {/* ----- Prime Minister --------- */}
<ScrollView>

<View style={styles.smallTextViewOuter}>
            <View style={styles.smallTextView}>
            {HouseName==='National' ?  <Text style={styles.smallText}>Prime Minister</Text> : HouseName==='Senate'  ? <Text style={styles.smallText}>Leader of the House</Text>:  <Text style={styles.smallText}>Chief Minister</Text>}
            </View>
{/* ----- Prime Minister--------- */}

<View style={styles.RadioBTnView}>
<Text style={styles.AttendText}>Attendance</Text>
<RadioButtonRN
  data={data1}
  box={false}
  circleSize={14}
  boxStyle={{width:80}}
  textStyle={styles.RNLabelText}
  style={{flexDirection:"row-reverse",position:"absolute",right:-30,top:-7}}
  selectedBtn={(item)=>{ if(HouseName==='National'){
    setRadioBtn1(item.label)
    setRadioBtnData1('Prime Minister')
  }else if(HouseName==='Senate'){
    setRadioBtn1(item.label)
    setRadioBtnData1('Leader of the House')
  }else{
    setRadioBtn1(item.label)
    setRadioBtnData1('Chief Minister')
  }
    
    }}
/>
</View>

       
{/* ----- Prime Minister DurationTime --------- */}

       <View style={styles.RowView}>
       <Text style={styles.durationText}>Duration of stay in proceedings</Text>
       <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="H"
             editable={RadioBtn1==' P' ? true:false}
             keyboardType='number-pad'
             onChangeText={(value)=>setMinisterHour(value)} />
        </View>

        <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="M"
             editable={RadioBtn1==' P' ? true:false}
             keyboardType='number-pad'
             onChangeText={(value)=>setMinisterMin(value)} />
        </View>
       </View>
        
</View>
{/* ----- Line Seperator--------- */}

<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#D7DBDD",marginBottom:2,marginTop:4}}>
</View>

{/* ----- Leader of the Opposition--------- */}

<View style={styles.smallTextViewOuter}>

<View style={styles.smallTextView}>
<Text style={styles.smallText}>Leader of the Opposition</Text>
</View>

{/* ----- Opposition Leader Attendance--------- */}

<View style={styles.RadioBTnView}>
<Text style={styles.AttendText}>Attendance</Text>
<RadioButtonRN
  data={data2}
  box={false}
  circleSize={14}
  boxStyle={{width:80}}
  textStyle={styles.RNLabelText}
  style={{flexDirection:"row-reverse",position:"absolute",right:-30,top:-7}}
  selectedBtn={(item)=>{
    setRadioBtn2(item.label)
    setRadioBtnData2('Leader of the Opposition')
    }}
/>
</View>

{/* ----- Opposition Leader DutationTime--------- */}

       <View style={styles.RowView}>
       <Text style={styles.durationText}>Duration of stay in proceedings</Text>
       <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="H"
             editable={RadioBtn2==' P' ? true:false}
             keyboardType='number-pad'
             onChangeText={(value)=>setOppositionHour(value)} />
        </View>

        <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="M"
             editable={RadioBtn2==' P' ? true:false}
             keyboardType='number-pad'
             onChangeText={(value)=>setOppositionMin(value)} />
        </View>
       </View>

</View>

{/* ----- Line Seperator--------- */}
<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#D7DBDD",marginBottom:2,marginTop:4}}>
</View>

</ScrollView>

<TouchableOpacity 
onPress={()=>{
    if(RadioBtn1.length==0 || RadioBtn2.length==0)
    {
    Alert.alert('Please mark attendace!')
    }
    else if(RadioBtn1==' P' && MinisterHour.length==0)
    {
    Alert.alert(`Please enter time for ${RadioBtnData1}`)
    }
    else if(RadioBtn2==' P' && OppositionHour.length==0){
      Alert.alert(`Please enter time for ${RadioBtnData2}`) 
    }
    else{
      StoreData()
      navigation.navigate('22 of 37')
    }
  }} 
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('19 of 37')} style={styles.backBtn}>
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
  RowView:{
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center"
  },
  Text:{
    marginTop:20,
    marginBottom:20,
    fontFamily:"Montserrat-Bold",
    fontSize:17,
    paddingHorizontal:35,
  },
  smallTextViewOuter:{
    paddingLeft:33,
    paddingRight:33,
  },
  smallTextView:{
    backgroundColor:"#F4F6F6",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F4F6F6",
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginTop:10
  },
    smallText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:15,
  },
  durationText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:15,
    width:"50%",
    paddingHorizontal:9
  },

  AttendText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:15,
    paddingHorizontal:7,
  },
  RadioBTnView:{
  marginTop:10,
  marginBottom:10
  },
  TextInputView:{
    marginTop:2,
    marginBottom:2,
    paddingLeft:13,
    paddingRight:13,
  },
  TextInput:{
    backgroundColor:"#48C9B0",
    height:50,
    width:50,
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:16,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:18,
    color:"#fff",
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