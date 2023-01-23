import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert,LogBox,ScrollView,Modal,FlatList} from 'react-native';
import React,{useState,useEffect,} from 'react';
const HEIGHT=Dimensions.get("window").height;
import RadioButtonRN from 'radio-buttons-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PrivilegeQuestionsScreen({navigation}) {
  const [modalVisibleMov, setmodalVisibleMov] = useState(false);

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////-------------------------------DebateModal Code Start----------------------------///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////// =========States for store PrivilegeDebateArray===========/////////
const [DebateDATA0,SetDebateDATA0]=useState([])
const [PrivilegeDebateArray,setPrivilegeDebateArray]=useState(DebateDATA0);
const [Debatecount0,setDebatecount0]=useState(1);
const data = [{label: 'Add Details',}];

////////////========method for store PrivilegeDebateArray========///////////////

const HandleSubmitDebate=()=>{
  const newArray=[...DebateDATA0,
    {
    privilegeDebateCount:Debatecount0,
    memberName:SearchPrivilegeMember,
    member_id:MemberID,
    privilegeDescription:PrivilegeDescription,
    privilegeDebateHour:PrivilegeDebateHour,
    privilegeDebateMins:PrivilegeDebateMins,
  }]
  setPrivilegeDebateArray(newArray)
  SetDebateDATA0(newArray)
  setDebatecount0(Debatecount0+1)
}


{/*----------------------------------------States----------------------------------------- */}
 const [PrivilegeDebateCount,setPrivilegeDebateCount]=useState('');
 const [PrivilegeDebateMember,setPrivilegeDebateMember]=useState("");
 const [PrivilegeDescription,setPrivilegeDescription]=useState("");
 const [PrivilegeDebateHour,setPrivilegeDebateHour]=useState("");
 const [PrivilegeDebateMins,setPrivilegeDebateMins]=useState("");

 const [masterDataDebate,setmasterDataDebate]=useState([]);
 const [SearchPrivilegeMember,setSearchPrivilegeMember]=useState([]);
 const [DebateHide,setDebateHide]=useState(true);
 const [DebateHide2,setDebateHide2]=useState(false);

 {/*------------------------------------ShowMemberBTn States----------------------------------------- */}
 const [ShowMemberBTn, setShowMemberBTn] = useState(false);

//------------------------getName from Api-------------------------//


const getName = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setPrivilegeDebateMember((user.member_list))
      setmasterDataDebate((user.member_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }

};
 
  //------------------------renderItem for FlatList-------------------------//
const [DebateParty,SetDebateParty]=useState('');
const [MemberID,SetMemberID]=useState('');

 const renderItem=({item})=>{
     return(
         <View >
<TouchableOpacity style={styles.RenderItem} onPress={()=>{
  setSearchPrivilegeMember(item.name)
  SetDebateParty(item.party)
  SetMemberID(item.id)
  setDebateHide(true)
  }}>
<Text numberOfLines={3} style={styles.FlatListText}>{item.name}({item.party})</Text>
         </TouchableOpacity>
         </View>
     )
 }

  //------------------------ItemSeparator for FlatList-------------------------//

 const ItemSeparator=({item})=>{
     return(
         <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:2,marginTop:4}}>
         </View>
     )
 }

 //------------------------SearchFilter Method for FlatList-------------------------//

 const SearchFilter=(text)=>{
if(text){
 const newData=masterDataDebate.filter((item)=>{
     const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
     const textData=text.toUpperCase();
     return itemData.indexOf(textData) > -1 ;
 });
 setPrivilegeDebateMember(newData);
 setSearchPrivilegeMember(text);
}else{ 
 setPrivilegeDebateMember(masterDataDebate);
 setSearchPrivilegeMember(text);
}
 }


//---------------------- FlatList States  & method for store Member name---------- //
const [DebateDATA2,SetDebateDATA2]=useState([])
const [countDebate,setcountDebate]=useState(1);
const [MemberName,setMemberName]=useState(DebateDATA2);


