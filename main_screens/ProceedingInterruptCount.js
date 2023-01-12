import { StyleSheet, Text, View,TextInput, Dimensions, LogBox,TouchableOpacity,FlatList,Alert,Modal,ScrollView } from 'react-native';
import React,{ useState,useEffect} from 'react';
const HEIGHT=Dimensions.get("window").height;
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProceedingInterruptCount({navigation}) {


//------------------------useEffect to Call retrieveData()-------------------------//

useEffect(()=>{
  retrieveData();
  retrieveData1();
  retrieveData2();
  retrieveData3();
  retrieveData0();
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
},[])


//------------------------getName(QuorumPerson) from Api(stored in AsyncStorage)-------------------------//---------------//

  
  const retrieveData = async () => {

    try {
      await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
        setName((user.member_list))
        setMasterData((user.member_list))
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };

   //------------------------States for QuorumPersonName -------------------------//

   const[Name,setName]=useState([]);
   const [masterData,setMasterData]=useState([]);
   const [SearchQuorumPerson,setSearchQuorumPerson]=useState([]);
   const [TotalCount,setTotalCount]=useState(1);
   const [QuorumPersonCount,setQuorumPersonCount]=useState('');
   const [Assembly,setAssembly]=useState('');
   const [PartyName,setPartyName]=useState('');
   const [QuorumPersonName,setQuorumPersonName]=useState(QuorumPersonName);
   const [Hide, setHide] = useState(false);

       //------------------------renderItemQuorum-------------------------//

       const renderItemQuorum=({item})=>{
        return(
            <View style={styles.RenderItemView}>
  <TouchableOpacity style={styles.RenderItem1} onPress={()=>{
  setQuorumPersonName(item.name)
  setQuorumPersonCount(item.id)
  setAssembly(item.assembly)
  setPartyName(item.party)
  setTotalCount(TotalCount+1)
  setHide(true)
  }}>
  <Text numberOfLines={3} style={styles.FlatListText1}>{item.name} ({item.party})</Text>
            </TouchableOpacity>
            </View>
        )
    }


     //------------------------ItemSeparator for renderItemQuorum-------------------------//
  
    const ItemSeparator=({item})=>{
        return(
            <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:2,marginTop:4}}>
            </View>
        )
    }
  
    //------------------------SearchFilterQuorum-------------------------//
  
  const SearchFilterQuorum=(text)=>{
    if(text){
        const newData=masterData.filter((item)=>{
            const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
            const textData=text.toUpperCase();
            return itemData.indexOf(textData) > -1 ;
        });
        setName(newData);
        setSearchQuorumPerson(text);
    }else{ 
      setName(masterData);
      setSearchQuorumPerson(text);
    }
        }
//------------------------getName(PartyName) from Api(stored in AsyncStorage)-------------------------//---------------//

  
const retrieveData0 = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setPartyNameList((user.party_list))
      setPartyMasterData((user.party_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }
};

//------------------------States for ProtestPartyName -------------------------//

   const [PartyNameList,setPartyNameList]=useState([]);
   const [PartyMasterData,setPartyMasterData]=useState([]);
   const [SearchProtestParty,setSearchProtestParty]=useState([]);
   const [ProtestPartyCount,setProtestPartyCount]=useState('');
   const [PartyAssembly,setPartyAssembly]=useState('');
   const [ProtestPartyName,setProtestPartyName]=useState(ProtestPartyName);
      

//------------------------renderItemPartyList-------------------------//

const renderItemPartyList=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.PartyRenderItem1} onPress={()=>{
setProtestPartyName(item.party)
setProtestPartyCount(item.id)
setPartyAssembly(item.assembly)
Alert.alert('Click Add Party')
}}>
<Text style={styles.FlatListText1}>{item.party}</Text>
      </TouchableOpacity>
      </View>
  )
}

//------------------------renderItemPartyList1-------------------------//

const renderItemPartyList1=({item})=>{
  return(
         <TouchableOpacity>
           <Text numberOfLines={3} style={styles.FlatListText2}>{item.party}</Text>
        </TouchableOpacity>
  )
}

//------------------------SearchFilterPartyList-------------------------//

const SearchFilterParty=(text)=>{
if(text){
  const newData=PartyMasterData.filter((item)=>{
      const itemData=item.party ? item.party.toUpperCase() : "".toUpperCase();
      const textData=text.toUpperCase();
      return itemData.indexOf(textData) > -1 ;
  });
  setPartyNameList(newData);
  setSearchProtestParty(text);
}else{ 
setPartyNameList(PartyMasterData);
setSearchProtestParty(text);
}
  }


  //------------------------getName(ProtestMember) from Api(stored in AsyncStorage)-------------------------//---------------//

  
  const retrieveData3 = async () => {

    try {
      await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
        setMemberNameList((user.member_list))
        setMasterMemberData((user.member_list))
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };

   //------------------------States for ProtestMemberList -------------------------//

   const[MemberNameList,setMemberNameList]=useState([]);
   const [MasterMemberData,setMasterMemberData]=useState([]);
   const [SearchProtestMember,setSearchProtestMember]=useState([]);
   const [MemberListTotal,setMemberListTotal]=useState(1);
   const [ProtestMemberCount,setProtestMemberCount]=useState('');
   const [MemberAssembly,setMemberAssembly]=useState('');
   const [MemberPartyName,setMemberPartyName]=useState('');
   const [ProtestMemberName,setProtestMemberName]=useState(ProtestMemberName);
   const [MemberHide, setMemberHide] = useState(false);

   //------------------------SearchFilterProtestMember-------------------------//
  
   const SearchFilterProtestMember=(text)=>{
    if(text){
        const newData=MasterMemberData.filter((item)=>{
            const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
            const textData=text.toUpperCase();
            return itemData.indexOf(textData) > -1 ;
        });
        setMemberNameList(newData);
        setSearchProtestMember(text);
    }else{ 
      setMemberNameList(MasterMemberData);
      setSearchProtestMember(text);
    }
        }


//------------------------renderItemMember-------------------------//
  const renderItemMember=({item})=>{
    return(
        <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItemMember} onPress={()=>{
setProtestMemberName(item.name)
setProtestMemberCount(item.id)
setMemberAssembly(item.assembly)
setMemberPartyName(item.party)
setMemberListTotal(MemberListTotal+1)
setMemberHide(true)
Alert.alert('Click Add Party')
}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name} ({item.party})</Text>
        </TouchableOpacity>
        </View>
    )
}

//------------------------renderItemMember1-------------------------//
const renderItemMember1=({item})=>{
return(
       <TouchableOpacity>
         <Text numberOfLines={3} style={styles.FlatListText2}>{item.name}</Text>
      </TouchableOpacity>
)
}


