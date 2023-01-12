
import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,ScrollView,LogBox,Alert,FlatList} from 'react-native';
import React,{useState,useEffect} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChairAttendance({navigation,route}) {
    const data1 = [{label: ' P'},{ label: ' A'}];
    const data2 = [{label: ' P'},{ label: ' A'}];
    const data3 = [{label: ' P'},{ label: ' A'}];
    const data4 = [{label: ' Add Details'}];
    const[SpeakerHour,setSpeakerHour]=useState('');
    const[SpeakerMin,setSpeakerMin]=useState('');
    const[SpeakerHour1,setSpeakerHour1]=useState('');
    const[SpeakerMin1,setSpeakerMin1]=useState('');
    const[SpeakerHour2,setSpeakerHour2]=useState('');
    const[SpeakerMin2,setSpeakerMin2]=useState('');
    const[RadioBtn1,setRadioBtn1]=useState('');
    const[RadioBtnData1,setRadioBtnData1]=useState('');
    const[RadioBtn2,setRadioBtn2]=useState('');
    const[RadioBtnData2,setRadioBtnData2]=useState('');
    const[RadioBtn3,setRadioBtn3]=useState('');
    const[show,setShow]=useState(false);

   const[ChairPersonName,setChairPersonName]=useState([]);
  
//--------------------------------Array to manage chair persons------------------------------------------ // 
const [ChairAttendanceInfo,setChairAttendanceInfo]=useState([])
const [count,setCount]=useState(1);

  const HandleSubmit=()=>{
    const newArray=[...ChairAttendanceInfo,{id:count,ChairPersonName:ChairPersonName[count-1].name,ChairPerson:RadioBtn3,ChairPersonHour:SpeakerHour2,ChairPersonMin:SpeakerMin2}]
    setChairAttendanceInfo(newArray)
    setCount(count+1)
    Alert.alert('Details Added')
  }
  
//------------------------useEffect-------------------------//

   useEffect(()=>{
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    retrieveData();
    retrieveData1();
 },[])

    //-------------------retrieveData & Convert the Array into object---------------//

    const retrieveData = async () => {
  
      try {
        await AsyncStorage.getItem("Screen-17").then(value=>{if(value!=null){
          var user=JSON.parse(value)
          setChairPersonName(user.Panel_of_Chairpersons)
        }})
        
      } catch (e) {
        console.log('Failed to fetch the data from storage!', e)
      }
  
    };

  //-------------------retrieveData---------------//
  const [HouseName,setHouseName]=useState('')
  const retrieveData1 = async () => {
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

     
     //--------------------------Store data using AsyncStorage---------------------------//

  const StoreData=async()=>{
    try {
      var user={
          Attendance_of_the_Chair:[{name:RadioBtnData1,attendance:RadioBtn1,Hour:SpeakerHour,Min:SpeakerMin},
          {name:RadioBtnData2,attendance:RadioBtn2,Hour:SpeakerHour1,Min:SpeakerMin1},
          ],
          ChairAttendanceInfo:ChairAttendanceInfo
         }
      await AsyncStorage.setItem('Screen-18',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }


    {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
    const removeData=async()=>{
      try {
       await AsyncStorage.removeItem('Screen-18')
       navigation.replace('18 of 37')
       console.log("removed")
      } catch (error) {
        console.log(error)
      }
    }


    
  return (
      
        <View style={styles.container}>
 {/* ----- Attendance of the Chair --------- */}

<Text style={styles.Text}>Attendance of the Chair:</Text>
 {/* ----- Speaker --------- */}
<ScrollView nestedScrollEnabled={true}>

<View style={styles.smallTextViewOuter}>
            <View style={styles.smallTextView}>
              {HouseName==='Senate' ?  <Text style={styles.smallText}>Chairman</Text>: <Text style={styles.smallText}>Speaker</Text>}
            </View>
{/* ----- Speaker Attendance --------- */}

<View style={styles.RadioBTnView}>
<Text style={styles.AttendText}>Attendance</Text>
<RadioButtonRN
  data={data1}
  box={false}
  circleSize={14}
  boxStyle={{width:80}}
  textStyle={styles.RNLabelText}
  style={{flexDirection:"row-reverse",position:"absolute",right:-30,top:-7}}
  selectedBtn={(item)=>{ if(HouseName==='Senate'){
    setRadioBtn1(item.label)
    setRadioBtnData1('Chairman')
  }else{
    setRadioBtn1(item.label)
    setRadioBtnData1('Speaker')
  }
    
    }}
/>
</View>

       
{/* ----- Speaker DurationTime --------- */}

       <View style={styles.RowView}>
       <Text style={styles.durationText}>How long did he/she preside over?</Text>
       <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="H"
             editable={RadioBtn1==' P' ? true:false}
             keyboardType='numeric'
             onChangeText={(value)=>{
               setSpeakerHour(value)
               }} />
        </View>

        <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="M"
             editable={RadioBtn1==' P' ? true:false}
             keyboardType='numeric'
             onChangeText={(value)=>{
               setSpeakerMin(value)
               }} />
        </View>
       </View>
        
</View>
{/* ----- Line Seperator--------- */}

<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#D7DBDD",marginBottom:2,marginTop:4}}>
</View>

{/* ----- Deputy Speaker --------- */}

<View style={styles.smallTextViewOuter}>

<View style={styles.smallTextView}>
{HouseName==='Senate' ?  <Text style={styles.smallText}>Deputy Chairman</Text>: <Text style={styles.smallText}>Deputy Speaker</Text>}
</View>

{/* ----- Deputy Speaker Attendance--------- */}

<View style={styles.RadioBTnView}>
<Text style={styles.AttendText}>Attendance</Text>
<RadioButtonRN
  data={data2}
  box={false}
  circleSize={14}
  boxStyle={{width:80}}
  textStyle={styles.RNLabelText}
  style={{flexDirection:"row-reverse",position:"absolute",right:-30,top:-7}}
  selectedBtn={(item)=>{ if(HouseName==='Senate'){
    setRadioBtn2(item.label)
    setRadioBtnData2('Deputy Chairman')
  }else{
    setRadioBtn2(item.label)
    setRadioBtnData2('Deputy Speaker')
  }
    
    }}
/>
</View>

{/* ----- Deputy Speaker DutationTime--------- */}

       <View style={styles.RowView}>
       <Text style={styles.durationText}>How long did he/she preside over?</Text>
       <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="H"
             editable={RadioBtn2==' P' ? true:false}
             keyboardType='numeric'
             onChangeText={(value)=>{
               setSpeakerHour1(value)
               }} />
        </View>

        <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="M"
             editable={RadioBtn2==' P' ? true:false}
             keyboardType='numeric'
             onChangeText={(value)=>{
               setSpeakerMin1(value)
              }} 
             />
        </View>
       </View>

</View>

<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#D7DBDD",marginBottom:2,marginTop:4}}>
</View>

<View style={styles.paddingView}>
 {/* ----- ChairPerson Name from Screen 17 of 20 --------- */}
 <FlatList
data={ChairPersonName}
renderItem={({item})=>{
  return(
    <View style={styles.smallTextViewOuter}>
            <View style={styles.smallTextView}>
            <Text style={styles.smallText}>{item.name} ({item.party})</Text>
            </View>
{/* ----- ChairPerson Attendance --------- */}

<View style={styles.RadioBTnView}>
<Text style={styles.AttendText}>Attendance</Text>
<RadioButtonRN
  data={data3}
  box={false}
  circleSize={14}
  boxStyle={{width:80}}
  textStyle={styles.RNLabelText}
  style={{flexDirection:"row-reverse",position:"absolute",right:-30,top:-7}}
  selectedBtn={(item)=>{
    setRadioBtn3(item.label)
    }}
/>
</View>

       
{/* ----- ChairPerson DurationTime --------- */}

       <View style={styles.RowView}>
       <Text style={styles.durationText}>How long did he/she preside over?</Text>
       <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="H"
             keyboardType='numeric'
             onChangeText={(value)=>setSpeakerHour2(value)}
              />
        </View>

        <View style={styles.TextInputView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             placeholder="M"
             keyboardType='numeric'
             onChangeText={(value)=>{setSpeakerMin2(value)}} 
             />
        </View>
       </View>
        <RadioButtonRN
                data={data4}
                box={false}
                circleSize={14}
                boxStyle={{width:150}}
                selectedBtn={HandleSubmit}
                textStyle={styles.RNLabelText}
                />

</View>
  )
}}
/>

      

<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#D7DBDD",marginBottom:150,marginTop:4}}/>


      

 </View>

</ScrollView>


      <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>
       

{/* ------------------------------- Handle Navigation Btn---------------------------- */}

<TouchableOpacity 
onPress={()=>{
     if(RadioBtn1==' P' && SpeakerHour.length==0 && SpeakerMin.length==0)
    {
      Alert.alert('Enter time of Speaker')
    }
    else if(RadioBtn2==' P' && SpeakerHour1.length==0 && SpeakerMin1.length==0)
    {
      Alert.alert('Enter time of Deputy Speaker')
    }
    else if(RadioBtn3!=null && SpeakerHour2.length==0 && SpeakerMin2.length==0)
    {
      Alert.alert('Enter time of Chairpersons')
    }else{
      StoreData();
      navigation.navigate('19 of 37')
    }
  }} 
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('17 of 37')} style={styles.backBtn}>
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
    marginTop:25,
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
    fontSize:16,
  },
  confirmTextView:{
    backgroundColor:"#48C9B0",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F4F6F6",
    paddingHorizontal:10,
    marginTop:10
  },
    smallConfirmText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Regular",
    fontSize:14,
    textAlign:"center",
    color:"#fff"
  },
  durationText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:14,
    paddingHorizontal:9,
    width:"50%"
  },

  AttendText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:14,
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