//-----------------------method for store Member name------------------------------- // 
const HandleSubmitDebate2=()=>{
const newArray=[...DebateDATA2,{id:countDebate,name:SearchPrivilegeMember,party:DebateParty,member_id:MemberID}]
SetDebateDATA2(newArray)
setcountDebate(countDebate+1)
setMemberName(newArray)
}  

{/*---------------------------------------- DebateArray----------------------------------------- */}
var DebateArray=[];
for(let i = 0 ; i < PrivilegeDebateCount ; i++ ){
DebateArray.push(
<View key={i}>
          <View style={styles.smallTextView}>
              <Text style={styles.smallText}>{i+1}</Text>
          </View>

{/*---------------------------------------- Member----------------------------------------- */}

<TouchableOpacity onPress={()=>setDebateHide2(!DebateHide2)}>
<Text style={styles.QuestionsText}>Member</Text>
</TouchableOpacity>

{
 DebateHide2 ? null :<TextInput
 placeholder={'Name of Member-'+(i+1)}
 placeholderTextColor="#fff"
 onChangeText={(text)=>{
   SearchFilter(text)
   setDebateHide(false)
   setShowMemberBTn(true)
  }}
 style={styles.TextInput}
/> 
}


{      
  DebateHide ? null:  
  <FlatList style={styles.FlatList}
 data={PrivilegeDebateMember}
 nestedScrollEnabled={true}
 renderItem={renderItem}
 />
}    

{/*--------------///////////------------------------Display Debate member----------------//////////////--------------------*/}


<FlatList
data={MemberName}
renderItem={({item})=>{ if(item.id==i+1){
                        return(
                            <View style={styles.MoverTextInput}>
                                <Text style={styles.modalTextMover}>{item.name}({item.party})</Text>
                            </View>
                        )}}}/>

{/*--------------///////////------------------------Add Member Btn----------------//////////////--------------------*/}

    {
    ShowMemberBTn ?   <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
    HandleSubmitDebate2()
    setShowMemberBTn(false)
    }}>

    <Text style={styles.AddBtnText}>Add Member</Text>
    </TouchableOpacity>
   :null
}

  
<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:5,marginTop:10}}/>
{/*---------------------------------------- Details----------------------------------------- */}
<Text style={styles.QuestionsText}>Description</Text>
<TextInput 
placeholder=''
onChangeText={(e) => setPrivilegeDescription(e)}
style={styles.TextInput}
/>

{/*---------------------------------------- Time----------------------------------------- */}
<View style={{flexDirection:"row",marginTop:10}}>
<Text style={styles.QuestionsText}>Time</Text>
          <TextInput  
           style={styles.TextInputs}
           placeholderTextColor="#fff"
           placeholder="H"
           keyboardType="numeric"
           onChangeText={(value)=>setPrivilegeDebateHour(value)} />
      
          <TextInput  
           style={styles.TextInputs}
           placeholderTextColor="#fff"
           placeholder="M"
           keyboardType="numeric"
           onBlur={()=>setDebateHide2(false)}
           onChangeText={(value)=>setPrivilegeDebateMins(value)} />
</View>

<RadioButtonRN
data={[{label: 'Add debate-'+(i+1)+' details'}]}
textStyle={styles.RNLabelText}
box={false}
circleSize={14}
selectedBtn={(e)=>{
  HandleSubmitDebate(e)
  setDebateHide2(false)
  setSearchPrivilegeMember('')
  setMemberName('')
  Alert.alert('Details Added Successfully!')
  }}
/>


{/*---------------------------------------- Item Seperator----------------------------------------- */}

