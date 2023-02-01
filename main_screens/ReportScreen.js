import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert,LogBox,ScrollView,Modal,FlatList} from 'react-native';
import React,{useState,useEffect,} from 'react';
const HEIGHT=Dimensions.get("window").height;
import RadioButtonRN from 'radio-buttons-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReportScreen({navigation}) {
  const [modalVisibleMov, setmodalVisibleMov] = useState(false);
 
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////-------------------------------DebateModal Code Start----------------------------///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////// =========States for store ReportDebateArray===========/////////
const [DebateDATA0,SetDebateDATA0]=useState([])
const [ReportDebateArray,setReportDebateArray]=useState(DebateDATA0);
const [Debatecount0,setDebatecount0]=useState(1);
const data = [{label: 'Add Details',}];

////////////========method for store ReportDebateArray========///////////////

const HandleSubmitDebate=()=>{
  const newArray=[...DebateDATA0,
    {
    ReportDebateCount:Debatecount0,
    memberName:SearchReportMember,
    member_id:MemberID,
    ReportDescription:ReportDescription,
    ReportDebateHour:ReportDebateHour,
    ReportDebateMins:ReportDebateMins,
  }]
  setReportDebateArray(newArray)
  SetDebateDATA0(newArray)
  setDebatecount0(Debatecount0+1)
}


{/*----------------------------------------States----------------------------------------- */}
 const [ReportDebateCount,setReportDebateCount]=useState('');
 const [ReportDebateMember,setReportDebateMember]=useState("");
 const [ReportDescription,setReportDescription]=useState("");
 const [ReportDebateHour,setReportDebateHour]=useState("");
 const [ReportDebateMins,setReportDebateMins]=useState("");

 const [masterDataDebate,setmasterDataDebate]=useState([]);
 const [SearchReportMember,setSearchReportMember]=useState([]);
 const [DebateHide,setDebateHide]=useState(true);
 const [DebateHide2,setDebateHide2]=useState(false);

 {/*------------------------------------ShowMemberBTn States----------------------------------------- */}
 const [ShowMemberBTn, setShowMemberBTn] = useState(false);

//------------------------getName from Api-------------------------//


const getName = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setReportDebateMember((user.member_list))
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
  setSearchReportMember(item.name)
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
 setReportDebateMember(newData);
 setSearchReportMember(text);
}else{ 
 setReportDebateMember(masterDataDebate);
 setSearchReportMember(text);
}
 }


//---------------------- FlatList States  & method for store Member name---------- //
const [DebateDATA2,SetDebateDATA2]=useState([])
const [countDebate,setcountDebate]=useState(1);
const [MemberName,setMemberName]=useState(DebateDATA2);


//-----------------------method for store Member name------------------------------- // 
const HandleSubmitDebate2=()=>{
const newArray=[...DebateDATA2,{id:countDebate,name:SearchReportMember,party:DebateParty,member_id:MemberID}]
SetDebateDATA2(newArray)
setcountDebate(countDebate+1)
setMemberName(newArray)
}  

{/*---------------------------------------- DebateArray----------------------------------------- */}
var DebateArray=[];
for(let i = 0 ; i < ReportDebateCount ; i++ ){
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
 data={ReportDebateMember}
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
onChangeText={(e) => setReportDescription(e)}
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
           onChangeText={(value)=>setReportDebateHour(value)} />
      
          <TextInput  
           style={styles.TextInputs}
           placeholderTextColor="#fff"
           placeholder="M"
           keyboardType="numeric"
           onBlur={()=>setDebateHide2(false)}
           onChangeText={(value)=>setReportDebateMins(value)} />
</View>

<RadioButtonRN
data={[{label: 'Add debate-'+(i+1)+' details'}]}
textStyle={styles.RNLabelText}
box={false}
circleSize={14}
selectedBtn={(e)=>{
  HandleSubmitDebate(e)
  setDebateHide2(false)
  setSearchReportMember('')
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


   {/*------------------------------------222222222222222222222222222222222222----------------------------------------- */}

{/*------------------------------------ConcernedMinistryB reportScreen states----------------------------------------- */}

const[ConcernedMinistryB,setConcernedMinistryB]=useState([]);
const [SearchConcernedMinistryB,setSearchConcernedMinistryB]=useState([]);
const [MinstryMasterData,setMinstryMasterData]=useState([]);
const [Hide1,setHide1]=useState(true);
const [Hide3,setHide3]=useState(false);



{/*------------------------------------getConcernedMinistryB method----------------------------------------- */}

const getConcernedMinistryB = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setConcernedMinistryB(user.ministry_list)
      setMinstryMasterData(user.ministry_list)
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }
}

{/*------------------------------------renderItem for reportScreen-ConcernedMinistryB ----------------------------------------- */}
const [MinistryArray,setMinstryArray]=useState([]);
const [ConcernedMinistryBCount,setConcernedMinistryBCount]=useState('')
const RenderItem2=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} 
onPress={()=>{
setSearchConcernedMinistryB(item.name)
setConcernedMinistryBCount(item.id)
setHide1(true)

}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
  )
}


