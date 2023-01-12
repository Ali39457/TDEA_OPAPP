import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert,Modal,LogBox,FlatList,ScrollView} from 'react-native';
import React, { useState,useEffect} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HEIGHT=Dimensions.get("window").height;

export default function QuestionHourScreen2({navigation}) {

  
//------------------------useEffect to Call retrieveData()-------------------------//

useEffect(()=>{
  retrieveData();
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
},[])

//------------------------getName(ChairPerson) from Api(stored in AsyncStorage)-------------------------//---------------//

  
  const retrieveData = async () => {

    try {
      await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
        setName(user.ministry_list)
        setMasterData(user.ministry_list)
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };


  //------------------------States for ChairPerson Name -------------------------//
  const[Name,setName]=useState([]);
  const [masterData,setMasterData]=useState([]);
  const [SearchChairPerson,setSearchChairPerson]=useState([]);
  const [ChairpersonCount,setChairpersonCount]=useState('');
  const [ChairPersonName,setChairPersonName]=useState(ChairPersonName);
  const [modalVisible, setModalVisible] = useState(false);


   {/*---------------------------------------- All States----------------------------------------- */}

  const [StarredQuestion, setStarredQuestion] = useState("");
  const [UnStarredQuestion, setUnStarredQuestion] = useState("");
  const [ShortNoticeQuestion, setShortNoticeQuestion] = useState("");
  const [OnFloorQuestion, setOnFloorQuestion] = useState("");
  const [SupplementaryQuestion, setSupplementaryQuestion] = useState("");
  const [DefferedQuestion, setDefferedQuestion] = useState("");
  const [NotRespondedQuestion, setNotRespondedQuestion] = useState("");
  const [AnyOtherQuestion, setAnyOtherQuestion] = useState("");

  const Check = showTime==false || showTime1==false || StarredQuestion.length==0 ||
  UnStarredQuestion.length==0 || ShortNoticeQuestion.length==0 || OnFloorQuestion.length==0 || 
  SupplementaryQuestion.length==0 || DefferedQuestion.length==0 || NotRespondedQuestion.length==0 ||
  AnyOtherQuestion.length==0 
    {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

    const StoreData=async()=>{
      try {
        var user={
          Questions_Hour:[{startTime:QuestionHour,
            endTime:QuestionHour1,
            starredQuestion:StarredQuestion,
            unStarredQuestion:UnStarredQuestion,
            shortNoticeQuestion:ShortNoticeQuestion,
            totalQuestion:parseInt(StarredQuestion)+parseInt(UnStarredQuestion),
            onFloorQuestion:OnFloorQuestion,
            supplementaryQuestion:SupplementaryQuestion,
            defferedQuestion:DefferedQuestion,
            notRespondedQuestion:NotRespondedQuestion,
            anyOtherQuestion:AnyOtherQuestion,
            MinistriesList:[...name1]
          }]
          
        }
       await AsyncStorage.setItem('Screen-24',JSON.stringify(user))
       
      } catch (error) {
        console.log(error)
      }
    }
    
  
   {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
    const removeData=async()=>{
      try {
       await AsyncStorage.removeItem('Screen-24')
       navigation.replace('24 of 37')
       console.log("removed")
      } catch (error) {
        console.log(error)
      }
    }

    {/*--------------------------------------- Start Time States & Methods--------------------------------------------- */}
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const[QuestionHour,setQuestionHour]=useState(moment().format('hh:mm A'));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setShowTime(true)
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setQuestionHour(moment(date).format('hh:mm A'));
    hideDatePicker();
  };

  {/*--------------------------------------- End Time States & Methods--------------------------------------------- */}
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [showTime1, setShowTime1] = useState(false);
  const[QuestionHour1,setQuestionHour1]=useState(moment().format('hh:mm A'));

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
    setShowTime1(true)
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    setQuestionHour1(moment(date).format('hh:mm A'));
    hideDatePicker1();
  };


   

     
     //------------------------renderItem for FlatList-1-------------------------//

     const renderItem=({item})=>{
      return(
          <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} onPress={()=>{
setChairPersonName(item.name)
setChairpersonCount(item.id)
Alert.alert(item.name +": selected!","Click Add Ministries",[
  {
  text:"Cencel"
  },
 { 
   text:"Ok",
 }

])
}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}</Text>
          </TouchableOpacity>
          </View>
      )
  }

  
//------------------------ItemSeparator for FlatList-1-------------------------//

     const ItemSeparator=({item})=>{
      return(
          <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:2,marginTop:4}}>
          </View>
      )
  }

  const renderItem1=({item})=>{
    return(
           <TouchableOpacity style={styles.RenderItem2}>
             <Text numberOfLines={3} style={styles.FlatListText2}>{item.Ministry_Name}</Text>
          </TouchableOpacity>
    )
}

 //------------------------ItemSeparator for FlatList-2-------------------------//