<View style={{width:"100%",height:0.5,borderWidth:0.5,marginTop:5,marginBottom:15,borderColor:"#CACFD2"}}/>         
</View>
)
} 
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////-------------------------------DebateModal Code End----------------------------///////////
   ///////////////////////////////////////////////////////////////////////////////////////////////////////


  //--------------------useEffect & State for retrieveData-----------------//
  const[Value,setValue]=useState('');
  
  //-------------------retrieveData---------------//
  const retrieveData = async () => {

    try {
      const userToken = await AsyncStorage.getItem("Screen-23").then(value=>{if(value!=null){
        var user=JSON.parse(value)
        setValue(user.Was_Question_Hour_Held)
        console.log(user.Was_Question_Hour_Held)
      }})
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };

///////// =========States for store PrivilegeArray===========/////////
  const [DATA0,SetDATA0]=useState([])

  const [PrivilegeArray,setPrivilegeArray]=useState(DATA0);
  const [count0,setCount0]=useState(1);
  
////////////========method for store PrivilegeArray========///////////////
  
  const HandleSubmit0=()=>{
    const newArray=[...DATA0,
      {
      privilegeCount:count0,
      mover_Array:PrivilegeMoverArray,
      detail:text3,
      status:text4.value,
      qopType:text1.value,
      DebateHeld:DebateHeld,
      PrivilegeDebateArray:PrivilegeDebateArray
    }]
    setPrivilegeArray(newArray)
    SetDATA0(newArray)
    setCount0(count0+1)
  }

  //Mover Name Array//

  const [MoverDATA0,SetMoverDATA0]=useState([])
  const [PrivilegeMoverArray,setPrivilegeMoverArray]=useState(MoverDATA0);
  const [Movercount0,setMoverCount0]=useState(1);

  const HandleSubmitMover=()=>{
    const newArray=[...MoverDATA0,
      {
      privilegeMoverCount:Movercount0,
      moverName:{assembly:Assembly,id:MoverPersonCount,name:SearchPrivilegeMover,party:PartyName},
    }]
    setPrivilegeMoverArray(newArray)
    SetMoverDATA0(newArray)
    setMoverCount0(Movercount0+1)
  }

  {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

  const StoreData=async()=>{
    try {
      var user={
        Number_of_Questions_of_Privilege:PrivilegeCount,
        Questions_of_Privilege:PrivilegeArray,
      }
     await AsyncStorage.setItem('Screen-25',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }


 {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
  const removeData=async()=>{
    try {
     await AsyncStorage.removeItem('Screen-25')
     navigation.replace('25 of 37')
     console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////   PrivilegeQuestionsScreen Code ///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {/*----------------------------------------States----------------------------------------- */}
  const[PrivilegeCount,setPrivilegeCount]=useState('');

    {/*------------------------------------ShowMoverBTn States----------------------------------------- */}
    const [ShowMoverBTn, setShowMoverBTn] = useState(false);
    {/*------------------------------------ShowQoPBTn States----------------------------------------- */}
    const [ShowQoPBTn, setShowQoPBTn] = useState(false);
    {/*------------------------------------ShowStatusBTn States----------------------------------------- */}
    const [ShowStatusBTn, setShowStatusBTn] = useState(false);
  
{/*-------------(State-2)-----------------------PrivilegeMover-Mover----------------------------------------- */}
  const [text1,setText1]=useState("");
  {/*-------------(State-4)-----------------------PrivilegeMover-ConcernedMinistryR----------------------------------------- */}
  const [text3,setText3]=useState("");
  const [text4,setText4]=useState("");


  {/*-----------------------------------Show & Hide States----------------------------------------- */}

  const [Hide,setHide]=useState(true);
  const [Hide2,setHide2]=useState(false);

  const Privilege = [{label: 'Check the box if debate was held'}];
  const [DebateHeld,setDebateHeld]=useState('No')


  {/*------------------------------------Modal States----------------------------------------- */}
  const [modalVisible, setModalVisible] = useState(false);

{/*------------------------------------Name PrivilegeMover-Mover states----------------------------------------- */}

const[PrivilegeMover,setPrivilegeMover]=useState([]);
const [masterData,setMasterData]=useState([]);
const [SearchPrivilegeMover,setSearchPrivilegeMover]=useState([]);


 {/*------------------------------------useEffect PrivilegeMover-Mover----------------------------------------- */}

useEffect(()=>{
  getPrivilegeMover();
  retrieveData();
  getName();
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
},[])

{/*------------------------------------getPrivilegeMover method----------------------------------------- */}

const getPrivilegeMover = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setPrivilegeMover((user.member_list))
      setMasterData((user.member_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }

};

{/*------------------------------------renderItem for  PrivilegeMover-Mover ----------------------------------------- */}

   const [MoverPersonCount,setMoverPersonCount]=useState('');
   const [Assembly,setAssembly]=useState('');
   const [PartyName,setPartyName]=useState('')

const RenderItem1=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} 
onPress={()=>{
setSearchPrivilegeMover(item.name)
setMoverPersonCount(item.id)
setAssembly(item.assembly)
setPartyName(item.party)
setHide(true)

}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}({item.party})</Text>
      </TouchableOpacity>
      </View>
  )
}


{/*------------------------------------ItemSeparator for  PrivilegeMover-Mover----------------------------------------- */}

const ItemSeparator1=({item})=>{
   return(
       <View style={{borderWidth:0.75,width:"100%",height:0.1,borderColor:"#fff",}}>
       </View>
   )
}

{/*------------------------------------SearchFilter for  PrivilegeMover-Mover states----------------------------------------- */}

const SearchFilter1=(text)=>{
if(text){
const newData=masterData.filter((item)=>{
   const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
   const textData=text.toUpperCase();
   return itemData.indexOf(textData) > -1 ;
});
setPrivilegeMover(newData);
setSearchPrivilegeMover(text);
}else{ 
setPrivilegeMover(masterData);
setSearchPrivilegeMover(text);
}
}


  {/*---------------------------------------- Drop-Down States----------------------------------------- */}
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Not Taken Up', value: 'Not Taken Up'},
    {label: 'Disposed off', value: 'Disposed off'},
    {label: 'Referred to Committee', value: 'Referred to Committee'},
    {label: 'Withdrawn', value: 'Withdrawn'},
    {label: 'Out of Order', value: 'Out of Order'},
    {label: 'Taken up but no concluded', value: 'Taken up but no concluded'},
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Personal', value: 'Personal'},
    {label: 'Committee', value: 'Committee'},
    {label: 'House', value: 'House'},
    
  ]);


//////////////////////////////////////////////////------DropDown & Search list Display Values States(Started)---------/////////////////////////////////////////////////////


//---------------------- FlatList States  & method for store Mover name---------- //
const [DATA,SetDATA]=useState([])
const [count,setCount]=useState(1);
const [MoverName,setMoverName]=useState(DATA);


//-----------------------method for store Mover name------------------------------- // 
const HandleSubmit=()=>{
  const newArray=[...DATA,{id:count,name:SearchPrivilegeMover,party:PartyName}]
  SetDATA(newArray)
  setCount(count+1)
  setMoverName(newArray)
}  


//---------------------- FlatList States  & method for store QoP Type---------- //
  const [DATA1,SetDATA1]=useState([])
  const [count1,setCount1]=useState(1);
  
//-----------------------method for store QoP  Type------------------------------- // 
  const HandleSubmit1=()=>{
    const newArray=[...DATA1,{id:count1,QoPType:text1.value}]
    SetDATA1(newArray)
    setCount1(count1+1)
  }

        //---------------------- FlatList States  & method for store Status Type---------- //
        const [DATA2,SetDATA2]=useState([])
        const [count2,setCount2]=useState(1);
        
      //-----------------------method for store Status Type------------------------------- // 
        const HandleSubmit2=()=>{
          const newArray=[...DATA2,{id:count2,statusType:text4.value}]
          SetDATA2(newArray)
          setCount2(count2+1)
        }

  
        const MoverModal=()=>{
          return(
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleMov}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setmodalVisibleMov(!modalVisibleMov);
            }}>
      <View style={styles.outerDebateView}>
        <View style={styles.DropDownPickerView}>
          <Text style={styles.Text1}>Movers List</Text> 
             
<FlatList
data={MoverName}
renderItem={({item})=>{
  return(
    <View style={styles.MoverTextInput}>
        <Text style={styles.modalTextMover}>{item.name}({item.party})</Text>
    </View>
)}}
/>
  
             {/*------------------------------------Modal Handle Modal btn----------------------------------------- */}
             <View style={{width:"100%",height:40}} />
                 <View style={styles.modalhandlebtnView1} >
                 <TouchableOpacity onPress={()=>setmodalVisibleMov(!modalVisibleMov)}>
                     <Text style={styles.modalText}>Cancel</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.modalhandlebtnView} onPress={onRemove}>
                     <Text style={styles.modalText}>Clear List</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.modalhandlebtnView2} onPress={()=>{
                  setmodalVisibleMov(!modalVisibleMov)
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
  setMoverName([])
  SetDATA('')
  setCount(1)
};

//////////////////////////////////////////////////------DropDown DropDown & Search list Display Values States(Ended)---------/////////////////////////////////////////////////////

 {/*---------------------------------------- Array----------------------------------------- */}
 
 
var Array=[];
for(let i = 0 ; i < PrivilegeCount; i++ ){
 Array.push(
  <View key={i}>

<View style={styles.paddingView}>
            <View style={styles.smallTextView}>
                <Text style={styles.smallText}>{i+1}</Text>
            </View>

 {/*---------------------------------------- Name of Mover(s)----------------------------------------- */}
 <TouchableOpacity onPress={()=> setmodalVisibleMov(!modalVisibleMov)}>
 <Text style={styles.QuestionsText}>Name of Mover(s)</Text>
 </TouchableOpacity>

<TextInput
   placeholder={'Name of Mover-'+(i+1)}
   placeholderTextColor="#fff"
   onChangeText={(text)=>{
     SearchFilter1(text)
     setHide(false)
     setShowMoverBTn(true)
    }}
   style={styles.TextInput}
 /> 

 


{/*-----FlatList to Search for name of mover---------- */} 


{
  Hide ? null :<View style={styles.FlatListView}>
  <FlatList style={styles.FlatList}
  nestedScrollEnabled={true}
  data={PrivilegeMover}
  renderItem={RenderItem1}
  ItemSeparatorComponent={ItemSeparator1}
 />
 </View>
}

{MoverModal()}


{/*--------------///////////------------------------Add Mover Btn----------------//////////////--------------------*/}

      {
      ShowMoverBTn ?   <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit()
      HandleSubmitMover();
      setShowMoverBTn(false)
      setHide2(true)
      Alert.alert(
        "Mover Added!",
        SearchPrivilegeMover,
        [
          {
            text: "View Mover(s)",
            onPress: () => setmodalVisibleMov(!modalVisibleMov),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );

     
      }}>
      <Text style={styles.AddBtnText}>Add Mover</Text>
      </TouchableOpacity>
     :null
  }   

<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:5,marginTop:10}}/>



<Text style={styles.QuestionsText}>Details</Text>
<TextInput 
 placeholder=''
 onChangeText={(e) => setText3(e)}
  style={styles.TextInput}
 />

{/*------------------------///////////////---------------- Status------------//////////////////----------------------------- */}
<Text style={styles.QuestionsText}>Status</Text>
<DropDownPicker style={styles.DropDownPicker} 
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
                  arrowIconStyle={{width: 15,height: 15}}
                  onSelectItem={(e) =>{
                    setText4(e)
                    setShowStatusBTn(true)
                  
                  }}
                  placeholder={
                    <FlatList
                    data={DATA2}
                    renderItem={({item})=>{ if(item.id==i+1){
                        return(
                            <View>
                                <Text style={styles.dropDownText}>{item.statusType}</Text>
                            </View>
                        )}}}/>
                } 
                  color="#fff"
                  placeholderStyle={styles.placeholderStyle}
                  open={open1}
                  setOpen={setOpen1}
                  items={items1}
                  setItems={setItems1}
                  dropDownDirection="TOP"
                  zIndex={1500}
                />

 {/*------------------------ Add Status Type------------------------*/}

 {
    ShowStatusBTn ?  <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit2()
      setShowStatusBTn(false)
      }}>
      <Text style={styles.AddBtnText}>Add Status Type</Text>
      </TouchableOpacity>
     :null
  }