{/*------------------------------------ItemSeparator for  reportScreen-ConcernedMinistryB----------------------------------------- */}

const ItemSeparator2=({item})=>{
   return(
       <View style={{borderWidth:0.75,width:"100%",height:0.1,borderColor:"#fff",}}>
       </View>
   )
}

{/*------------------------------------SearchFilter for  reportScreen-ConcernedMinistryB----------------------------------------- */}

const SearchFilter2=(text)=>{
if(text){
const newData=MinstryMasterData.filter((item)=>{
   const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
   const textData=text.toUpperCase();
   return itemData.indexOf(textData) > -1 ;
});
setConcernedMinistryB(newData);
setSearchConcernedMinistryB(text);
}else{ 
setConcernedMinistryB(MinstryMasterData);
setSearchConcernedMinistryB(text);
}
}


{/*------------------------------------333333333333333333333333333333333333----------------------------------------- */}

{/*------------------------------------ConcernedCommittee reportScreen states----------------------------------------- */}

const[ConcernedCommittee,setConcernedCommittee]=useState([]);
const[MasterDataCommittee,setMasterDataCommittee]=useState([]);
const [SearchConcernedCommittee,setSearchConcernedCommittee]=useState([]);
const [Hide4,setHide4]=useState(true);
const [Hide5,setHide5]=useState(false);

{/*------------------------------------getConcernedCommittee method----------------------------------------- */}

const getConcernedCommittee = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setConcernedCommittee(user.ministry_list)
      setMasterDataCommittee(user.ministry_list)
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }
}


{/*------------------------------------renderItem for reportScreen-ConcernedCommittee ----------------------------------------- */}
const [ConcernedCommitteeCount,setConcernedCommitteeCount]=useState('')
const [CommitteeArray,setCommitteeArray]=useState([])
const RenderItem3=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} 
onPress={()=>{
setSearchConcernedCommittee(item.name)
setConcernedCommitteeCount(item.id)
setHide4(true)

}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
  )
}


{/*------------------------------------ItemSeparator for  reportScreen-ConcernedCommittee----------------------------------------- */}

const ItemSeparator3=({item})=>{
   return(
       <View style={{borderWidth:0.75,width:"100%",height:0.1,borderColor:"#fff",}}>
       </View>
   )
}

{/*------------------------------------SearchFilter for  reportScreen-ConcernedCommittee----------------------------------------- */}

const SearchFilter3=(text)=>{
if(text){
const newData=MasterDataCommittee.filter((item)=>{
   const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
   const textData=text.toUpperCase();
   return itemData.indexOf(textData) > -1 ;
});
setConcernedCommittee(newData);
setSearchConcernedCommittee(text);
}else{ 
setConcernedCommittee(MasterDataCommittee);
setSearchConcernedCommittee(text);
}
}

//-------------- FlatList States  & method for store ConcernedMinistryName---------- //
const [MinistryDATA2,SetMinistryDATA2]=useState([])
const [Ministrycount2,setMinistrycount2]=useState(1);
const [ConcernedMinistryName,setConcernedMinistryName]=useState(DATA);