//////////////////////////////////////////////////////////////////////////
////////////////////-----------------------------------///////////////////
//////////////////////////////////////////////////////////////////////////

  //  FlatList-2 States  & method for store Party name //

const [PartyDATA1,SetPartyDATA1]=useState([])
const [name1,setName1]=useState(PartyDATA1);

  //  method for store Party name //

const HandleSubmit2=()=>{
  const newArray=[...PartyDATA1,{assembly:PartyAssembly,id:ProtestPartyCount,party:ProtestPartyName}]
  setName1(newArray)
  SetPartyDATA1(newArray)
}

  //  FlatList-2 States  & method for store Member name //

  const [MemberDATA,SetMemberDATA]=useState([])
  const [name2,setName2]=useState(MemberDATA);
  
    //  method for store Member name //
  
  const HandleSubmit3=()=>{
    const newArray=[...MemberDATA,{assembly:MemberAssembly,id:ProtestMemberCount,name:ProtestMemberName,party:MemberPartyName}]
    setName2(newArray)
    SetMemberDATA(newArray)
  }
  

//////////////////////////////////////////////////////////////////////////
////////////////////-----------------------------------///////////////////
//////////////////////////////////////////////////////////////////////////

 //------------------------onRemove for FlatList-2-------------------------//
 const onRemove = () => {
    setName1([])
    SetPartyDATA1([])
    setChairpersonCount(0)
};

       //-------------------retrieveData for PresidingPersonName---------------//

   const retrieveData1 = async () => {
  
    try {
      await AsyncStorage.getItem("Screen-17").then(value=>{if(value!=null){
        var user=JSON.parse(value)
        setPresidingNameList(user.Panel_of_Chairpersons)
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };

       //-------------------retrieveData for PresidingPersonName Quorum---------------//

       const [value1,setValue1]=useState('');
       const [value2,setValue2]=useState('');
       const [ArrayPush,setArrayPush]=useState(PresidingArray);
       const [ArrayPush2,setArrayPush2]=useState(PresidingArray2);


       var PresidingArray=[];
       var PresidingArray2=[];
       const retrieveData2 = async () => {
        try {
          await AsyncStorage.getItem("Screen-18").then(value=>{if(value!=null){
            var user=JSON.parse(value)
            setValue1(user.Attendance_of_the_Chair[0].attendance)  
            console.log(user.Attendance_of_the_Chair[0].attendance)
            console.log(user.Attendance_of_the_Chair[1].attendance)
            setValue2(user.Attendance_of_the_Chair[1].attendance)
            PresidingArray.push(user.Attendance_of_the_Chair[0])
            PresidingArray2.push(user.Attendance_of_the_Chair[1])
            setArrayPush(PresidingArray)
            setArrayPush2(PresidingArray2)
          }})
          
        } catch (e) {
          console.log('Failed to fetch the data from storage!', e)
        }
    
      };

  //------------------------States for PresidingPersonName -------------------------//

    const [PresidingNameList,setPresidingNameList]=useState([]);
    const [PresidingPersonName,setPresidingPersonName]=useState(PresidingPersonName);
    const [PresidingHide, setPresidingHide] = useState(false);
    const [PresidingParty,setPresidingParty]=useState('')


{/*---------------------------------------- BreakStoreData using AsyncStorage----------------------------------------- */}


  const [DATA1,SetDATA1]=useState([])
  const [ProceedingInterruptArray,setProceedingInterruptArray]=useState(DATA1);
  const [count1,setCount1]=useState(1);
  
  const BreakStoreData=()=>{
    const newArray=[...DATA1,
      {
      id:count1,
      interruptType:Interrupt,
      presidingValue:PresidingPersonBreak,
      endTime:time1,
      startTime:time,
    }]
    setProceedingInterruptArray(newArray)
    SetDATA1(newArray)
    setCount1(count1+1)
  }

  const AnyOtherStoreData=()=>{
    const newArray=[...DATA1,
      {
      id:count1,
      interruptType:Interrupt,
      presidingValue:PresidingPersonAnyOther,
      startTime:time2,
      endTime:time3,
      reason:Reason
     }]
    setProceedingInterruptArray(newArray)
    SetDATA1(newArray)
    setCount1(count1+1)
  }
  
  const QuorumStoreData=()=>{
    const newArray=[...DATA1,
      {
      id:count1,
      interruptType:Interrupt,
      member_details:{assembly:Assembly,id:QuorumPersonCount,name:QuorumPersonName,party:PartyName},
      identifiedTime:time4,
      presidingValue:PresidingPersonName,
      Quorum_found_Complete:QuorumRN1,
      quorumMemberCount:QuorumMemberCount,
      Ignored_the_quorum:QuorumRN2,
      Bells_were_Rung:QuorumRN3,
      speakerHour:SpeakerHour,
      speakerMin:SpeakerMin,
      Proceedings_Suspended:QuorumRN4,
      startTime:time5,
      endTime:time6,
      'Sitting_Adjourned/Prorogued':QuorumRN5,
    }]
    setProceedingInterruptArray(newArray)
    SetDATA1(newArray)
    setCount1(count1+1)
  }


  const ProtestStoreData=()=>{
    const newArray=[...DATA1,
      {
      id:count1,
      interruptType:Interrupt,
      protestType:ProtestRNData,
      pSpeakerHour:PSpeakerHour,
      pSpeakerMin:PSpeakerMin,
      presidingvalue:PresidingPersonProtest,
      reason:ProtestReason,
      party_list:[...name1],
      member_list:[...name2]
    }]
    setProceedingInterruptArray(newArray)
    SetDATA1(newArray)
    setCount1(count1+1)
  }
  
    const StoreData=async()=>{
      try {
        var user={
           Times_Proceedings_Suspended:count,
          'Reasons_of_Suspension/Break':[...ProceedingInterruptArray]
        }
       await AsyncStorage.setItem('Screen-20',JSON.stringify(user))
       
      } catch (error) {
        console.log(error)
      }
    }

  {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
  const removeData=async()=>{
    try {
     await AsyncStorage.removeItem('Screen-20')
     navigation.replace('20 of 37')
     console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }
  

   {/*------------------------------------Modal States----------------------------------------- */}
   const [modalVisible1, setModalVisible1] = useState(false);
   const [modalVisible2, setModalVisible2] = useState(false);
   const [modalVisible3, setModalVisible3] = useState(false);
   const [modalVisible4, setModalVisible4] = useState(false);

    {/*------------------------------------States----------------------------------------- */}

  const [count,setCount]=useState('');
  const [Reason,setReason]=useState('');
  const [ProtestReason,setProtestReason]=useState('');
  const data = [{label: 'Quorum',},{ label: 'Protest'},{label:'Break'},{label:'Any Other'}];
  const [Interrupt,setInterrupt]=useState('')
  const ProtestData1 = [{label: 'On-Floor Protest',},{ label: 'Walkout'},{label:'Boycott'}];
  const [ProtestRNData,setProtestRNData]=useState('')

  const QuorumData1 = [{label: 'Quorum found Complete'}];
  const [QuorumRN1,setQuorumRN1]=useState('');
  const QuorumData2 = [{label: 'Ignored the quorum'}];
  const [QuorumRN2,setQuorumRN2]=useState('');
  const QuorumData3 = [{label: 'Bells were Rung'}];
  const [QuorumRN3,setQuorumRN3]=useState('');
  const QuorumData4 = [{label: 'Proceedings Suspended'}];
  const [QuorumRN4,setQuorumRN4]=useState('');
  const QuorumData5 = [{label: 'Sitting Adjourned/Prorogued'}];
  const [QuorumRN5,setQuorumRN5]=useState('');

  const[QuorumMemberCount,setQuorumMemberCount]=useState('');

  const[SpeakerHour,setSpeakerHour]=useState('');
  const[SpeakerMin,setSpeakerMin]=useState('');
  const[PSpeakerHour,setPSpeakerHour]=useState('');
  const[PSpeakerMin,setPSpeakerMin]=useState('');

 {/*----------------------------------////////////Prayer Break Modal Code (Start)////////////----------------------------------------- */}
  
  {/*------------------------------------ Prayer Break Modal Start Time States----------------------------------------- */}

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const[time,setTime]=useState(moment().format('HH:mm'));

    {/*------------------------------------ Prayer Break Modal End Time States----------------------------------------- */}

const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
const [showTime1, setShowTime1] = useState(false);
const[time1,setTime1]=useState(moment().format('HH:mm'));

   {/*------------------------------------ Prayer Break Modal Start Time Methods----------------------------------------- */}

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setShowTime(true)
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTime(moment(date).format('HH:mm'));
    hideDatePicker();
  };


  {/*------------------------------------Prayer Break Modal End Time Methods----------------------------------------- */}

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
    setShowTime1(true)
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    setTime1(moment(date).format('HH:mm'));
    hideDatePicker1();
  };
  

     {/*------------------------------------ PrayerBreak Main code----------------------------------------- */}

const[PresidingPersonBreak,setPresidingPersonBreak]=useState('')
const PrayerBreak=()=>{
  return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible1}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible1(!modalVisible1);
    }}>
<View style={styles.outerDDPickerView}>
            <View style={styles.DropDownPickerView}>
                      <View style={styles.modalHeader}>
                         <Text style={styles.modalText}>Prayer Break</Text>
                     </View>
                     <View style={{width:"100%",height:40}} />
            <Text style={styles.breakModalText}>Who was presiding during break?</Text>

{/*------------------------------------Prayer Break Modal DropDownPicker----------------------------------------- */}

<TouchableOpacity 
          onPress={()=>{
            setPresidingHide(true)
          }}
           activeOpacity={0.5} 
           style={styles.btnPresiding}>
               <Text style={styles.Text1}>{PresidingPersonBreak}</Text>    
           </TouchableOpacity>

                  {/* ----- ChairPerson Name from Screen 17 of 20 --------- */}
 
 {
   PresidingHide ?  
   <View>
     <FlatList
      data={PresidingNameList}
      renderItem={({item})=>{
     return(
       <View>
       <TouchableOpacity style={styles.RenderItemPresiding}
         onPress={()=>{
          setPresidingPersonBreak(item.name)
          setPresidingHide(false)
       }}
       >
         <Text style={styles.FlatListPresidingText1}>{item.name} ({item.party})</Text>
       </TouchableOpacity>
       </View>
     )
   }}
       />



       {
value1==' P' ? 
<FlatList
  data={ArrayPush}
  renderItem={({item})=>{ 
    return(
      <View>
      <TouchableOpacity style={styles.RenderItemPresiding}
        onPress={()=>{
        setPresidingPersonBreak(item.name)
        setPresidingHide(false)
      }}
      >
        <Text style={styles.FlatListPresidingText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  }
   />
:null
       }

{
value2==' P' ? 
<FlatList
  data={ArrayPush2}
  renderItem={({item})=>{ 
    return(
      <View>
      <TouchableOpacity style={styles.RenderItemPresiding}
        onPress={()=>{
        setPresidingPersonBreak(item.name)
        setPresidingHide(false)
      }}
      >
        <Text style={styles.FlatListPresidingText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  }
   />
:null
       }

 
   </View>
    :null
  

 }

{/*------------------------------------Prayer Break Modal Start Time----------------------------------------- */}

<Text style={styles.breakModalText}>Start</Text>
<View>
<TouchableOpacity 
onPress={showDatePicker}
activeOpacity={0.5} 
style={styles.btn}>
    {
        showTime ? <Text style={styles.Text1}>{time}</Text>: null
    }
</TouchableOpacity>
</View>

<DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="time"
      is24Hour={true}
      display='spinner'
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
    {/*------------------------------------Prayer Break Modal End Time----------------------------------------- */}
<Text style={styles.breakModalText}>End</Text>
<View>
<TouchableOpacity 
onPress={showDatePicker1}
activeOpacity={0.5} 
style={styles.btn}>
    {
        showTime1 ? <Text style={styles.Text1}>{time1}</Text>: null
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
{/*------------------------------------Prayer Break Modal Handle Modal btn----------------------------------------- */}

     <View style={styles.modalhandlebtnView} >
     <TouchableOpacity onPress={()=>setModalVisible1(!modalVisible1)}>
         <Text style={styles.modalText}>Cancel</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.modalhandlebtn} onPress={()=>{
      BreakStoreData();
      setModalVisible1(!modalVisible1)}}>
         <Text style={styles.modalText}>OK</Text>
    </TouchableOpacity>
     </View>
     

                </View>
                </View>


    </Modal>
         

  )
}
    

 {/*------------------------------------Prayer Break Modal Code (End)----------------------------------------- */}




{/*----------------------------------////////////Any Other Modal Code (Start)////////////----------------------------------------- */}



  
  {/*------------------------------------ AnyOther Modal Start Time States----------------------------------------- */}

  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [showTime2, setShowTime2] = useState(false);
  const[time2,setTime2]=useState(moment().format('HH:mm'));

    {/*------------------------------------ AnyOther Modal End Time States----------------------------------------- */}

const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
const [showTime3, setShowTime3] = useState(false);
const[time3,setTime3]=useState(moment().format('HH:mm'));

   {/*------------------------------------ AnyOther Modal Start Time Methods----------------------------------------- */}

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
    setShowTime2(true)
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = (date) => {
    setTime2(moment(date).format('HH:mm'));
    hideDatePicker2();
  };


  {/*------------------------------------AnyOther Modal End Time Methods----------------------------------------- */}

  const showDatePicker3 = () => { 
    setDatePickerVisibility3(true);
    setShowTime3(true)
  };

  const hideDatePicker3 = () => {
    setDatePickerVisibility3(false);
  };

  const handleConfirm3 = (date) => {
    setTime3(moment(date).format('HH:mm'));
    hideDatePicker3();
  };
  

     {/*------------------------------------ AnyOther Main code----------------------------------------- */}
     const[PresidingPersonAnyOther,setPresidingPersonAnyOther]=useState('')
     const AnyOther=()=>{
       return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}>
   
   
             
             <View style={styles.outerDDPickerView}>
                   <View style={styles.DropDownPickerView}> 
                     <View style={styles.modalHeader}>
                         <Text style={styles.modalText}>Any Other</Text>
                     </View>
                     <View style={{width:"100%",height:40}} />

                <Text style={styles.otherModalText}>Who was presiding during break?</Text>
   
                 {/*------------------------------------AnyOther Modal DropDownPicker----------------------------------------- */}
   
                 <TouchableOpacity 
          onPress={()=>{
            setPresidingHide(true)
          }}
           activeOpacity={0.5} 
           style={styles.btnPresiding}>
               <Text style={styles.Text1}>{PresidingPersonAnyOther}</Text>    
           </TouchableOpacity>

                  {/* ----- ChairPerson Name from Screen 17 of 20 --------- */}
 
 {
   PresidingHide ?  
   <View>
     <FlatList
      data={PresidingNameList}
      renderItem={({item})=>{
     return(
       <View>
       <TouchableOpacity style={styles.RenderItemPresiding}
         onPress={()=>{
         setPresidingPersonAnyOther(item.name)
         setPresidingHide(false)
       }}
       >
         <Text style={styles.FlatListPresidingText1}>{item.name} ({item.party})</Text>
       </TouchableOpacity>
       </View>
     )
   }}
       />

{
value1==' P' ? 
<FlatList
  data={ArrayPush}
  renderItem={({item})=>{ 
    return(
      <View>
      <TouchableOpacity style={styles.RenderItemPresiding}
        onPress={()=>{
          setPresidingPersonAnyOther(item.name)
          setPresidingHide(false)
      }}
      >
        <Text style={styles.FlatListPresidingText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  }
   />
:null
       }

{
value2==' P' ? 
<FlatList
  data={ArrayPush2}
  renderItem={({item})=>{ 
    return(
      <View>
      <TouchableOpacity style={styles.RenderItemPresiding}
        onPress={()=>{
          setPresidingPersonAnyOther(item.name)
          setPresidingHide(false)
      }}
      >
        <Text style={styles.FlatListPresidingText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  }
   />
:null
       }
   </View>
    :null
  

 }
   
    {/*------------------------------------AnyOther Modal Start Time----------------------------------------- */}
  
   <Text style={styles.otherModalText}>Start</Text>
   <View>
   <TouchableOpacity 
   onPress={showDatePicker2}
   activeOpacity={0.5} 
   style={styles.btn}>
       {
           showTime2 ? <Text style={styles.Text1}>{time2}</Text>: null
       }
   </TouchableOpacity>
   </View>
   
   <DateTimePickerModal
         isVisible={isDatePickerVisible2}
         mode="time"
         is24Hour={true}
         display='spinner'
         onConfirm={handleConfirm2}
         onCancel={hideDatePicker2}
       />
  
       {/*------------------------------------AnyOther Modal End Time----------------------------------------- */}
  
   <Text style={styles.otherModalText}>End</Text>
   <View>
   <TouchableOpacity 
   onPress={showDatePicker3}
   activeOpacity={0.5} 
   style={styles.btn}>
       {
           showTime3 ? <Text style={styles.Text1}>{time3}</Text>: null
       }
   </TouchableOpacity>
   </View>
   
   <DateTimePickerModal
         isVisible={isDatePickerVisible3}
         mode="time"
         is24Hour={true}
         display='spinner'
         onConfirm={handleConfirm3}
         onCancel={hideDatePicker3}
       />
                   
       {/*------------------------------------AnyOther Reason-TextInput----------------------------------------- */}
   
                    <Text style={styles.otherModalText}>Reason</Text>
                    <TextInput style={styles.TextInput}  onChangeText={(value)=>setReason(value)} />
                  
    {/*------------------------------------AnyOther Handle Modal btn----------------------------------------- */}
         <View style={styles.modalhandlebtnView}>
         <TouchableOpacity onPress={()=>setModalVisible2(!modalVisible2)}>
             <Text style={styles.modalText}>Cancel</Text>
        </TouchableOpacity>
   
        <TouchableOpacity style={styles.modalhandlebtn} onPress={()=>{
          AnyOtherStoreData();
          setModalVisible2(!modalVisible2)
          }}>
             <Text style={styles.modalText}>OK</Text>
        </TouchableOpacity>
         </View>
         
   
                    </View>
                    </View>
   
         </Modal>
   
       )
     }

    


{/*------------------------------------AnyOther Modal Code (End)----------------------------------------- */}


{/*----------------------------------////////////Protest Modal Code (Start)////////////----------------------------------------- */}


{/*------------------------------------ Protest Main code----------------------------------------- */}

const[PresidingPersonProtest,setPresidingPersonProtest]=useState('')
const Protest=()=>{
  return(
<Modal
animationType="slide"
transparent={true}
visible={modalVisible3}
onRequestClose={() => {
  Alert.alert("Modal has been closed.");
  setModalVisible3(!modalVisible3);
}}
>
  <ScrollView>
<View style={styles.outerDDPickerView}>
             <View style={styles.DropDownPickerView}>
                     <View style={styles.modalHeader}>
                         <Text style={styles.modalText}>Protest</Text>
                     </View>
                     <View style={{width:"100%",height:40}} />

            <Text style={styles.protestModalText}>Type of Protest</Text>
            <RadioButtonRN
            data={ProtestData1}
            box={false}
            circleSize={14}
            textStyle={styles.RNLabelText}
            style={{marginBottom:8.5}}
            selectedBtn={(item)=>setProtestRNData(item.label)}
            />
       
             <View style={styles.RowView}>
       <Text style={styles.durationText}>Duration of protest?</Text>
       <View style={styles.ProtestTimeView}>
            <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             keyboardType="number-pad"
             placeholder="H"
             onChangeText={(value)=>setPSpeakerHour(value)} />
              <TextInput  
             style={styles.TextInput}
             placeholderTextColor="#fff"
             keyboardType="number-pad"
             placeholder="M"
             onChangeText={(value)=>setPSpeakerMin(value)} />
        </View>
       </View>

             <Text style={styles.protestModalText}>Who was presiding during protest?</Text>

             <TouchableOpacity 
          onPress={()=>{
            setPresidingHide(true)
          }}
           activeOpacity={0.5} 
           style={styles.btnPresiding}>
               <Text style={styles.Text1}>{PresidingPersonProtest}</Text>    
           </TouchableOpacity>

                  {/* ----- ChairPerson Name from Screen 17 of 20 --------- */}
 
 {
   PresidingHide ?  
   <View>
     <FlatList
      data={PresidingNameList}
      renderItem={({item})=>{
     return(
       <View>
       <TouchableOpacity style={styles.RenderItemPresiding}
         onPress={()=>{
         setPresidingPersonProtest(item.name)
         setPresidingHide(false)
       }}
       >
         <Text style={styles.FlatListPresidingText1}>{item.name} ({item.party})</Text>
       </TouchableOpacity>
       </View>
     )
   }}
       />

{
value1==' P' ? 
<FlatList
  data={ArrayPush}
  renderItem={({item})=>{ 
    return(
      <View>
      <TouchableOpacity style={styles.RenderItemPresiding}
        onPress={()=>{
          setPresidingPersonProtest(item.name)
            setPresidingHide(false)
      }}
      >
        <Text style={styles.FlatListPresidingText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  }
   />
:null
       }

{
value2==' P' ? 
<FlatList
  data={ArrayPush2}
  renderItem={({item})=>{ 
    return(
      <View>
      <TouchableOpacity style={styles.RenderItemPresiding}
        onPress={()=>{
          setPresidingPersonProtest(item.name)
            setPresidingHide(false)
      }}
      >
        <Text style={styles.FlatListPresidingText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  }
   />
:null
       }


   </View>
    :null
  

 }
 
                
{/*------------------------------------Protest Reason-TextInput----------------------------------------- */}

                 <Text style={styles.protestModalText}>Reason of protest?</Text>
                 <TextInput style={styles.TextInput} keyboardType='default'  onChangeText={(value)=>setProtestReason(value)} />

{/*------------------------------------Protest item Separator----------------------------------------- */}

<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:10,marginTop:10}}/>

<Text style={styles.protestModalText}>Who was/were the protester(s)?</Text>
 <View>
         
            <TextInput  value={String(SearchProtestParty)}
             style={styles.TextInput1}
             placeholder='Party'
             placeholderTextColor="#fff"
             onChangeText={(text)=>{
               SearchFilterParty(text)
               }} />

      <FlatList style={styles.FlatList}
       data={name1}
       renderItem={renderItemPartyList1}
  
       />
{ 
 SearchProtestParty.length==0 ? null:
 <TouchableOpacity style={styles.AddBtn} onPress={()=>{
  HandleSubmit2()
  setSearchProtestParty('')
  Alert.alert('Party Saved!')
  }}>
<Text style={styles.AddBtnText}>Add Party</Text>
</TouchableOpacity>
}  


        {      
   SearchProtestParty.length==0  ? null :
    <View style={styles.FlatListPartyView}>
    <FlatList style={styles.FlatList}
   data={PartyNameList}
   renderItem={renderItemPartyList}
   nestedScrollEnabled={true}
   />
   </View>
   
} 
    </View>


{/*------------------------------------ Protester Type-2----------------------------------------- */}

<TextInput
      style={styles.TextInput}
      value={String(SearchProtestMember)}
      placeholder="Member"
      placeholderTextColor="#fff"
      onChangeText={(text)=>SearchFilterProtestMember(text)}
      />
   
   <FlatList style={styles.FlatList}
       data={name2}
       renderItem={renderItemMember1}
  
       />
{ 
 SearchProtestMember.length==0 ? null:
 <TouchableOpacity style={styles.AddBtn} onPress={()=>{
  HandleSubmit3()
  setSearchProtestMember('')
  Alert.alert('Member Saved!')
  }}>
<Text style={styles.AddBtnText}>Add Member</Text>
</TouchableOpacity>
}


{/*------------------------FlatList-1 for Display Protester Type-2 name------------------------*/}

{
 SearchProtestMember.length==0 ? null :
    <View style={styles.FlatListMemberView}>
    <FlatList style={styles.FlatList}
    nestedScrollEnabled={true}
    data={MemberNameList}
    renderItem={renderItemMember}

    />
    </View>

}

               
 {/*------------------------------------Protest Handle Modal btn----------------------------------------- */}
      <View style={styles.modalhandlebtnView}>
      <TouchableOpacity onPress={()=>setModalVisible3(!modalVisible3)}>
          <Text style={styles.modalText}>Cancel</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.modalhandlebtn} onPress={()=>{
       ProtestStoreData();
       setModalVisible3(!modalVisible3)
       }}>
          <Text style={styles.modalText}>OK</Text>
     </TouchableOpacity>
      </View>
      

                 </View>
                 </View>
                 </ScrollView>
  </Modal>

  )
}


         

   {/*------------------------------------Protest Modal Code (End)----------------------------------------- */}


{/*----------------------------------////////////Quorum Modal Code (Start)////////////----------------------------------------- */}

{/*------------------------------------Quorum-Modal RadioButtonRN Show/Hide States----------------------------------------- */}

const [HideRN1,setHideRN1]=useState(false);
const [HideRN2,setHideRN2]=useState(false);
const [HideRN3,setHideRN3]=useState(false);


{/*------------------------------------Quorum Identified Time States----------------------------------------- */}

const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);
const [showTime4, setShowTime4] = useState(false);
const[time4,setTime4]=useState(moment().format('HH:mm'));
  
{/*------------------------------------Quorum Identified Time Methods----------------------------------------- */}

  const showDatePicker4 = () => {
    setDatePickerVisibility4(true);
    setShowTime4(true)
  };

  const hideDatePicker4 = () => {
    setDatePickerVisibility4(false);
  };

  const handleConfirm4 = (date) => {
    setTime4(moment(date).format('HH:mm'));
    hideDatePicker4();
  };


  {/*------------------------------------ Quorum Proceedings-Suspended Start Time States----------------------------------------- */}

  const [isDatePickerVisible5, setDatePickerVisibility5] = useState(false);
  const [showTime5, setShowTime5] = useState(false);
  const[time5,setTime5]=useState(moment().format('HH:mm'));

    {/*------------------------------------ Quorum Proceedings-Suspended End Time States----------------------------------------- */}

const [isDatePickerVisible6, setDatePickerVisibility6] = useState(false);
const [showTime6, setShowTime6] = useState(false);
const[time6,setTime6]=useState(moment().format('HH:mm'));

   {/*------------------------------------ Quorum Proceedings-Suspended Start Time Methods----------------------------------------- */}

  const showDatePicker5 = () => {
    setDatePickerVisibility5(true);
    setShowTime5(true)
  };

  const hideDatePicker5 = () => {
    setDatePickerVisibility5(false);
  };

  const handleConfirm5 = (date) => {
    setTime5(moment(date).format('HH:mm'));
    hideDatePicker5();
  };


  {/*------------------------------------ Quorum Proceedings-Suspended End Time Methods----------------------------------------- */}

  const showDatePicker6 = () => { 
    setDatePickerVisibility6(true);
    setShowTime6(true)
  };

  const hideDatePicker6 = () => {
    setDatePickerVisibility6(false);
  };

  const handleConfirm6 = (date) => {
    setTime6(moment(date).format('HH:mm'));
    hideDatePicker6();
  };

  {/*------------------------------------ Quorum Main code----------------------------------------- */}
 
 const QuorumModal=()=>{
   return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible4}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible4(!modalVisible4);
    }}
   >
<ScrollView>
   <View style={styles.outerDDPickerView}>
              <View style={styles.DropDownPickerView}>
                     <View style={styles.modalHeader}>
                         <Text style={styles.modalText}>Quorum</Text>
                     </View>
                     <View style={{width:"100%",height:40}} />
                
             <Text style={styles.modalText}>Who pointed out the quorum?</Text>
   
   {/*------------------------------------ Member(s) who identified the quorum?----------------------------------------- */}
   
             <Text style={styles.quorumModalText}>Member(s) who identified the quorum?</Text>
            
      <TextInput
      style={styles.TextInput}
      value={QuorumPersonName}
      placeholder="Search here"
      placeholderTextColor="#fff"
      onChangeText={(text)=>SearchFilterQuorum(text)}
      />
   
{/*------------------------FlatList-1 for Display QuorumPerson's name------------------------*/}

{
  SearchQuorumPerson.length==0 || Hide ? null :
    <View style={styles.FlatListView}>
    <FlatList style={styles.FlatList}
    nestedScrollEnabled={true}
    data={Name}
    renderItem={renderItemQuorum}

    />
    </View>

}
   
   {/*------------------------------------  Quorum item Separator Quorum----------------------------------------- */}
           <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:10,marginTop:10}}/>
           
   {/*------------------------------------ When was quorum identified?----------------------------------------- */}
           <Text style={styles.quorumModalText}>When was quorum identified?</Text>
           <View style={styles.btnView}>
           <TouchableOpacity 
           onPress={showDatePicker4}
           activeOpacity={0.5} 
           style={styles.btn}>
               {
                   showTime4 ? <Text style={styles.Text1}>{time4}</Text>: null
               }
           </TouchableOpacity>
           </View>
           
           <DateTimePickerModal
                 isVisible={isDatePickerVisible4}
                 mode="time"
                 is24Hour={true}
                 display='spinner'
                 onConfirm={handleConfirm4}
                 onCancel={hideDatePicker4}
               />
    
   
   {/*------------------------------------ Quorum DropDownPicker----------------------------------------- */}
        <Text style={styles.quorumModalText}>Who was presiding when quorum was identified?</Text>
        <TouchableOpacity 
          onPress={()=>{
            setPresidingHide(true)
          }}
           activeOpacity={0.5} 
           style={styles.btnPresiding}>
               <Text style={styles.Text1}>{PresidingPersonName}{PresidingParty}</Text>    
           </TouchableOpacity>

                  {/* ----- ChairPerson Name from Screen 17 of 20 --------- */}
 
 {
   PresidingHide ?  
   <View>
     <FlatList
      data={PresidingNameList}
      renderItem={({item})=>{
     return(
       <View>
       <TouchableOpacity style={styles.RenderItemPresiding}
         onPress={()=>{
         setPresidingPersonName(item.name)
         setPresidingParty("("+item.party+")")
         setPresidingHide(false)
       }}
       >
         <Text style={styles.FlatListPresidingText1}>{item.name} ({item.party})</Text>
       </TouchableOpacity>
       </View>
     )
   }}
       />

{
value1==' P' ? 
<FlatList
  data={ArrayPush}
  renderItem={({item})=>{ 
    return(
      <View>
      <TouchableOpacity style={styles.RenderItemPresiding}
        onPress={()=>{
          setPresidingPersonName(item.name)
          setPresidingHide(false)
      }}
      >
        <Text style={styles.FlatListPresidingText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  }
   />
:null
       }

{
value2==' P' ? 
<FlatList
  data={ArrayPush2}
  renderItem={({item})=>{ 
    return(
      <View>
      <TouchableOpacity style={styles.RenderItemPresiding}
        onPress={()=>{
          setPresidingPersonName(item.name)
          setPresidingHide(false)
      }}
      >
        <Text style={styles.FlatListPresidingText1}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  }
   />
:null
       }


   </View>
    :null
  

 }
 

     {/*------------------------------------ Quorum Chair's Action----------------------------------------- */}
   
           <Text style={styles.quorumModalText}>Chair's Action</Text>
   
     {/*------------------------------------ Quorum RadioButtonRN-1 Chair's Action----------------------------------------- */}
   
             <RadioButtonRN
             data={QuorumData1}
             box={false}
             circleSize={14}
             style={{marginBottom:8.5}}
             textStyle={styles.RNLabelText}
             selectedBtn={(item)=>{
               setQuorumRN1(item.label)
               setHideRN1(!HideRN1)
              }}
             />
   
             { HideRN1 ?  <View>
                   <Text style={styles.quorumModalText}>Enter the number of members present</Text>
                   <View style={styles.TextInputView}>
                   <TextInput style={styles.TextInput} keyboardType="numeric" maxLength={3} onChangeText={(value)=>setQuorumMemberCount(value)} />
                   </View>
             </View> :null
             }
   
              
   
   {/*------------------------------------Quorum RadioButtonRN-2 Chair's Action----------------------------------------- */}
              <RadioButtonRN
              data={QuorumData2}
             box={false}
             circleSize={14}
             textStyle={styles.RNLabelText}
             style={{marginBottom:8.5}}
             selectedBtn={(item)=>{
              setQuorumRN2(item.label)
             }}
             />
   {/*------------------------------------Quorum RadioButtonRN-3 Chair's Action----------------------------------------- */}
               <RadioButtonRN   
             data={QuorumData3}
             box={false}
             circleSize={14}
             textStyle={styles.RNLabelText}
             style={{marginBottom:8.5}}
             selectedBtn={(item)=>{
              setQuorumRN3(item.label)
              setHideRN2(!HideRN2)
             }}
             />
              
              { 
              HideRN2 ? 
              <View>
                    <Text style={styles.quorumModalText}>Enter the duration of ringing bells?</Text>
                    <View style={styles.RowView}>
                     <View style={styles.ProtestTimeView}>
                    <TextInput  
                    style={styles.TextInput}
                    placeholderTextColor="#fff"
                    keyboardType="number-pad"
                    placeholder="H"
                    onChangeText={(value)=>setSpeakerHour(value)} />
                     <TextInput  
                    style={styles.TextInput}
                    placeholderTextColor="#fff"
                    keyboardType="number-pad"
                    placeholder="M"
                    onChangeText={(value)=>setSpeakerMin(value)} />
                    </View>
                    </View>
              </View> :null
              }
   
   
   
   {/*------------------------------------Quorum RadioButtonRN-4 Chair's Action----------------------------------------- */}
             <RadioButtonRN
              data={QuorumData4}
             box={false}
             circleSize={14}
             textStyle={styles.RNLabelText}
             style={{marginBottom:8.5}}
             selectedBtn={(item)=>{
              setQuorumRN4(item.label)
              setHideRN3(!HideRN3)
             }}
             />
   
           {
             HideRN3 ? 
             <View>
   {/*------------------------------------Quorum Duration of Suspension (Chair's Action)----------------------------------------- */}
   <Text style={styles.quorumModalText}>Duration of Suspension</Text>
   {/*------------------------------------Quorum Duration of Suspension (Chair's Action) Start Time----------------------------------------- */}
   
   <View style={{flexDirection:"row",alignItems:"center"}}>
   <Text style={styles.quorumModalText}>Start</Text>
           <TouchableOpacity 
           onPress={showDatePicker5}
           activeOpacity={0.5} 
           style={styles.btn1}>
               {
                   showTime5 ? <Text style={styles.Text1}>{time5}</Text>: null
               }
           </TouchableOpacity>
           
           <DateTimePickerModal
                 isVisible={isDatePickerVisible5}
                 mode="time"
                 is24Hour={true}
                 display='spinner'
                 onConfirm={handleConfirm5}
                 onCancel={hideDatePicker5}
               />
   </View>
   
   {/*------------------------------------Quorum Duration of Suspension (Chair's Action) End Time----------------------------------------- */}
   <View style={{flexDirection:"row",alignItems:"center"}}>
   <Text style={styles.quorumModalText}>End</Text>
           <TouchableOpacity 
           onPress={showDatePicker6}
           activeOpacity={0.5} 
           style={styles.btn2}>
               {
                   showTime6 ? <Text style={styles.Text1}>{time6}</Text>: null
               }
           </TouchableOpacity>
      
           
           <DateTimePickerModal
                 isVisible={isDatePickerVisible6}
                 mode="time"
                 is24Hour={true}
                 display='spinner'
                 onConfirm={handleConfirm6}
                 onCancel={hideDatePicker6}
               />
   </View>
   
             </View> : null
           } 
   
   {/*------------------------------------Quorum RadioButtonRN-5 Chair's Action----------------------------------------- */}
            <RadioButtonRN
             data={QuorumData5}
             box={false}
             circleSize={14}
             textStyle={styles.RNLabelText}
             style={{marginBottom:8.5}}
             selectedBtn={(item)=>{
              setQuorumRN5(item.label)
             }}
             />
   
   
   {/*------------------------------------ Quorum item Separator----------------------------------------- */}
   
   <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:10,marginTop:10}}/>
   
   
                
   {/*------------------------------------Quorum Handle Modal btn----------------------------------------- */}
       <View style={styles.modalhandlebtnView} >
       <TouchableOpacity onPress={()=>setModalVisible4(!modalVisible4)}>
           <Text style={styles.modalText}>Cancel</Text>
      </TouchableOpacity>
   
      <TouchableOpacity style={styles.modalhandlebtn} onPress={()=>{
        QuorumStoreData();
        setModalVisible4(!modalVisible4)
        }}>
           <Text style={styles.modalText}>OK</Text>
      </TouchableOpacity>
       </View>
   
                  </View>           
                  </View>
                  </ScrollView>
     </Modal>
   )

 }


 {/*------------------------------------Quorum Modal Code (End)----------------------------------------- */}
   

   {/*------------------------------------Looped Array Code Start----------------------------------------- */}

  var Array=[];
for(let i = 0 ; i < count ; i++ ){
 Array.push(
  <View key={i}>
{/*------------------------------------Quorum/Protest/Break----------------------------------------- */}

<Text style={styles.Text2}>Quorum/Protest/Break</Text>
{/*------------------------------------Form-Counter----------------------------------------- */}

    <View style={styles.RadioBtnView}>
     <View style={styles.smallTextView}>
     <Text style={styles.smallText}>{i+1}</Text>

{/*------------------------------------RadioButtonRN-Quorum/Protest/Break----------------------------------------- */}

     </View>
        <View style={styles.RadioView}>
            <RadioButtonRN
            data={data}
            box={false}
            circleSize={14}
            textStyle={styles.RNLabelText}
            style={{marginBottom:8.5}}
            selectedBtn={(item)=>{
              if(item.label==='Quorum')
              {
              setModalVisible4(true)
              setInterrupt('Quorum')
              } else if(item.label==='Protest'){
                setModalVisible3(true)
                setInterrupt('Protest')
              }else if(item.label==='Break'){
                setModalVisible1(true)
                setInterrupt('Break')
              }else(
                setInterrupt('Any Other'),
                setModalVisible2(true)
                
              )
          }}
            />
        </View>
    </View>

{/*------------------------------------Item Seperator----------------------------------------- */}

    <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#D7DBDD",marginBottom:2,marginTop:10}}/>

 </View>

  )
} 

{/*------------------------------------Looped Array Code End----------------------------------------- */}



{/*/////////////////////// ------Main Code -------/////////////////// */}


  return (

    <View style={styles.container}>

<Text style={styles.Text}>How many times were the proceedings interrupted?</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput} keyboardType="numeric" value={String(count)} maxLength={2}  onChangeText={(value)=>setCount(value)} />
</View>

{/*------------------------------------Array Calling----------------------------------------- */}
<ScrollView>
{Array}
<View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#fff",marginBottom:150}}/>
</ScrollView>

{QuorumModal()}
{Protest()}
{PrayerBreak()}
{AnyOther()}

       <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>


{/*------------------------------------Navigation Buttons----------------------------------------- */}

<TouchableOpacity 
onPress={()=>{if(count.length==0)
  {
  Alert.alert('Please enter details in all fields')
  }else{
    StoreData();
    navigation.navigate('21 of 37')
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
    Text:{
      marginTop:20,
      marginBottom:20,
      fontFamily:"Montserrat-Bold",
      fontSize:17,
      paddingHorizontal:35,
    },
    Text2:{
      marginTop:10,
      marginBottom:10,
      fontFamily:"Montserrat-Medium",
      fontSize:17,
      paddingHorizontal:35,
    },
    modalText:{
        marginTop:2,
        marginBottom:2,
        fontFamily:"Montserrat-Medium",
        fontSize:17,
        paddingHorizontal:3,
      },
      quorumModalText:{
        marginTop:2,
        marginBottom:2,
        fontFamily:"Montserrat-Medium",
        fontSize:15,
        paddingHorizontal:3,
      },
      protestModalText:{
        marginTop:2,
        marginBottom:2,
        fontFamily:"Montserrat-Medium",
        fontSize:15,
        paddingHorizontal:3,
      },
      breakModalText:{
        marginTop:2,
        marginBottom:2,
        fontFamily:"Montserrat-Medium",
        fontSize:15,
        paddingHorizontal:3,
      },
      otherModalText:{
        marginTop:2,
        marginBottom:2,
        fontFamily:"Montserrat-Medium",
        fontSize:15,
        paddingHorizontal:3,
      },
      ProtestTimeView:{
        flexDirection:"row",
        marginBottom:10
      },
    TextInputView:{
      paddingLeft:33,
      paddingRight:33,
    },
    TextInput:{
      backgroundColor:"#48C9B0",
      height:50,
      borderRadius:15,
      elevation:5,
      borderWidth:0.45,
      borderColor:"#F2F3F4",
      color:"#fff",
      fontSize:17,
      justifyContent:"center",
      alignItems:"center",
      fontFamily:"Montserrat-Regular",
      paddingHorizontal:10,
    },
    TextInput1:{
      backgroundColor:"#48C9B0",
      height:45,
      borderRadius:15,
      elevation:5,
      borderWidth:0.45,
      borderColor:"#F2F3F4",
      color:"#fff",
      fontSize:14,
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
  
  RadioBtnView:{
    paddingLeft:33,
    paddingRight:33,
  },
  RadioView:{
    backgroundColor:"#fff",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    color:"#fff",
    fontSize:14,
  },
  smallTextView:{
    backgroundColor:"#F4F6F6",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F4F6F6",
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginTop:10,
    marginBottom:4
  },
    smallText:{
    fontFamily:"Montserrat-Medium",
    fontSize:17,
  },
  outerDDPickerView:{
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
    overflow:"hidden"
  },
  DropDownPicker:{
    borderWidth:0.45,
    borderColor:"#f2f2f4",
    elevation:0.45,
    marginBottom:2,
    backgroundColor:"#48C9B0"
  },
  dropDownContainerStyle:{
    borderColor:"#f2f2f4",
    elevation:1,
    borderRadius:null,
    width:"99.4%",
    left:1,
    backgroundColor:"#F4F6F6"
  },
  listItemLabelStyle:{
    fontFamily:"Montserrat-Regular"
  },
  placeholderStyle:{
    color:"#fff",
    fontFamily:"Montserrat-Regular"
  },
  Text1:{
    fontFamily:"Montserrat-Regular",
    fontSize:14,
    color:"#fff"
  },
  btn:{
    backgroundColor:"#48C9B0",
    height:50,
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4"
  },
  btnPresiding:{
    backgroundColor:"#48C9B0",
    height:50,
    width:"100%",
    justifyContent:"center",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    paddingHorizontal:10
  },
  btn1:{
    backgroundColor:"#48C9B0",
    height:50,
    width:"70%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4"
  },
  btn2:{
    backgroundColor:"#48C9B0",
    height:50,
    width:"70%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    left:5
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
  RowView:{
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center"
  },
  durationText:{
    marginTop:2,
    marginBottom:2,
    fontFamily:"Montserrat-Medium",
    fontSize:15,
    width:"70%",
    paddingHorizontal:6
  },
  modalHeader:{
    alignItems:"center",
    justifyContent:"center",
    left:-10,
    height:40,
    backgroundColor:"#D0D3D4",
    width:"140%",
    overflow:"hidden",
    borderTopStartRadius:15,
    borderTopEndRadius:15,
    position:"absolute"
  },
  RNLabelText:{
    fontFamily:"Montserrat-Regular",
    fontSize:15,
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
    height:45,
    borderRadius:15,
    justifyContent:"center",
    elevation:1,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:16,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginBottom:5,
    marginTop:5
  },
  PartyRenderItem1:{
    backgroundColor:"#fff",
    height:40,
    borderRadius:15,
    justifyContent:"center",
    elevation:1,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    paddingHorizontal:10,
    marginBottom:2,
    marginTop:2
  },
  RenderItemMember:{
    backgroundColor:"#fff",
    height:40,
    borderRadius:15,
    justifyContent:"center",
    elevation:1,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    paddingHorizontal:10,
    marginBottom:2,
    marginTop:2
  },

  FlatListView:{
    paddingHorizontal:5,
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,
    marginBottom:20,
    height:250,
},
FlatListPartyView:{
  paddingHorizontal:5,
  justifyContent:"center",
  alignItems:"center",
  marginTop:20,
  marginBottom:20,
  height:200,
},
FlatListMemberView:{
  paddingHorizontal:5,
  justifyContent:"center",
  alignItems:"center",
  marginTop:10,
  marginBottom:10,
  height:200,
},
FlatList:{
    width:"100%",
},

FlatListText1:{
  fontSize:14,
  paddingHorizontal:2,
  fontFamily:"Montserrat-Regular",
},

FlatListText2:{
fontSize:14,
paddingHorizontal:2,
fontFamily:"Montserrat-Regular",
},

RenderItemPresiding:{
  height:40,
  backgroundColor:"#fff",
  borderRadius:15,
  justifyContent:"center",
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F2F3F4",
  paddingHorizontal:10,
  marginBottom:2,
  marginTop:2
},
FlatListPresidingText1:{
  fontSize:12,
  paddingHorizontal:2,
  fontFamily:"Montserrat-Regular",
},
AddBtn:{
  backgroundColor:"#48C9B0",
  height:20,
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


  })