{/*-------------//////////----------------------Type of QoP?------------------//////////----------------------- */}

<Text style={styles.QuestionsText}>Type of QoP?</Text>
<DropDownPicker style={styles.DropDownPicker} 
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
                  arrowIconStyle={{width: 15,height: 15}}
                  onSelectItem={(e) =>{
                    setText1(e)
                    setShowQoPBTn(true)
                  
                  }}
                  placeholder={
                    <FlatList
                    data={DATA1}
                    renderItem={({item})=>{ if(item.id==i+1){
                        return(
                            <View>
                                <Text style={styles.dropDownText}>{item.QoPType}</Text>
                            </View>
                        )}}}/>
                } 
                  color="#fff"
                  placeholderStyle={styles.placeholderStyle}
                  open={open2}
                  setOpen={setOpen2}
                  items={items2}
                  setItems={setItems2}
                  dropDownDirection="TOP"
                  zIndex={2000}
                />

{/*------------------------Add QoP------------------------*/}

{
    ShowQoPBTn ?  <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit1()
      setShowQoPBTn(false)
      setHide2(false)
      }}>
      <Text style={styles.AddBtnText}>Add QoP</Text>
      </TouchableOpacity>
     :null
  }


{/*---------------------------------------- RadioButtonRN----------------------------------------- */}