//-----------------------method for store ConcernedMinistryNamee------------------------------- // 
const HandleSubmitMinistry=()=>{
const newArray=[...MinistryDATA2,{id:Ministrycount2,name:SearchConcernedMinistryB}]
SetDATA2(newArray)
setMinistrycount2(Ministrycount2+1)
setConcernedMinistryName(newArray)
}  


//-------------- FlatList States  & method for store ConcernedCommiteeName---------- //
const [DATA5,SetDATA5]=useState([])
const [count5,setCount5]=useState(1);
const [ConcernedCommiteeName,setConcernedCommiteeName]=useState(DATA);


//-----------------------method for store ConcernedCommiteeNamee------------------------------- // 
const HandleSubmit5=()=>{
const newArray=[...DATA5,{id:count5,name:SearchConcernedCommittee}]
SetDATA5(newArray)
setCount5(count5+1)
setConcernedCommiteeName(newArray)
}  

  
  //////// =========States for store ReportScreenArray===========/////////
  const [DATAA,SetDATAA]=useState([])
  const [ReportScreenArray,setReportScreenArray]=useState(DATAA);
  const [countReportScreen,setCountReportScreen]=useState(1);
  
////////////========method for store ReportScreenArray========///////////////
  
  const HandleSubmitReport=()=>{
    const newArray=[...DATAA,
      {
        reportCount:countReportScreen,
        mover_Array:ReportMoverArray,
        agendaType:text1.value,
        motionType:text3.value,
        reportType:text4.value,
        concernedMinistryName:MinistryArray,
        concernedCommittee:CommitteeArray,
        otherReport:OtherReport,
        reportname:text5,
        status:text6.value,
        DebateHeld:DebateHeld,
        ReportDebateArray:ReportDebateArray
    }]
    setReportScreenArray(newArray)
    SetDATAA(newArray)
    setCountReportScreen(countReportScreen+1)
  }

  {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

  const StoreData=async()=>{
    try {
      var user={
        Number_of_Reports:ReportCount,
        Reports:[...ReportScreenArray]
      }
     await AsyncStorage.setItem('Screen-32',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }


 {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
  const removeData=async()=>{
    try {
     await AsyncStorage.removeItem('Screen-32')
     navigation.replace('32 of 37')
     console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// ReportScreen Code //////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  //Mover Name Array//

  const [MoverDATA0,SetMoverDATA0]=useState([])
  const [ReportMoverArray,setReportMoverArray]=useState(MoverDATA0);
  const [Movercount0,setMoverCount0]=useState(1);

  const HandleSubmitMover=()=>{
    const newArray=[...MoverDATA0,
      {
      ReportMoverCount:Movercount0,
      moverName:{assembly:ReportMoverAssembly,id:ReportMoverCount,name:SearchIncludeReport,party:ReportPartyName},
    }]
    setReportMoverArray(newArray)
    SetMoverDATA0(newArray)
    setMoverCount0(Movercount0+1)
  }

  {/*------------------------------------ShowConcernedBTn States----------------------------------------- */}
  const [ShowConcernedBTn, setShowConcernedBTn] = useState(false);
  {/*----------------------------------------States----------------------------------------- */}
    {/*------------------------------------ShowCommitteeBTn States----------------------------------------- */}
    const [ShowCommitteeBTn, setShowCommitteeBTn] = useState(false);
  
  const[ReportCount,setReportCount]=useState('');
  
{/*--------------------(state-1)----------------SearchIncludeReport State for Mover(s) Name----------------------------------------- */}
  const [text1,setText1]=useState("");
  const [text3,setText3]=useState("");
  const [text4,setText4]=useState("");
  const [text5,setText5]=useState("");
  const [text6,setText6]=useState("");
  const [OtherReport,setOtherReport]=useState('')

  {/*------------------------------------ShowMoverBTn States----------------------------------------- */}
  const [ShowMoverBTn, setShowMoverBTn] = useState(false);
  {/*------------------------------------ShowAgendaBTn States----------------------------------------- */}
  const [ShowAgendaBTn, setShowAgendaBTn] = useState(false);
  {/*------------------------------------ShowMotionBTn States----------------------------------------- */}
  const [ShowMotionBTn, setShowMotionBTn] = useState(false);
  {/*------------------------------------ShowReportBTn States----------------------------------------- */}
  const [ShowReportBTn, setShowReportBTn] = useState(false);
  {/*------------------------------------ShowStatusBTn States----------------------------------------- */}
  const [ShowStatusBTn, setShowStatusBTn] = useState(false);

  const ReportRadioBtn = [{label: 'Check the box if debate was held'}];
  const [DebateHeld,setDebateHeld]=useState('No')

  {/*------------------------------------Modal States----------------------------------------- */}
  const [modalVisible, setModalVisible] = useState(false);

{/*------------------------------------Name of ReportScreen-Mover states----------------------------------------- */}

const[IncludeReport,setIncludeReport]=useState([]);
const [masterData,setMasterData]=useState([]);
const [SearchIncludeReport,setSearchIncludeReport]=useState([]);
const [Hide,setHide]=useState(true);
const [Hide2,setHide2]=useState(false);

 {/*------------------------------------useEffect ReportScreen----------------------------------------- */}

useEffect(()=>{
  getIncludeReport();
  getName();
  getConcernedMinistryB();
  getConcernedCommittee();
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
},[])

{/*------------------------------------getIncludeReport method----------------------------------------- */}

const getIncludeReport = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setIncludeReport((user.member_list))
      setMasterData((user.member_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }
}


{/*------------------------------------renderItem for ReportScreen-Mover ----------------------------------------- */}
const [ReportMoverCount,setReportMoverCount]=useState('');
const [ReportMoverAssembly,setReportMoverAssembly]=useState('');
const [ReportPartyName,setReportPartyName]=useState('')

const RenderItem1=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} 
onPress={()=>{
setSearchIncludeReport(item.name)
setReportMoverCount(item.id)
setReportMoverAssembly(item.assembly)
setReportPartyName(item.party)
setHide(true)

}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}({item.party})</Text>
      </TouchableOpacity>
      </View>
  )
}


{/*------------------------------------ItemSeparator for ReportScreen-Mover----------------------------------------- */}

const ItemSeparator1=({item})=>{
   return(
       <View style={{borderWidth:0.75,width:"100%",height:0.1,borderColor:"#fff",}}>
       </View>
   )
}

{/*------------------------------------SearchFilter for ReportScreen-Mover states----------------------------------------- */}

const SearchFilter1=(text)=>{
if(text){
const newData=masterData.filter((item)=>{
   const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
   const textData=text.toUpperCase();
   return itemData.indexOf(textData) > -1 ;
});
setIncludeReport(newData);
setSearchIncludeReport(text);
}else{ 
setIncludeReport(masterData);
setSearchIncludeReport(text);
}
}




 {/*---------------------------------------- Status Drop-Down States----------------------------------------- */}
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Introduced', value: 'Introduced'},
    {label: 'Passed', value: 'Passed'},
    {label: 'Laid', value: 'Laid'},
    {label: 'Withdrawn', value: 'Withdrawn'},
    {label: 'Referred to Committee', value: 'Referred to Committee'},
    {label: 'Withdrawn from the Committee', value: 'Withdrawn from the Committee'},
    {label: 'Not Taken Up', value: 'Not Taken Up'},
    {label: 'Taken up but no concluded', value: 'Taken up but no concluded'},
    {label: 'Rejected', value: 'Rejected'},
    {label: 'Presented', value: 'Presented'},
  ]);

  {/*---------------------------------------- Agenda Drop-Down States----------------------------------------- */}

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Regular', value: 'Regular'},
    {label: 'Supplementary', value: 'Supplementary'},
    
  ]);

   {/*---------------------------------------- Type of Motion Drop-Down States----------------------------------------- */}

   const [open3, setOpen3] = useState(false);
   const [value3, setValue3] = useState(null);
   const [items3, setItems3] = useState([
     {label: 'Motion for Extension in Time', value: 'Motion for Extension in Time'},
     {label: 'Motion for Condonement of Delay', value: 'Motion for Condonement of Delay'},
     {label: 'Motion for Presentation of Report', value: 'Motion for Presentation of Report'},
     {label: 'Motion for Presentation after Condonement', value: 'Motion for Presentation after Condonement'},
     {label: 'Motion for Presentation after Rejection of Condonement', value: 'Motion for Presentation after Rejection of Condonement'},
     {label: 'Motion for Discussion on Report', value: 'Motion for Discussion on Report'},
     {label: 'Motion for Adoption of Report', value: 'Motion for Adoption of Report'},
     
   ]);
{/*----------------------------------------Type of Report Drop-Down States----------------------------------------- */}
   const [open4, setOpen4] = useState(false);
   const [value4, setValue4] = useState(null);
   const [items4, setItems4] = useState([
     {label: 'Statutory Report', value: 'Statutory Report'},
     {label: 'Committee Report', value: 'Committee Report'},
     {label: 'Other Report', value: 'Other Report'},
]);