const ItemSeparator1=({item})=>{
    return(
        <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:5,marginTop:5}}>
        </View>
    )
}

 //------------------------SearchFilter-------------------------//

const SearchFilter=(text)=>{
  if(text){
      const newData=masterData.filter((item)=>{
          const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
          const textData=text.toUpperCase();
          return itemData.indexOf(textData) > -1 ;
      });
      setName(newData);
      setSearchChairPerson(text);
  }else{ 
    setName(masterData);
    setSearchChairPerson(text);
  }
      }


  //  FlatList-2 States  & method for store chairPerson name //

const [DATA1,SetDATA1]=useState([])
const [name1,setName1]=useState(DATA1);

    //  method for store chairPerson name //

const HandleSubmit2=()=>{
  const newArray=[...DATA1,{Ministry_Id:ChairpersonCount,Ministry_Name:ChairPersonName}]
  setName1(newArray)
  SetDATA1(newArray)
}


{/*------------------------Modal for FlatList-1 for Store ChairPerson's name------------------------*/}


const ChairPersonModal=()=>{
  return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}>
<View style={styles.outerDebateView}>
<View style={styles.DropDownPickerView}>
  <Text style={styles.Text}>Members Saved</Text> 
     <FlatList style={styles.FlatList}
     data={name1}
     renderItem={renderItem1}
     ItemSeparatorComponent={ItemSeparator1}
     />

     {/*------------------------------------Modal Handle Modal btn----------------------------------------- */}
     <View style={{width:"100%",height:40}} />
         <View style={styles.modalhandlebtnView1}>
         <TouchableOpacity  onPress={()=>setModalVisible(!modalVisible)}>
             <Text style={styles.modalText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalhandlebtnView} onPress={onRemove}>
             <Text style={styles.modalText}>Clear List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalhandlebtnView2} onPress={()=>{
          setModalVisible(!modalVisible)
          }}>
             <Text style={styles.modalText}>OK</Text>
        </TouchableOpacity>
        </View>

</View>
</View>
  
      </Modal>
    )}

 //------------------------onRemove for FlatList-2-------------------------//
 const onRemove = () => {
  setName1([])
  SetDATA1([])
  setChairpersonCount(1)
};



 {/*--------------------------------------- Main Code--------------------------------------------- */}


  return (
        <View style={styles.container}>
 
      <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.modalBtn1}
        onPress={()=>setModalVisible(!modalVisible)}>
        <Text style={styles.modalBtnText}>Ministries List</Text>
      </TouchableOpacity>