<RadioButtonRN
  data={Privilege}
  textStyle={styles.RNLabelText}
  box={false}
  circleSize={17}
  style={{marginBottom:10}}
  selectedBtn={(item)=>{
    setModalVisible(!modalVisible)
    if(item.label=='Check the box if debate was held'){
      setDebateHeld('Yes')
    }
    }}
/>

{/*---------------------------------------- Save Form-{i+1} Details----------------------------------------- */}

   <TouchableOpacity style={styles.AddBTn1} onPress={()=>{ 
                      if(Check){
                      Alert.alert('Please fill detail in all fields')
                      }
                      else{
                        HandleSubmit0()
                        setPrivilegeDebateArray([])
                        setDebateHeld("No")
                        setMemberName('')
                        setSearchPrivilegeMember('')
                        setSearchPrivilegeMover('')
                        setMoverName([])
                        SetMoverDATA0([])
                        SetDATA('')
                        setCount(1)
                        setMoverCount0(1)
                        Alert.alert('Details added for form-'+ (i+1))
                      }
                        }}>
      <Text style={styles.AddBtnText}>Save Form-{i+1} Details</Text>
      </TouchableOpacity>

</View>
 </View>

  )
} 


{/*------------------------------------ PrivilegeMover Modal code start----------------------------------------- */}

     const PrivilegeModal=()=>{
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
{/*------/////////////////////-----------------DebateModal Calling start----------////////////////-------------------- */}

                <Text style={styles.Text}>Number of debates</Text>

<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2} onChangeText={(value)=>setPrivilegeDebateCount(value)} />