//////////////////////////////////////////////////------DropDown & Search list Display Values States(Started)---------/////////////////////////////////////////////////////

//---------------------- FlatList States  & method for store Mover name---------- //
const [DATA,SetDATA]=useState([])
const [count,setCount]=useState(1);
const [MoverName,setMoverName]=useState(DATA);


//-----------------------method for store Mover name------------------------------- // 
const HandleSubmit=()=>{
  const newArray=[...DATA,{id:count,name:SearchIncludeReport,party:ReportPartyName}]
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

    //---------------------- FlatList States  & method for store Motion Type---------- //
    const [DATA2,SetDATA2]=useState([])
    const [count2,setCount2]=useState(1);
    
  //-----------------------method for store Motion Type------------------------------- // 
    const HandleSubmit2=()=>{
      const newArray=[...DATA2,{id:count2,motionType:text3.value}]
      SetDATA2(newArray)
      setCount2(count2+1)
    }

       //---------------------- FlatList States  & method for store Report Type---------- //
       const [DATA3,SetDATA3]=useState([])
       const [count3,setCount3]=useState(1);
       
     //-----------------------method for store Report Type------------------------------- // 
       const HandleSubmit3=()=>{
         const newArray=[...DATA3,{id:count3,reportType:text4.value}]
         SetDATA3(newArray)
         setCount3(count3+1)
       }

        //---------------------- FlatList States  & method for store Status Type---------- //
        const [DATA4,SetDATA4]=useState([])
        const [count4,setCount4]=useState(1);
        
      //-----------------------method for store Status Type------------------------------- // 
        const HandleSubmit4=()=>{
          const newArray=[...DATA4,{id:count4,statusType:text6.value}]
          SetDATA4(newArray)
          setCount4(count4+1)
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
for(let i = 0 ; i < ReportCount ; i++ ){
 Array.push(
  <View key={i}>

<View style={styles.paddingView}>
            <View style={styles.smallTextView}>
                <Text style={styles.smallText}>{i+1}</Text>
            </View>
 {/*--------------------------///////-------------- Name of Mover(s)------------------//////////----------------------- */}
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

 


{
  Hide ? null :<View style={styles.FlatListView}>
  <FlatList style={styles.FlatList}
  nestedScrollEnabled={true}
  data={IncludeReport}
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
      HandleSubmitMover()
      setShowMoverBTn(false)
      setHide2(true)
      Alert.alert(
        "Mover Added!",
       SearchIncludeReport,
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
                  zIndex={3000}
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
 

{/*-------------//////---------------------------Type of Motion--------------//////////--------------------------- */}

<Text style={styles.QuestionsText}>Type of Motion</Text>
<DropDownPicker style={styles.DropDownPicker} 
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
                  arrowIconStyle={{width: 15,height: 15}}
                  onSelectItem={(e) =>{
                    setText3(e)
                    setShowMotionBTn(true)
                  }}
                  placeholder={
                    <FlatList
                    data={DATA2}
                    renderItem={({item})=>{ if(item.id==i+1){
                        return(
                            <View>
                                <Text style={styles.dropDownText}>{item.motionType}</Text>
                            </View>
                        )}}}/>
                } 
                  color="#fff"
                  placeholderStyle={styles.placeholderStyle}
                  open={open3}
                  setOpen={setOpen3}
                  items={items3}
                  setItems={setItems3}
                  zIndex={2000}
                />
  {/*------------------------ Add Motion Type------------------------*/}

{
    ShowMotionBTn ?  <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit2()
      setShowMotionBTn(false)
      }}>
      <Text style={styles.AddBtnText}>Add Motion Type</Text>
      </TouchableOpacity>
     :null
  }
 
{/*---------------////////////////-------------------Type of Report------------------///////////////////----------------------- */}

<Text style={styles.QuestionsText}>Type of Report</Text>
<DropDownPicker style={styles.DropDownPicker} 
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
                  arrowIconStyle={{width: 15,height: 15}}
                  onSelectItem={(e) =>{
                    if(e.label=='Other Report')
                    {
                      setText4(e)
                      setShowReportBTn(true)
                      Alert.alert('Enter description & Click Add Report Type')
                    }
                    else{
                      setText4(e)
                      setShowReportBTn(true)
                     
                    }
                  }}
                  placeholder={
                    <FlatList
                    data={DATA3}
                    renderItem={({item})=>{ if(item.id==i+1){
                        return(
                            <View>
                                <Text style={styles.dropDownText}>{item.reportType}</Text>
                            </View>
                        )}}}/>
                } 
                  color="#fff"
                  placeholderStyle={styles.placeholderStyle}
                  open={open4}
                  setOpen={setOpen4}
                  items={items4}
                  setItems={setItems4}
                  zIndex={1000}
                />

{
  text4.value==='Other Report' ?  <TextInput 
  placeholderTextColor="#fff"
  placeholder='Description'
  onChangeText={(text)=>setOtherReport(text)}
  style={styles.TextInput}
/> : null
}

  {/*------------------------ Add Report Type------------------------*/}

  {
    ShowReportBTn ?  <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit3()
      setShowReportBTn(false)
      }}>
      <Text style={styles.AddBtnText}>Add Report Type</Text>
      </TouchableOpacity>
     :null
  }

  {
    text4.value==='Statutory Report' ?  <View>
       {/*-----///////////////////---------- Concerned Ministry(ies)---------///////////////////////////////---- */}
 <Text style={styles.QuestionsText}>Concerned Ministry(ies)</Text>
<TextInput
   placeholderTextColor="#fff"
    value={String(SearchConcernedMinistryB)}
    placeholder={'Name of Concerned Ministry'}
    onChangeText={(text)=>{
     SearchFilter2(text)
     setHide1(false)
     setShowConcernedBTn(true)
    }}
   style={styles.TextInput}
 /> 

{/*-----FlatList to Search for Concerned Ministry(ies)---------- */} 

{
  Hide1 ? null :<View style={styles.FlatListView}>
  <FlatList style={styles.FlatList}
  nestedScrollEnabled={true}
  data={ConcernedMinistryB}
  renderItem={RenderItem2}
  ItemSeparatorComponent={ItemSeparator2}
 />
 </View>
}

{/*--------------///////////------------------------Add Concerned Ministry(ies) Btn----------------//////////////--------------------*/}

{
      ShowConcernedBTn ?   <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
        setMinstryArray({name:SearchConcernedMinistryB,id:ConcernedMinistryBCount})
        setShowConcernedBTn(false)
      }}>
      <Text style={styles.AddBtnText}>Add Concerned Ministry</Text>
      </TouchableOpacity>
     :null
  }   

{/*--------------///////////------------------------Add Concerned Committee Btn----------------//////////////--------------------*/}

<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:5,marginTop:10}}/>
    </View> :null
  }

  {
    text4.value==='Committee Report' ? <View>
{/*---------------------------------------- Name of Concerned Committee----------------------------------------- */}
<Text style={styles.QuestionsText}>Concerned Committee</Text>
 <TextInput
   placeholderTextColor="#fff"
   value={String(SearchConcernedCommittee)}
   placeholder={'Name of Concerned Committee'}
   onChangeText={(text)=>{
     SearchFilter3(text)
     setHide4(false)
     setShowCommitteeBTn(true)
    }}
   style={styles.TextInput}
 /> 



{/*-----FlatList to Search for name of Concerned Committee---------- */} 


{
  Hide4 ? null :<View style={styles.FlatListView}>
  <FlatList style={styles.FlatList}
  nestedScrollEnabled={true}
  data={ConcernedCommittee}
  renderItem={RenderItem3}
  ItemSeparatorComponent={ItemSeparator3}
 />
 </View>
}

    </View>:null
  }

