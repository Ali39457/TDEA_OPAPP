import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert,LogBox,ScrollView,Modal,FlatList} from 'react-native';
import React,{useState,useEffect,} from 'react';
const HEIGHT=Dimensions.get("window").height;
import RadioButtonRN from 'radio-buttons-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResolutionScreen({navigation}) {
  const [modalVisibleMov, setmodalVisibleMov] = useState(false);


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////-------------------------------DebateModal Code Start----------------------------///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////// =========States for store ResolutionDebateArray===========/////////
const [DebateDATA0,SetDebateDATA0]=useState([])
const [ResolutionDebateArray,setResolutionDebateArray]=useState(DebateDATA0);
const [Debatecount0,setDebatecount0]=useState(1);
const data = [{label: 'Add Details',}];

////////////========method for store ResolutionDebateArray========///////////////

const HandleSubmitDebate=()=>{
  const newArray=[...DebateDATA0,
    {
    ResolutionDebateCount:Debatecount0,
    memberName:SearchResolutionMember,
    member_id:MemberID,
    ResolutionDescription:ResolutionDescription,
    ResolutionDebateHour:ResolutionDebateHour,
    ResolutionDebateMins:ResolutionDebateMins,
  }]
  setResolutionDebateArray(newArray)
  SetDebateDATA0(newArray)
  setDebatecount0(Debatecount0+1)
}


{/*----------------------------------------States----------------------------------------- */}
 const [ResolutionDebateCount,setResolutionDebateCount]=useState('');
 const [ResolutionDebateMember,setResolutionDebateMember]=useState("");
 const [ResolutionDescription,setResolutionDescription]=useState("");
 const [ResolutionDebateHour,setResolutionDebateHour]=useState("");
 const [ResolutionDebateMins,setResolutionDebateMins]=useState("");

 const [masterDataDebate,setmasterDataDebate]=useState([]);
 const [SearchResolutionMember,setSearchResolutionMember]=useState([]);
 const [DebateHide,setDebateHide]=useState(true);
 const [DebateHide2,setDebateHide2]=useState(false);

 {/*------------------------------------ShowMemberBTn States----------------------------------------- */}
 const [ShowMemberBTn, setShowMemberBTn] = useState(false);

//------------------------getName from Api-------------------------//


const getName = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setResolutionDebateMember((user.member_list))
      setmasterDataDebate((user.member_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }

};
 
  //------------------------renderItem for FlatList-------------------------//