{/*----------------------------------------DebateArray Calling----------------------------------------- */}
<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
{DebateArray}

<View style={{marginBottom:100,marginTop:10}}/>
</ScrollView>
                                   
    {/*------------------------------------Modal Handle Modal btn----------------------------------------- */}
        <View style={{width:"100%",height:40}} />
         <View style={styles.modalBtn2} >
         <TouchableOpacity onPress={()=>{
             setModalVisible(!modalVisible)
             setPrivilegeDebateCount()
             setSearchPrivilegeMember()
             SetDebateDATA0([])
             setDebatecount0(1)
             }}>
             <Text style={styles.modalBtnText}>Close</Text>
        </TouchableOpacity>

         </View>
         
                    </View>
                    </View>
        </Modal>         
      )
    }

     {/*-----------/////////////////-------------------------Privilege Modal Code (End)---------///////////////////////-------------------------------- */}



     const Check=PrivilegeCount.length==0  || text1.length==0 || text3.length==0 || text4.length==0 


{/*---------------------------------------- Main Code----------------------------------------- */}

  return (
    
        <View style={styles.container}>

<Text style={styles.Text}>How many questions of privilege were raised?</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2}  onChangeText={(value)=>setPrivilegeCount(value)} />
</View>

{
  PrivilegeCount.length==0 ?  null :<View style={styles.paddingView}>
  <Text style={styles.HeadingText}>Questions of Privilege</Text>
  </View> 
}