{
      ShowCommitteeBTn ?   <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
       setCommitteeArray({name:SearchConcernedCommittee,id:ConcernedCommitteeCount})
       setShowCommitteeBTn(false)
      }}>
      <Text style={styles.AddBtnText}>Add Concerned Committee</Text>
      </TouchableOpacity>
     :null
}   
   

{/*---------------------------------------- Report name----------------------------------------- */}
<Text style={styles.QuestionsText}>Report name</Text>
<TextInput 
 placeholder=''
 onChangeText={(e) => setText5(e)}
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
                    setText6(e)
                    setShowStatusBTn(true)
                
                  }}
                  placeholder={
                    <FlatList
                    data={DATA4}
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
                  zIndex={500}
                />

 {/*------------------------ Add Status Type------------------------*/}

 {
    ShowStatusBTn ?  <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit4()
      setShowStatusBTn(false)
      setHide2(false)
      }}>
      <Text style={styles.AddBtnText}>Add Status Type</Text>
      </TouchableOpacity>
     :null
  }

{/*---------------------------------------- RadioButtonRN----------------------------------------- */}

<RadioButtonRN
  data={ReportRadioBtn}
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

<TouchableOpacity style={styles.AddBTn1}  onPress={()=>{ 
                      if(Check){
                      Alert.alert('Please fill detail in all fields')
                      }
                      else{
                        HandleSubmitReport()
                        setReportDebateArray([])
                        setDebateHeld("No")
                        setMemberName([])
                        setSearchReportMember('')
                        setSearchIncludeReport('')
                        setMoverName([])
                        SetMoverDATA0([])
                        SetDATA('')
                        setCount(1)
                        setMoverCount0(1)
                        setMinstryArray([])
                        setCommitteeArray([])
                        setSearchConcernedMinistryB('')
                        setSearchConcernedCommittee('')
                        setText4('')
                        Alert.alert('Details added for form-'+ (i+1))
                      }
                        }}>
      <Text style={styles.AddBtnText}>Save Form-{i+1} Details</Text>
      </TouchableOpacity>

     