<Text style={{ marginTop:25,marginBottom:20,fontFamily:"Montserrat-Bold",fontSize:18,paddingHorizontal:35}}>Questions Hour</Text>
<View style={styles.innerContainer}>
<ScrollView>

     {/*--------------------------------------- Start Time Code--------------------------------------------- */}
    
    <Text style={styles.smallHeadingText}>Start Time</Text>
    <View style={styles.btnView}>
    <TouchableOpacity 
    onPress={showDatePicker}
    activeOpacity={0.5} 
    style={styles.btn}>
        {
            showTime ? <Text style={styles.timeText}>{QuestionHour}</Text>: null
        }
    </TouchableOpacity>
    
    <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          is24Hour={true}
          display='spinner'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
    </View>
    
     
     {/*--------------------------------------- End Time Code--------------------------------------------- */}
    
     <Text style={styles.smallHeadingText}>End Time</Text>
    <View style={styles.btnView}>
    <TouchableOpacity 
    onPress={showDatePicker1}
    activeOpacity={0.5} 
    style={styles.btn}>
        {
            showTime1 ? <Text style={styles.timeText}>{QuestionHour1}</Text>: null
        }
    </TouchableOpacity>
    </View>
    
    <DateTimePickerModal
          isVisible={isDatePickerVisible1}
          mode="time"
          is24Hour={true}
          display='spinner'
          onConfirm={handleConfirm1}
          onCancel={hideDatePicker1}
        />
    
    {/*--------------------------------------- Starred Questions--------------------------------------------- */}
    
    <Text style={styles.smallHeadingText}>Starred Questions</Text>
    <View style={styles.TextInputView}>
    <TextInput style={styles.TextInput} maxLength={3} keyboardType="numeric"  onChangeText={(value)=>setStarredQuestion(value)} />
    </View>
    
    {/*--------------------------------------- Un-Starred Questions--------------------------------------------- */}
    
    <Text style={styles.smallHeadingText}>Un-Starred Questions</Text>
    <View style={styles.TextInputView}>
    <TextInput style={styles.TextInput} maxLength={3} keyboardType="numeric"  onChangeText={(value)=>setUnStarredQuestion(value)} />
    </View>
    
    {/*--------------------------------------- Short Notice Questions--------------------------------------------- */}
    
    
    <Text style={styles.smallHeadingText}>Short Notice Questions</Text>
    <View style={styles.TextInputView}>
    <TextInput style={styles.TextInput} keyboardType="numeric" maxLength={3} onChangeText={(value)=>setShortNoticeQuestion(value)} />
    </View>
    
    {/*--------------------------------------- Total Questions--------------------------------------------- */}
    
    <Text style={styles.smallHeadingText}>Total Questions</Text>
    <View style={styles.TextInputView}>
    <View style={styles.CountView}>
      {
        StarredQuestion.length==0 && UnStarredQuestion.length==0 ? null:
        <Text style={styles.CountText}>{parseInt(StarredQuestion)+parseInt(UnStarredQuestion)}</Text>
      }
   
    </View>
    </View>
    
    {/*--------------------------------------- Taken up on-floor Questions--------------------------------------------- */}
    
    <Text style={styles.smallHeadingText}>Taken up on-floor Questions</Text>
    <View style={styles.TextInputView}>
    <TextInput style={styles.TextInput} keyboardType="numeric" maxLength={3} onChangeText={(value)=>setOnFloorQuestion(value)} />
    </View>

        {/*--------------------------------------- Supplementary Questions--------------------------------------------- */}
    
        <Text style={styles.smallHeadingText}>Supplementary Questions</Text>
    <View style={styles.TextInputView}>
    <TextInput style={styles.TextInput} maxLength={3} keyboardType="numeric"  onChangeText={(value)=>setSupplementaryQuestion(value)} />
    </View>
    
    {/*--------------------------------------- Deffered Questions--------------------------------------------- */}
    
    <Text style={styles.smallHeadingText}>Deffered Questions</Text>
    <View style={styles.TextInputView}>
    <TextInput style={styles.TextInput} maxLength={3} keyboardType="numeric"  onChangeText={(value)=>setDefferedQuestion(value)} />
    </View>
    
    {/*--------------------------------------- Not Responded Questions--------------------------------------------- */}
    
    
    <Text style={styles.smallHeadingText}>Not Responded Questions</Text>
    <View style={styles.TextInputView}>
    <TextInput style={styles.TextInput} keyboardType="numeric" maxLength={3} onChangeText={(value)=>setNotRespondedQuestion(value)} />
    </View>
    
    {/*--------------------------------------- Any Other Questions--------------------------------------------- */}
    
    <Text style={styles.smallHeadingText}>Any Other Questions</Text>
    <View style={styles.TextInputView}>
    <TextInput style={styles.TextInput} maxLength={3} keyboardType="numeric"   onChangeText={(value)=>setAnyOtherQuestion(value)} />
    </View>
    
    {/*--------------------------------------- Ministries--------------------------------------------- */}   
    <Text style={styles.smallHeadingText}>Ministries</Text>
{
  ChairPersonName=='other'? <View style={styles.TextInputView}>
  <TextInput style={styles.TextInput} placeholderTextColor="#fff"  onChangeText={(value)=>setSearchPrivilegeMember(value)} />
  </View>: null
}
    

 <View style={styles.TextInputView}>
      <TextInput
      style={styles.TextInput}
      value={String(SearchChairPerson)}
      placeholder="Search here"
      placeholderTextColor="#fff"
      onChangeText={(text)=>SearchFilter(text)}
      />

      {/*------------------------ Add ChairPerson------------------------*/}

      {
        SearchChairPerson.length==0 ? null :
        <TouchableOpacity style={styles.AddBtn} onPress={()=>{
          HandleSubmit2()
          Alert.alert('Ministry Saved!')
          }}>
          <Text style={styles.AddBtnText}>Add Ministries</Text>
          </TouchableOpacity>
      }
    

  </View> 
     {/*------------------------ Calling ChairPersonModal------------------------*/}

 {ChairPersonModal()}          