{/*----------------------------------------Array Calling----------------------------------------- */}
<ScrollView nestedScrollEnabled={true} >
  {Array}
<View style={{marginBottom:100,marginTop:10}}/>
{PrivilegeModal()}
</ScrollView>

      <TouchableOpacity style={styles.modalBtn}
        onPress={removeData}>
        <Text style={styles.modalBtnText}>Clear</Text>
      </TouchableOpacity>

      

      <TouchableOpacity 
onPress={()=>{
  if(PrivilegeCount=='0'){
    StoreData()
    navigation.navigate('26 of 37')
  }
  else if(Check)
  {
  Alert.alert('Please enter details in all fields')
  }else{
    StoreData()
    navigation.navigate('26 of 37')
  }
}} 
style={styles.forwardBtn}>

<Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>{
   if(Value==='No')
   {
   navigation.navigate('23 of 37')
  }
  else{
    navigation.navigate('24 of 37')
  }
 }} style={styles.backBtn}>
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
  QuestionsText:{
    marginTop:10,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:15,
    paddingHorizontal:2,
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
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10
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
    right:10,
    top:25,
    backgroundColor:"#48C9B0",
    borderWidth:0.45,
    elevation:5,
    borderColor:"#F4F6F6",
    borderRadius:15,
    paddingHorizontal:15,
  },
  modalBtn2:{
    position:"absolute",
    right:10,
    bottom:10,
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
    fontSize:17,
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
  marginTop:20,
  marginBottom:30,
},
FlatList:{
  width:"100%",
  height:200,
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
MoverTextInput:{
  backgroundColor:"#48C9B0",
  height:60,
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F2F3F4",
  justifyContent:"center",
  paddingHorizontal:10,
},
modalTextMover:{
  fontFamily:"Montserrat-Regular",
  fontSize:14,
  color:"#fff"
},
dropDownText:{
  color:"#fff",
  fontSize:14,
  fontFamily:"Montserrat-Regular",
}, 
TextInputs:{
    backgroundColor:"#48C9B0",
    height:50,
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    color:"#fff",
    fontSize:14,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:12,
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
SaveBTnView:{
  backgroundColor:"#48C9B0",
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F4F6F6",
  paddingHorizontal:10,
  marginTop:10
},
SaveBTnText:{
  marginTop:2,
  marginBottom:2,
  fontFamily:"Montserrat-Medium",
  textAlign:"center",
  fontSize:13,
  color:"#fff"
},
  smallText:{
  marginTop:2,
  marginBottom:2,
  fontFamily:"Montserrat-Medium",
  fontSize:13,
},
paddingView:{
  paddingLeft:33,
  paddingRight:33,
  marginBottom:20
},

  RenderItem:{
    backgroundColor:"#fff",
    height:40,
    borderRadius:15,
    justifyContent:"center",
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:17,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginBottom:5,
    marginTop:5
  },
  FlatListText:{
    fontSize:14,
    paddingHorizontal:2,
    fontFamily:"Montserrat-Regular",
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
},  Text1:{
  marginTop:25,
  marginBottom:20,
  fontFamily:"Montserrat-Medium",
  fontSize:17,
  textAlign:"center"
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
 
})