</View>
 </View>

  )
} 


{/*----------------------------------------ReportScreenModal code start----------------------------------------- */}

     const ReportScreenModal=()=>{
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

<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2} onChangeText={(value)=> setReportDebateCount(value)} />

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
             setReportDebateCount()
             setSearchReportMember()
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
        
    
     {/*------------------------------------ReportScreenModal Modal Code (End)----------------------------------------- */}

     const Check= ReportCount.length==0 || text1.length==0 || text3.length==0 || text5.length==0 || text6.length==0

{/*---------------------------------------- Main Code----------------------------------------- */}

  return (
    
        <View style={styles.container}>

<Text style={styles.Text}>How many reports were included on the agenda/presented?</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2} onChangeText={(value)=>setReportCount(value)} />
</View>

{
  ReportCount.length==0 ?  null :<View style={styles.paddingView}>
  <Text style={styles.HeadingText}>Reports/Papers </Text>
  </View> 
}

{/*----------------------------------------Array Calling----------------------------------------- */}
<ScrollView nestedScrollEnabled={true} >
  {Array}
<View style={{marginBottom:100,marginTop:10}}/>
{ReportScreenModal()}
</ScrollView>


      <TouchableOpacity style={styles.modalBtn}
        onPress={removeData}>
        <Text style={styles.modalBtnText}>Clear</Text>
      </TouchableOpacity>

<TouchableOpacity 
onPress={()=>{
  if(ReportCount=='0'){
    StoreData()
    navigation.navigate('33 of 37')
  }
  else if(Check)
  {
  Alert.alert('Please fill detail in all fields')
  }else{
    StoreData()
    navigation.navigate('33 of 37')
  }
}} 
style={styles.forwardBtn}>

<Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('31 of 37')} style={styles.backBtn}>
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
 
})