{/*------------------------FlatList-1 for Display ChairPerson's name------------------------*/}


{
  SearchChairPerson.length==0 ? null :
    <View style={styles.FlatListView}>
    <FlatList style={styles.FlatList}
    nestedScrollEnabled={true}
    data={Name}
    renderItem={renderItem}
    />
    </View>

}

</ScrollView>

</View>

 {/*--------------------------------------- Navigation BTn Code--------------------------------------------- */}
 <TouchableOpacity 
onPress={()=>{if(Check)
  {
  Alert.alert('Please enter details in all fields')
  }else{
    StoreData()
    navigation.navigate('25 of 37')
  }
}} 
style={styles.forwardBtn}>

<Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('23 of 37')} style={styles.backBtn}>
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
  innerContainer:{
    height:HEIGHT-200,
  },
  Text:{
    marginTop:25,
    marginBottom:20,
    fontFamily:"Montserrat-Bold",
    fontSize:18,
    paddingHorizontal:35,
  },
  smallHeadingText:{
    fontFamily:"Montserrat-Regular",
    fontSize:17,
    paddingHorizontal:35,
  },
  timeText:{
    fontFamily:"Montserrat-Regular",
    fontSize:17,
    paddingHorizontal:35,
    color:"#fff"
  },
  CountText:{
    fontFamily:"Montserrat-Regular",
    fontSize:17,
    textAlign:'left',
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
CountView:{
  backgroundColor:"#48C9B0",
  height:60,
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F2F3F4",
  justifyContent:"center",
  color:"#fff",
  fontSize:14,
  fontFamily:"Montserrat-Regular",
  paddingHorizontal:10
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
  RenderItemView:{
    paddingLeft:33,
    paddingRight:33,
  },
  RenderItem1:{
    backgroundColor:"#fff",
    height:45,
    borderRadius:15,
    justifyContent:"center",
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:14,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginBottom:2,
    marginTop:2
  },
  RenderItem2:{
    backgroundColor:"#48C9B0",
    height:45,
    borderRadius:15,
    justifyContent:"center",
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:14,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginBottom:2,
    marginTop:2
  },

FlatListText1:{
    fontSize:16,
    paddingHorizontal:2,
    fontFamily:"Montserrat-Regular",
},

FlatListText2:{
  fontSize:16,
  paddingHorizontal:2,
  fontFamily:"Montserrat-Regular",
  color:"#fff"
},

FlatListView:{
    paddingHorizontal:5,
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,
    marginBottom:20,
    height:HEIGHT/1.5,
},
FlatList:{
    width:"100%",
},
Text:{
    marginTop:25,
    marginBottom:20,
    fontFamily:"Montserrat-Medium",
    fontSize:17,
    paddingHorizontal:35,
  },
  AddBtnView:{
    paddingLeft:33,
    paddingRight:33,
  },
  AddBtn:{
    backgroundColor:"#48C9B0",
    height:30,
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    color:"#fff",
    fontSize:14,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    justifyContent:"center",
  },
  AddBtnText:{
    fontSize:14,
    paddingHorizontal:2,
    fontFamily:"Montserrat-Regular",
    color:"#fff",
    textAlign:"center"
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
    fontSize:17,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    color:"#fff"
  },
modalhandlebtnView1:{
  flexDirection:"row",
  marginTop:2,
  marginBottom:2,
  },
  modalhandlebtnView:{
    position:"absolute",
    left:"38%"
  },
  modalhandlebtnView2:{
  position:"absolute",
  right:1
  },
  modalText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:14,
    paddingHorizontal:3,
  },
  outerDebateView:{
    paddingLeft:33,
    paddingRight:33,
  },
  DropDownPickerView:{
    backgroundColor:"#fff",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F4F6F6",
    paddingLeft:33,
    paddingRight:33,
    marginBottom:10,
    marginTop:37,
    height:HEIGHT-200,
    overflow:"hidden"
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

 
  
 
})