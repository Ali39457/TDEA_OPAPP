import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert,LogBox,KeyboardAvoidingView,ScrollView,Modal,FlatList} from 'react-native';
import React,{useState,useEffect,} from 'react';
const HEIGHT=Dimensions.get("window").height;
import RadioButtonRN from 'radio-buttons-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PointOrderScreen({navigation}) {


  //////// =========States for store PointOrderArray===========/////////
  const [DATAA,SetDATAA]=useState([])
  const [PointOrderArray,setPointOrderArray]=useState(DATAA);
  const [countPointOrder,setCountPointOrder]=useState(1);
  
////////////========method for store PointOrderArray========///////////////
  
  const HandleSubmitPointOrder=()=>{
    const newArray=[...DATAA,
      {
        pointOrderCount:countPointOrder,
        memberName:{assembly:POMoverAssembly,id:POMoverCount,name:SearchPointOrder,party:POPartyName},
        description:POrderDescription,
        pOHour:POrderDebateHour,
        pOMins:POrderDebateMins,
        chairRulingAvailable:ChairRulingAvailable,
        chairRuling:ChairRuling,
    }]
    setPointOrderArray(newArray)
    SetDATAA(newArray)
    setCountPointOrder(countPointOrder+1)
  }

  {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

  const StoreData=async()=>{
    try {
      var user={
        Number_of_Points_of_Order:PointOrderCount,
        Points_of_Order:[...PointOrderArray]
      }
     await AsyncStorage.setItem('Screen-33',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }


 {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
  const removeData=async()=>{
    try {
     await AsyncStorage.removeItem('Screen-33')
     navigation.replace('33 of 37')
     console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// PointOrderScreen Code ///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  {/*----------------------------------------States----------------------------------------- */}
  const[PointOrderCount,setPointOrderCount]=useState('');
  
  const [POrderDescription,setPOrderDescription]=useState("");
  const [POrderDebateHour,setPOrderDebateHour]=useState("")
  const [POrderDebateMins,setPOrderDebateMins]=useState("")

  const POrderRadioBtn = [{label: 'Chair ruling available'}];
  const [ChairRulingAvailable,setChairRulingAvailable]=useState('No')
  const [show,setShow]=useState(false);
  const [show1,setShow1]=useState(false);
  const [ChairRuling,setChairRuling]=useState('');


{/*------------------------------------Name of PointOrderScreen-Member states----------------------------------------- */}

const[PointOrder,setPointOrder]=useState([]);
const [masterData,setMasterData]=useState([]);
const [SearchPointOrder,setSearchPointOrder]=useState([]);
const [Hide,setHide]=useState(true);
const [Hide2,setHide2]=useState(false);
   {/*------------------------------------ShowMemberBTn States----------------------------------------- */}
   const [ShowMemberBTn, setShowMemberBTn] = useState(false);

 {/*------------------------------------useEffect PointOrderScreen----------------------------------------- */}

useEffect(()=>{
  getPointOrder();
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
},[])

{/*------------------------------------getPointOrder method----------------------------------------- */}

const getPointOrder = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setPointOrder((user.member_list))
      setMasterData((user.member_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }

};
{/*------------------------------------renderItem for PointOrderScreen-Member ----------------------------------------- */}

const [POMoverCount,setPOMoverCount]=useState('');
const [POMoverAssembly,setPOMoverAssembly]=useState('');
const [POPartyName,setPOPartyName]=useState('')

const RenderItem1=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} 
onPress={()=>{
setSearchPointOrder(item.name)
setPOMoverCount(item.id)
setPOMoverAssembly(item.assembly)
setPOPartyName(item.party)
setHide(true)
}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}({item.party})</Text>
      </TouchableOpacity>
      </View>
  )
}


{/*------------------------------------ItemSeparator for PointOrderScreen-Member----------------------------------------- */}

const ItemSeparator1=({item})=>{
   return(
       <View style={{borderWidth:0.75,width:"100%",height:0.1,borderColor:"#fff",}}>
       </View>
   )
}

{/*------------------------------------SearchFilter for PointOrderScreen-Member states----------------------------------------- */}

const SearchFilter1=(text)=>{
if(text){
const newData=masterData.filter((item)=>{
   const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
   const textData=text.toUpperCase();
   return itemData.indexOf(textData) > -1 ;
});
setPointOrder(newData);
setSearchPointOrder(text);
}else{ 
setPointOrder(masterData);
setSearchPointOrder(text);
}
}



  //---------------------- FlatList-3 States  & method for store Member name---------- //
const [DATA2,SetDATA2]=useState([])
const [count,setCount]=useState(1);
const [MemberName,setMemberName]=useState(DATA2);


//-----------------------method for store Member name------------------------------- // 
const HandleSubmit2=()=>{
  const newArray=[...DATA2,{id:count,name:SearchPointOrder}]
  SetDATA2(newArray)
  setCount(count+1)
  setMemberName(newArray)
}  



 {/*---------------------------------------- Array----------------------------------------- */}
 
 
var Array=[];
for(let i = 0 ; i < PointOrderCount ; i++ ){
 Array.push(
  <View key={i}>

<View style={styles.paddingView}>
            <View style={styles.smallTextView}>
                <Text style={styles.smallText}>{i+1}</Text>
            </View>
 {/*---------------------------------------- Name of Members----------------------------------------- */}
 
 <TouchableOpacity onPress={()=>setHide2(!Hide2)}>
 <Text style={styles.QuestionsText}>Name of Member</Text>
 </TouchableOpacity>

 {
   Hide2 ? null :<TextInput
   placeholderTextColor="#fff"
   placeholder={'Name of Member-'+(i+1)}
   onChangeText={(text)=>{
     SearchFilter1(text)
     setHide(false)
     setShowMemberBTn(true)
    }}
   style={styles.TextInput}
 /> 
 }


 {      
    Hide ? null:  
    <View style={styles.FlatListView}>
    <FlatList style={styles.FlatList}
    nestedScrollEnabled={true}
    data={PointOrder}
    renderItem={RenderItem1}
    ItemSeparatorComponent={ItemSeparator1}
   />
   </View>
 
}     


{/*----------------------------------------FlatList to display name for Member----------------------------------------- */} 
<FlatList
data={MemberName}
renderItem={({item})=>{ if(item.id==i+1){
                        return(
                            <View style={styles.MemberTextInput}>
                                <Text style={styles.modalTextMember}>{item.name}</Text>
                            </View>
                        )}}}/>

{/*--------------///////////------------------------Add Member Btn----------------//////////////--------------------*/}

      { 
      ShowMemberBTn ?   <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit2()
      setShowMemberBTn(false)
      setHide2(true)
      }}>

      <Text style={styles.AddBtnText}>Add Member</Text>
      </TouchableOpacity>
     :null
  }


    
{/*---------------------------------------- Details----------------------------------------- */}
<Text style={styles.QuestionsText}>Description of PO</Text>
<TextInput 
 placeholder=''
 onChangeText={(e) => setPOrderDescription(e)}
  style={styles.TextInput}
 />

{/*---------------------------------------- Time----------------------------------------- */}

<View style={{flexDirection:"row",marginTop:20,alignItems:"center"}}>
<Text style={styles.QuestionsText1}>Time consumed</Text>
            <TextInput  
             style={styles.TextInputs}
             placeholderTextColor="#fff"
             placeholder="H"
             keyboardType="numeric"
             onChangeText={(value)=>setPOrderDebateHour(value)} />
        
            <TextInput  
             style={styles.TextInputs}
             placeholderTextColor="#fff"
             placeholder="M"
                keyboardType="numeric"
             onBlur={()=>setHide2(false)}
             onChangeText={(value)=>setPOrderDebateMins(value)} />
</View>

{/*---------------------------------------- RadioButtonRN----------------------------------------- */}

<RadioButtonRN
  data={POrderRadioBtn}
  textStyle={styles.RNLabelText}
  box={false}
  style={{marginBottom:7}}
  circleSize={14}
  selectedBtn={(item)=>{
    setShow(!show)
    setShow1(!show1)
    if(item.label=='Chair ruling available'){
      setChairRulingAvailable('Yes')
    }
}}
/>

{   show1? 
    <View>
          <TextInput style={styles.TextInput} placeholder="Chair Ruling" placeholderTextColor="#fff" onChangeText={(value)=>setChairRuling(value)} />
    </View> :null
} 

             <TouchableOpacity style={styles.addBTnTextView} onPress={()=>{ 
                      if(Check){
                      Alert.alert('Please fill detail in all fields')
                      }
                      else{
                        HandleSubmitPointOrder()
                        setChairRuling('')
                        setChairRulingAvailable('No')
                        setShow1(false)
                        Alert.alert('Details added sucessfully!')
                      }
                        }} >
                <Text style={styles.addBTnText}>Add Details</Text>
            </TouchableOpacity>

            

</View>
 </View>

  )
} 


const Check=  PointOrderCount.length==0 || SearchPointOrder.length==0 || POrderDescription.length==0 || POrderDebateHour.length==0 || POrderDebateMins.length==0

{/*---------------------------------------- Main Code----------------------------------------- */}

  return (
    
        <View style={styles.container}>
<KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
<Text style={styles.Text}>How many members spoke on POs?</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2} onChangeText={(value)=>setPointOrderCount(value)} />
</View>


      <TouchableOpacity style={styles.modalBtn}
        onPress={removeData}>
        <Text style={styles.modalBtnText}>Clear</Text>
      </TouchableOpacity>

{
  PointOrderCount.length==0 ?  null :<View style={styles.paddingView}>
  <Text style={styles.HeadingText}>Points of Order</Text>
  </View> 
}

{/*----------------------------------------Array Calling----------------------------------------- */}
<ScrollView nestedScrollEnabled={true} >
  {Array}
<View style={{marginBottom:100,marginTop:10}}/>
</ScrollView>

<TouchableOpacity 
onPress={()=>{
  if(PointOrderCount=='0'){
    StoreData()
    navigation.navigate('34 of 37')
  }
  else if(Check)
  {
  Alert.alert('Please fill detail in all fields')
  }else{
    StoreData()
    navigation.navigate('34 of 37')
  }
}} 
style={styles.forwardBtn}>

<Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('32 of 37')} style={styles.backBtn}>
          <Text style={styles.icon2}>➤</Text>
 </TouchableOpacity>

 </KeyboardAvoidingView>

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
    marginTop:25,
    fontFamily:"Montserrat-Medium",
    fontSize:17,
    paddingHorizontal:35,
  },
  QuestionsText:{
    marginTop:10,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:15,
    paddingHorizontal:2,
  },
  QuestionsText1:{
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:15,
    paddingHorizontal:5,
  },
  HeadingText:{
    fontFamily:"Montserrat-Medium",
    fontSize:16,
    marginTop:10,
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
    paddingHorizontal:10,
  },
  TextInputs:{
    backgroundColor:"#48C9B0",
    height:50,
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    color:"#fff",
    fontSize:17,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:12,
    textAlign:"center",
    width:80
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
DropDownPicker:{
  borderWidth:0.45,
  borderColor:"#f2f2f4",
  elevation:6,
  marginBottom:2,
  backgroundColor:"#48C9B0"
},
dropDownContainerStyle:{
  borderColor:"#f2f2f4",
  elevation:7,
  borderRadius:null,
  width:"99.4%",
  left:1,
  backgroundColor:"#F4F6F6",
},
listItemLabelStyle:{
  fontFamily:"Montserrat-Regular",
},
placeholderStyle:{
  color:"#fff",
  fontFamily:"Montserrat-Regular"
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
  fontSize:13,
},
addBTnTextView:{
  backgroundColor:"#48C9B0",
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F4F6F6",
  paddingHorizontal:10,
  marginTop:10,
},
addBTnText:{
  marginTop:2,
  marginBottom:2,
  fontFamily:"Montserrat-Medium",
  fontSize:13,
  color:"#fff",
  textAlign:"center"
},
paddingView:{
  paddingLeft:33,
  paddingRight:33,
  marginBottom:20
},
modalhandlebtnView:{
  flexDirection:"row",
  marginTop:2,
  marginBottom:2,
  },
  modalhandlebtn:{
  position:"absolute",
  right:1
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
    marginTop:50,
    height:HEIGHT-200,
    overflow:"hidden"
  },
  modalHeader:{
    alignItems:"center",
    justifyContent:"center",
    left:-1,
    height:40,
    backgroundColor:"#D0D3D4",
    width:"140%",
    overflow:"hidden",
    borderTopStartRadius:15,
    borderTopEndRadius:15,
    position:"absolute"
  },
  modalText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:14,
    paddingHorizontal:3,
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
  RenderItem1:{
    backgroundColor:"#fff",
    height:40,
    borderRadius:15,
    justifyContent:"center",
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:14,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginBottom:5,
    marginTop:5
  },
  FlatListText1:{
    fontSize:14,
    paddingHorizontal:2,
    fontFamily:"Montserrat-Regular",
},
FlatListView:{
  paddingHorizontal:5,
  justifyContent:"center",
  alignItems:"center",
  marginTop:10,
  marginBottom:20,
},
FlatList:{
  width:"100%",
  height:200,
},
modalTextMember:{
  fontFamily:"Montserrat-Regular",
  fontSize:14,
  color:"#fff"
},
MemberTextInput:{
  backgroundColor:"#48C9B0",
  height:60,
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F2F3F4",
  justifyContent:"center",
  paddingHorizontal:10,
},
AddBTn1:{
  backgroundColor:"#48C9B0",
  height:30,
  width:"100%",
  borderRadius:15,
  elevation:3,
  borderWidth:0.45,
  borderColor:"#F2F3F4",
  color:"#fff",
  justifyContent:"center",
  alignItems:"center",
},
AddBtnText:{
  color:"#fff",
  fontSize:12,
  fontFamily:"Montserrat-Medium",
},
RNLabelText:{
  fontFamily:"Montserrat-Regular",
  fontSize:14,
},
  
})