const [DebateParty,SetDebateParty]=useState('')
const [MemberID,SetMemberID]=useState('')
 const renderItem=({item})=>{
     return(
         <View >
<TouchableOpacity style={styles.RenderItem} onPress={()=>{
  setSearchResolutionMember(item.name)
  SetMemberID(item.id)
  SetDebateParty(item.party)
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
 setResolutionDebateMember(newData);
 setSearchResolutionMember(text);
}else{ 
 setResolutionDebateMember(masterDataDebate);
 setSearchResolutionMember(text);
}
 }


//---------------------- FlatList States  & method for store Member name---------- //
const [DebateDATA2,SetDebateDATA2]=useState([])
const [countDebate,setcountDebate]=useState(1);
const [MemberName,setMemberName]=useState(DebateDATA2);


//-----------------------method for store Member name------------------------------- // 
const HandleSubmitDebate2=()=>{
const newArray=[...DebateDATA2,{id:countDebate,name:SearchResolutionMember,party:DebateParty,member_id:MemberID}]
SetDebateDATA2(newArray)
setcountDebate(countDebate+1)
setMemberName(newArray)
}  

{/*---------------------------------------- DebateArray----------------------------------------- */}
var DebateArray=[];
for(let i = 0 ; i < ResolutionDebateCount ; i++ ){
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
 data={ResolutionDebateMember}
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
onChangeText={(e) => setResolutionDescription(e)}
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
           onChangeText={(value)=>setResolutionDebateHour(value)} />
      
          <TextInput  
           style={styles.TextInputs}
           placeholderTextColor="#fff"
           placeholder="M"
           keyboardType="numeric"
           onBlur={()=>setDebateHide2(false)}
           onChangeText={(value)=>setResolutionDebateMins(value)} />
</View>

<RadioButtonRN
data={[{label: 'Add debate-'+(i+1)+' details'}]}
textStyle={styles.RNLabelText}
box={false}
circleSize={14}
selectedBtn={(e)=>{
  HandleSubmitDebate(e)
  setDebateHide2(false)
  setSearchResolutionMember('')
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


  //////// =========States for store ResolutionArray===========/////////
  const [DATAA,SetDATAA]=useState([])
  const [ResolutionArray,setResolutionArray]=useState(DATAA);
  const [countResolution,setCountResolution]=useState(1);
  
////////////========method for store ResolutionArray========///////////////
  
  const HandleSubmitResolution=()=>{
    const newArray=[...DATAA,
      {
        resolutionCount:countResolution,
        mover_Array:ResolutionMoverArray,
        agendaType:text1.value,
        concernedMinistryName:{name:SearchConcernedMinistryR,id:ConcernedMinistryRCount},
        Detail:text3,
        Status:text4.value,
        DebateHeld:DebateHeld,
        ResolutionDebateArray:ResolutionDebateArray,
    }]
    setResolutionArray(newArray)
    SetDATAA(newArray)
    setCountResolution(countResolution+1)
  }

  {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

  const StoreData=async()=>{
    try {
      var user={
        Number_of_Resolution:ResolutionScreenCount,
        Resolution:[...ResolutionArray]
      }
     await AsyncStorage.setItem('Screen-29',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }


 {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
  const removeData=async()=>{
    try {
     await AsyncStorage.removeItem('Screen-29')
     navigation.replace('29 of 37')
     console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// ResolutionScreen Code //////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Mover Name Array//

  const [MoverDATA0,SetMoverDATA0]=useState([])
  const [ResolutionMoverArray,setResolutionMoverArray]=useState(MoverDATA0);
  const [Movercount0,setMoverCount0]=useState(1);

  const HandleSubmitMover=()=>{
    const newArray=[...MoverDATA0,
      {
      ResolutionMoverCount:Movercount0,
      moverName:{assembly:ResolutionMoverAssembly,id:ResolutionMoverCount,name:SearchResolutionMover,party:ResolutionPartyName},
    }]
    setResolutionMoverArray(newArray)
    SetMoverDATA0(newArray)
    setMoverCount0(Movercount0+1)
  }


  {/*----------------------------------------States----------------------------------------- */}
  const[ResolutionScreenCount,setResolutionScreenCount]=useState('');

    {/*------------------------------------ShowMoverBTn States----------------------------------------- */}
    const [ShowMoverBTn, setShowMoverBTn] = useState(false);
    {/*------------------------------------ShowAgendaBTn States----------------------------------------- */}
    const [ShowAgendaBTn, setShowAgendaBTn] = useState(false);
     {/*------------------------------------ShowConcernedBTn States----------------------------------------- */}
     const [ShowConcernedBTn, setShowConcernedBTn] = useState(false);
    {/*------------------------------------ShowStatusBTn States----------------------------------------- */}
    const [ShowStatusBTn, setShowStatusBTn] = useState(false);
  
  {/*-------------(State-2)-----------------------ResolutionMover-Mover----------------------------------------- */}
  const [text1,setText1]=useState("");
  {/*-------------(State-4)-----------------------ResolutionMover-ConcernedMinistryR----------------------------------------- */}
  const [text3,setText3]=useState("");
  const [text4,setText4]=useState("");


  {/*-----------------------------------Show & Hide States----------------------------------------- */}

  const [Hide,setHide]=useState(true);
  const [Hide2,setHide2]=useState(false);

  const [Hide1,setHide1]=useState(true);
  const [Hide3,setHide3]=useState(false);

  const ResolutionRadioBTn = [{label: 'Check the box if debate was held'}];
  const [DebateHeld,setDebateHeld]=useState('No')

  {/*------------------------------------Modal States----------------------------------------- */}
  const [modalVisible, setModalVisible] = useState(false);

{/*------------------------------------Name ResolutionMover-Mover states----------------------------------------- */}

const[ResolutionMover,setResolutionMover]=useState([]);
const [masterData,setMasterData]=useState([]);
const [MasterMoverData,setMasterMoverData]=useState([]);

const [SearchResolutionMover,setSearchResolutionMover]=useState([]);


 {/*------------------------------------useEffect ResolutionMover-Mover----------------------------------------- */}

useEffect(()=>{
  getResolutionMover();
  getConcernedMinistryR();
  getName();
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
},[])

{/*------------------------------------getResolutionMover method----------------------------------------- */}

const getResolutionMover = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setResolutionMover((user.member_list))
      setMasterMoverData((user.member_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }

};

{/*------------------------------------renderItem for  ResolutionMover-Mover ----------------------------------------- */}

const [ResolutionMoverCount,setResolutionMoverCount]=useState('');
const [ResolutionMoverAssembly,setResolutionMoverAssembly]=useState('');
const [ResolutionPartyName,setResolutionPartyName]=useState('')

const RenderItem1=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} 
onPress={()=>{
setSearchResolutionMover(item.name)
setResolutionMoverCount(item.id)
setResolutionMoverAssembly(item.assembly)
setResolutionPartyName(item.party)
setHide(true)

}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}({item.party})</Text>
      </TouchableOpacity>
      </View>
  )
}


{/*------------------------------------ItemSeparator for  ResolutionMover-Mover----------------------------------------- */}

const ItemSeparator1=({item})=>{
   return(
       <View style={{borderWidth:0.75,width:"100%",height:0.1,borderColor:"#fff",}}>
       </View>
   )
}

{/*------------------------------------SearchFilter for  ResolutionMover-Mover states----------------------------------------- */}

const SearchFilter1=(text)=>{
if(text){
const newData=MasterMoverData.filter((item)=>{
   const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
   const textData=text.toUpperCase();
   return itemData.indexOf(textData) > -1 ;
});
setResolutionMover(newData);
setSearchResolutionMover(text);
}else{ 
setResolutionMover(MasterMoverData);
setSearchResolutionMover(text);
}
}



{/*------------------------------------ConcernedMinistryR  ResolutionMover states----------------------------------------- */}

const[ConcernedMinistryR,setConcernedMinistryR]=useState([]);
const [SearchConcernedMinistryR,setSearchConcernedMinistryR]=useState([]);


{/*------------------------------------getConcernedMinistryR method----------------------------------------- */}

const getConcernedMinistryR = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setConcernedMinistryR((user.ministry_list))
      setMasterData((user.ministry_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }
}

{/*------------------------------------renderItem for ResolutionMover-ConcernedMinistryR ----------------------------------------- */}
const [ConcernedMinistryRCount,setConcernedMinistryRCount]=useState('')
const RenderItem2=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} 
onPress={()=>{
setSearchConcernedMinistryR(item.name)
setConcernedMinistryRCount(item.id)
setHide1(true)

}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
  )
}


{/*------------------------------------ItemSeparator for ResolutionMover-ConcernedMinistryR----------------------------------------- */}

const ItemSeparator2=({item})=>{
   return(
       <View style={{borderWidth:0.75,width:"100%",height:0.1,borderColor:"#fff",}}>
       </View>
   )
}

{/*------------------------------------SearchFilter for ResolutionMover-ConcernedMinistryR----------------------------------------- */}

const SearchFilter2=(text)=>{
if(text){
const newData=masterData.filter((item)=>{
   const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
   const textData=text.toUpperCase();
   return itemData.indexOf(textData) > -1 ;
});
setConcernedMinistryR(newData);
setSearchConcernedMinistryR(text);
}else{ 
setConcernedMinistryR(masterData);
setSearchConcernedMinistryR(text);
}
}

   {/*---------------------------------------- Drop-Down States----------------------------------------- */}
   const [open1, setOpen1] = useState(false);
   const [value1, setValue1] = useState(null);
   const [items1, setItems1] = useState([
     {label: 'Not Taken Up', value: 'Not Taken Up'},
     {label: 'Adopted', value: 'Adopted'},
     {label: 'Deferred', value: 'Deferred'},
     {label: 'Rejected', value: 'Rejected'},
     {label: 'Referred to Committee', value: 'Referred to Committee'},
     {label: 'Withdrawn', value: 'Withdrawn'},
     {label: 'Taken up but no concluded', value: 'Taken up but no concluded'},
   ]);
 
   const [open2, setOpen2] = useState(false);
   const [value2, setValue2] = useState(null);
   const [items2, setItems2] = useState([
     {label: 'Regular', value: 'Regular'},
     {label: 'Supplementary', value: 'Supplementary'},
   ]);
 

//////////////////////////////////////////////////------DropDown & Search list Display Values States(Started)---------/////////////////////////////////////////////////////


//---------------------- FlatList States  & method for store Mover name---------- //
const [DATA,SetDATA]=useState([])
const [count,setCount]=useState(1);
const [MoverName,setMoverName]=useState(DATA);


//-----------------------method for store Mover name------------------------------- // 
const HandleSubmit=()=>{
  const newArray=[...DATA,{id:count,name:SearchResolutionMover,party:ResolutionPartyName}]
  SetDATA(newArray)
  setCount(count+1)
  setMoverName(newArray)
}  


//---------------------- FlatList States  & method for store Agenda Type---------- //
  const [DATA1,SetDATA1]=useState([])
  const [count1,setCount1]=useState(1);
  
//-----------------------method for store Agenda Type------------------------------- // 
  const HandleSubmit1=()=>{
    const newArray=[...DATA1,{id:count1,agenda:text1.value}]
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


        //---------------------- FlatList States  & method for store ConcernedMinistryName---------- //
        const [DATA4,SetDATA4]=useState([])
        const [count4,setCount4]=useState(1);
        const [ConcernedMinistryName,setConcernedMinistryName]=useState(DATA);


//-----------------------method for store ConcernedMinistryNamee------------------------------- // 
const HandleSubmit4=()=>{
  const newArray=[...DATA4,{id:count4,name:SearchConcernedMinistryR}]
  SetDATA4(newArray)
  setCount4(count4+1)
  setConcernedMinistryName(newArray)
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
for(let i = 0 ; i < ResolutionScreenCount; i++ ){
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
   placeholderTextColor="#fff"
   placeholder={'Name of Mover-'+(i+1)}
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
  data={ResolutionMover}
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
        SearchResolutionMover,
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

{/*-------------//////////----------------------Agenda Type------------------//////////----------------------- */}

<Text style={styles.QuestionsText}>Agenda Type</Text>
<DropDownPicker style={styles.DropDownPicker} 
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
                  arrowIconStyle={{width: 15,height: 15}}
                  onSelectItem={(e) =>{
                    setText1(e)
                    setShowAgendaBTn(true)
                    
                  }}
                  placeholder={
                    <FlatList
                    data={DATA1}
                    renderItem={({item})=>{ if(item.id==i+1){
                        return(
                            <View>
                                <Text style={styles.dropDownText}>{item.agenda}</Text>
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

{/*------------------------Add Agenda------------------------*/}

{
    ShowAgendaBTn ?  <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit1()
      setShowAgendaBTn(false)
      }}>
      <Text style={styles.AddBtnText}>Add Agenda</Text>
      </TouchableOpacity>
     :null
  }

 {/*---------------------------------------- Concerned Ministry(ies)----------------------------------------- */}
<Text style={styles.QuestionsText}>Concerned Ministry(ies)</Text>
{
   Hide3 ? null :<TextInput
   placeholderTextColor="#fff"
   placeholder={'Name of Concerned Ministry-'+(i+1)}
   onChangeText={(text)=>{
     SearchFilter2(text)
     setHide1(false)
     setShowConcernedBTn(true)
    }}
   style={styles.TextInput}
 /> 

 }


{/*-----FlatList to Search for Concerned Ministry(ies)---------- */} 

{
  Hide1 ? null :<View style={styles.FlatListView}>
  <FlatList style={styles.FlatList}
  nestedScrollEnabled={true}
  data={ConcernedMinistryR}
  renderItem={RenderItem2}
  ItemSeparatorComponent={ItemSeparator2}
 />
 </View>
}



{/*-----------FlatList to display name for Concerned Ministry(ies)---------- */} 
<FlatList
data={ConcernedMinistryName}
renderItem={({item})=>{ if(item.id==i+1){
                        return(
                            <View style={styles.MoverTextInput}>
                                <Text style={styles.modalTextMover}>{item.name}</Text>
                            </View>
                        )}}}/>

{/*--------------///////////------------------------Add Concerned Ministry(ies) Btn----------------//////////////--------------------*/}

      {
      ShowConcernedBTn ?   <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit4()
      setShowConcernedBTn(false)
      setHide3(true)
      }}>
      <Text style={styles.AddBtnText}>Add Concerned Ministry</Text>
      </TouchableOpacity>
     :null
  }   

<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:5,marginTop:10}}/>
{/*---------------------------------------- Details----------------------------------------- */}
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
      setHide2(false)
      setHide3(false)
      }}>
      <Text style={styles.AddBtnText}>Add Status Type</Text>
      </TouchableOpacity>
     :null
  }

{/*---------------------------------------- RadioButtonRN----------------------------------------- */}

<RadioButtonRN
  data={ResolutionRadioBTn}
  box={false}
  circleSize={17}
  textStyle={styles.RNLabelText}
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
                        HandleSubmitResolution()
                        setResolutionDebateArray([])
                        setDebateHeld("No")
                        setMemberName([])
                        setSearchResolutionMember('')
                        setSearchResolutionMover('')
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


{/*------------------------------------ ResolutionMover Modal code start----------------------------------------- */}

     const ResolutionScreenModal=()=>{
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

<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2} onChangeText={(value)=> setResolutionDebateCount(value)} />

{/*----------------------------------------DebateArray Calling----------------------------------------- */}
<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
{DebateArray}

<View style={{marginBottom:100,marginTop:10}}/>
</ScrollView>
                                   
    {/*------------------------------------Modal Handle Modal btn----------------------------------------- */}
        <View style={{width:"100%",height:40}} />
         <View style={styles.modalhandlebtnView} >
         <TouchableOpacity onPress={()=>{
             setModalVisible(!modalVisible)
             setResolutionDebateCount()
             setSearchResolutionMember()
             SetDebateDATA0([])
             setDebatecount0(1)
             }}>
             <Text style={styles.modalText}>Close</Text>
        </TouchableOpacity>

         </View>
         
                    </View>
                    </View>
        </Modal>
             
      )
    }
        
    
     {/*------------------------------------Adjournment Modal Code (End)----------------------------------------- */}

const Check = ResolutionScreenCount.length==0 || text1.length==0 || SearchConcernedMinistryR.length==0 || text3.length==0 || text4.length==0
{/*---------------------------------------- Main Code----------------------------------------- */}

  return (
    
        <View style={styles.container}>

<Text style={styles.Text}>How many resolutions were included on the agenda/raised?</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2}  onChangeText={(value)=>setResolutionScreenCount(value)} />
</View>

{
  ResolutionScreenCount.length==0 ?  null :<View style={styles.paddingView}>
  <Text style={styles.HeadingText}>Resolution</Text>
  </View> 
}

{/*----------------------------------------Array Calling----------------------------------------- */}
<ScrollView nestedScrollEnabled={true} >
  {Array}
<View style={{marginBottom:100,marginTop:10}}/>
{ResolutionScreenModal()}
</ScrollView>

      <TouchableOpacity style={styles.modalBtn}
        onPress={removeData}>
        <Text style={styles.modalBtnText}>Clear</Text>
      </TouchableOpacity>

<TouchableOpacity 
onPress={()=>{
  if(ResolutionScreenCount=='0'){
    StoreData()
    navigation.navigate('30 of 37')
  }
  else if(Check)
  {
  Alert.alert('Please fill detail in all fields')
  }else{
    StoreData()
    navigation.navigate('30 of 37')
  }
}} 
style={styles.forwardBtn}>

<Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('28 of 37')} style={styles.backBtn}>
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
},
Text1:{
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