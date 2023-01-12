import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Dimensions,Alert,LogBox,ScrollView,Modal,FlatList} from 'react-native';
import React,{useState,useEffect,} from 'react';
const HEIGHT=Dimensions.get("window").height;
import RadioButtonRN from 'radio-buttons-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SupplementaryItems({navigation}) {  
  const [modalVisibleMov, setmodalVisibleMov] = useState(false);
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////-------------------------------DebateModal Code Start----------------------------///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////// =========States for store SupplementaryDebateArray===========/////////
const [DebateDATA0,SetDebateDATA0]=useState([])
const [SupplementaryDebateArray,setSupplementaryDebateArray]=useState(DebateDATA0);
const [Debatecount0,setDebatecount0]=useState(1);
const data = [{label: 'Add Details',}];

////////////========method for store SupplementaryDebateArray========///////////////

const HandleSubmitDebate=()=>{
  const newArray=[...DebateDATA0,
    {
    SupplementaryDebateCount:Debatecount0,
    memberName:SearchSupplementaryMember,
    member_id:MemberID,
    SupplementaryDescription:SupplementaryDescription,
    SupplementaryDebateHour:SupplementaryDebateHour,
    SupplementaryDebateMins:SupplementaryDebateMins,
  }]
  setSupplementaryDebateArray(newArray)
  SetDebateDATA0(newArray)
  setDebatecount0(Debatecount0+1)
}


{/*----------------------------------------States----------------------------------------- */}
 const [SupplementaryDebateCount,setSupplementaryDebateCount]=useState('');
 const [SupplementaryDebateMember,setSupplementaryDebateMember]=useState("");
 const [SupplementaryDescription,setSupplementaryDescription]=useState("");
 const [SupplementaryDebateHour,setSupplementaryDebateHour]=useState("");
 const [SupplementaryDebateMins,setSupplementaryDebateMins]=useState("");

 const [masterDataDebate,setmasterDataDebate]=useState([]);
 const [SearchSupplementaryMember,setSearchSupplementaryMember]=useState([]);
 const [DebateHide,setDebateHide]=useState(true);
 const [DebateHide2,setDebateHide2]=useState(false);

 {/*------------------------------------ShowMemberBTn States----------------------------------------- */}
 const [ShowMemberBTn, setShowMemberBTn] = useState(false);

//------------------------getName from Api-------------------------//

const getName = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setSupplementaryDebateMember((user.member_list))
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
  setSearchSupplementaryMember(item.name)
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
 setSupplementaryDebateMember(newData);
 setSearchSupplementaryMember(text);
}else{ 
 setSupplementaryDebateMember(masterDataDebate);
 setSearchSupplementaryMember(text);
}
 }


//---------------------- FlatList States  & method for store Member name---------- //
const [DebateDATA2,SetDebateDATA2]=useState([])
const [countDebate,setcountDebate]=useState(1);
const [MemberName,setMemberName]=useState(DebateDATA2);


//-----------------------method for store Member name------------------------------- // 
const HandleSubmitDebate2=()=>{
const newArray=[...DebateDATA2,{id:countDebate,name:SearchSupplementaryMember,party:DebateParty,member_id:MemberID}]
SetDebateDATA2(newArray)
setcountDebate(countDebate+1)
setMemberName(newArray)
}  

{/*---------------------------------------- DebateArray----------------------------------------- */}
var DebateArray=[];
for(let i = 0 ; i < SupplementaryDebateCount ; i++ ){
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
 data={SupplementaryDebateMember}
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
onChangeText={(e) => setSupplementaryDescription(e)}
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
           onChangeText={(value)=>setSupplementaryDebateHour(value)} />
      
          <TextInput  
           style={styles.TextInputs}
           placeholderTextColor="#fff"
           placeholder="M"
           keyboardType="numeric"
           onBlur={()=>setDebateHide2(false)}
           onChangeText={(value)=>setSupplementaryDebateMins(value)} />
</View>

<RadioButtonRN
data={[{label: 'Add debate-'+(i+1)+' details'}]}
textStyle={styles.RNLabelText}
box={false}
circleSize={14}
selectedBtn={(e)=>{
  HandleSubmitDebate(e)
  setDebateHide2(false)
  setSearchSupplementaryMember([])
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


///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////---------------------Ministries Related Agenda Code Start-------------------------///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

    //------------------------States for ChairPerson Name -------------------------//

    const[Name,setName]=useState([]);
    const [SuppleMinistryMasterData,setSuppleMinistryMasterData]=useState([]);
    const [SearchChairPerson,setSearchChairPerson]=useState([]);
    const [ChairPersonName,setChairPersonName]=useState(ChairPersonName);
    const [MinistryModalVisible, setMinistryModalVisible] = useState(false);
    const [show,setShow]=useState(false);

     //------------------------useEffect to Call Api-------------------------//

    useEffect(()=>{
       getSuppleMinistryName();
    },[])

 //------------------------getSuppleMinistryName(ChairPerson) from Api-------------------------//

    const getSuppleMinistryName = async () => {

      try {
        await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
          var user=JSON.parse(value)
          setName((user.ministry_list))
          setSuppleMinistryMasterData((user.ministry_list))
        }})
        
      } catch (e) {
        console.log('Failed to fetch the data from storage!', e)
      }
    
    };

    
     //------------------------renderItem for FlatList-1-------------------------//
     const [Ministry_Id,SetMinistry_Id]=useState('')

    const renderMinistryItem=({item})=>{
        return(
            <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} onPress={()=>{
  setChairPersonName(item.name)
  SetMinistry_Id(item.id)
  Alert.alert(item.name +": selected!","Click Add Ministry",[
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

    const MinistryItemSeparator=({item})=>{
        return(
            <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:2,marginTop:4}}>
            </View>
        )
    }

//  FlatList-2 States  & method for store chairPerson name //

const [MinistryDATA,SetMinistryDATA]=useState([])
const [MinistryNameArray,setMinistryNameArray]=useState(MinistryDATA);
const [MinistryCount,setMinistryCount]=useState(1);

    //  method for store chairPerson name //

const HandleSubmitMinistry=()=>{
  const newArray=[...MinistryDATA,{id:MinistryCount,name:ChairPersonName,Ministry_Id:Ministry_Id}]
  setMinistryNameArray(newArray)
  SetMinistryDATA(newArray)
  setMinistryCount(MinistryCount+1)
}

 //------------------------onRemove for FlatList-2-------------------------//
 const onRemove = () => {
    setMinistryNameArray([])
    SetMinistryDATA([])
    setMinistryCount(1)
};

//------------------------View List-------------------------//
 const renderMinistryItem1=({item})=>{
    return(
           <TouchableOpacity style={styles.RenderItem2}>
             <Text numberOfLines={3} style={styles.FlatListText2}>{item.name}</Text>
          </TouchableOpacity>
    )
}

 //------------------------ItemSeparator for FlatList-2-------------------------//

const MinistryItemSeparator1=({item})=>{
    return(
        <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:5,marginTop:5}}>
        </View>
    )
}

 //------------------------SearchFilterMinistry-------------------------//

const SearchFilterMinistry=(text)=>{
  if(text){
      const newData=SuppleMinistryMasterData.filter((item)=>{
          const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
          const textData=text.toUpperCase();
          return itemData.indexOf(textData) > -1 ;
      });
      setName(newData);
      setSearchChairPerson(text);
  }else{ 
      setName(SuppleMinistryMasterData);
      setSearchChairPerson(text);
  }
      }

{/*------------------------Modal for FlatList-1 for Store ChairPerson's name------------------------*/}



      const ChairPersonModal=()=>{
        return(
          <Modal
          animationType="slide"
          transparent={true}
          visible={MinistryModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setMinistryModalVisible(!MinistryModalVisible);
          }}>
    <View style={styles.OuterModalView}>
      <View style={styles.modalView}>
        <Text style={styles.Text}>Members of Panel of Chairpersons : {MinistryCount-1}</Text> 
           <FlatList style={styles.FlatList}
           data={MinistryNameArray}
           renderItem={renderMinistryItem1}
           />

           {/*------------------------------------Modal Handle Modal btn----------------------------------------- */}
           <View style={{width:"100%",height:40}} />
               <View style={styles.modalhandlebtnView1} >
               <TouchableOpacity onPress={()=>setMinistryModalVisible(!MinistryModalVisible)}>
                   <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalhandlebtnView} onPress={onRemove}>
                   <Text style={styles.modalText}>Clear List</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalhandlebtnView2} onPress={()=>{
                setMinistryModalVisible(!MinistryModalVisible)
                }}>
                   <Text style={styles.modalText}>OK</Text>
              </TouchableOpacity>
              </View>

      </View>
    </View>
        
            </Modal>
          )}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////---------------------Ministries Related Agenda Code End-------------------------///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

  //////// =========States for store SupplementaryItemsArray===========/////////
  const [DATAA,SetDATAA]=useState([])
  const [SupplementaryItemsArray,setSupplementaryItemsArray]=useState(DATAA);
  const [countSupplementaryItems,setCountSupplementaryItems]=useState(1);
  
////////////========method for store SupplementaryItemsArray========///////////////
  
  const HandleSubmitItems=()=>{
    const newArray=[...DATAA,
      {
          Number_of_Other_Agenda:SupplementaryCount,
          Other_Agenda:[{
          supplementaryItemsCount:countSupplementaryItems,
          mover_Array:SupplementaryItemMoverArray,
          agendatype:Text1.value,
          otherAgenda:Text4,
          detail:Text2,
          status:Text3,
          DebateHeld:DebateHeld,
          SupplementaryDebateArray:SupplementaryDebateArray,
          MinistryHeld:MinistryHeld,
          SuppleMinistryArray:MinistryNameArray
        }]
        
    }]
    setSupplementaryItemsArray(newArray)
    SetDATAA(newArray)
    setCountSupplementaryItems(countSupplementaryItems+1)
  }

  {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

  const StoreData=async()=>{
    try {
      var user={
        SupplementaryItemsArray:SupplementaryItemsArray
      }
      await AsyncStorage.setItem('Screen-34',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }


 {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
  const removeData=async()=>{
    try {
     await AsyncStorage.removeItem('Screen-34')
     navigation.replace('34 of 37')
     console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// SupplementaryItems Screen Code ///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //Mover Name Array//

  const [MoverDATA0,SetMoverDATA0]=useState([])
  const [SupplementaryItemMoverArray,setSupplementaryItemMoverArray]=useState(MoverDATA0);
  const [Movercount0,setMoverCount0]=useState(1);

  const HandleSubmitMover=()=>{
    const newArray=[...MoverDATA0,
      {
      SupplementaryItemMoverCount:Movercount0,
      moverName:{assembly:SuppleItemsMoverAssembly,id:SuppleItemsMoverCount,name:SearchSuppleItemsMover,party:SuppleItemsPartyName},
    }]
    setSupplementaryItemMoverArray(newArray)
    SetMoverDATA0(newArray)
    setMoverCount0(Movercount0+1)
  }


  {/*----------------------------------------States----------------------------------------- */}
  const[SupplementaryCount,setSupplementaryCount]=useState('');
  
  const [Text1,setText1]=useState("");
  const [Text2,setText2]=useState("");
  {/*-------------(State-3)-----------------------SuppleItemsMover----------------------------------------- */}
  const [Text3,setText3]=useState("");
  const [Text4,setText4]=useState("");

  const SupplementaryRadioBtn = [{label: 'Check the box if debate was held'},{label: 'Check the box if agenda is related to ministries'}];
  const [DebateHeld,setDebateHeld]=useState('No');
  const [MinistryHeld,setMinistryHeld]=useState('No')
  

  {/*------------------------------------Modal-1 States----------------------------------------- */}
  const [modalVisible, setModalVisible] = useState(false);

    {/*------------------------------------Modal-2 States----------------------------------------- */}
    const [modalVisible1, setModalVisible1] = useState(false);


     {/*------------------------------------ShowAgendaBTn States----------------------------------------- */}
     const [ShowAgendaBTn, setShowAgendaBTn] = useState(false);

     {/*------------------------------------ShowMoverBTn States----------------------------------------- */}
     const [ShowMoverBTn, setShowMoverBTn] = useState(false);

       {/*------------------------------------ShowDetailBTn States----------------------------------------- */}
       const [ShowDetailBTn, setShowDetailBTn] = useState(false);

{/*------------------------------------Name of SuppleItems-Mover states----------------------------------------- */}

const[SuppleItemsMover,setSuppleItemsMover]=useState([]);
const [masterData,setMasterData]=useState([]);
const [SearchSuppleItemsMover,setSearchSuppleItemsMover]=useState([]);
const [Hide,setHide]=useState(true);
const [Hide2,setHide2]=useState(false);

 {/*------------------------------------useEffect SuppleItems-Mover----------------------------------------- */}

useEffect(()=>{
  getSuppleItemsMover();
  getName();
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
},[])

{/*------------------------------------getSuppleItemsMover method----------------------------------------- */}

const getSuppleItemsMover = async () => {

  try {
    await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
      var user=JSON.parse(value)
      setSuppleItemsMover((user.member_list))
      setMasterData((user.member_list))
    }})
    
  } catch (e) {
    console.log('Failed to fetch the data from storage!', e)
  }

};

{/*------------------------------------renderItem for SuppleItems-Mover ----------------------------------------- */}
const [SuppleItemsMoverCount,setSuppleItemsMoverCount]=useState('');
const [SuppleItemsMoverAssembly,setSuppleItemsMoverAssembly]=useState('');
const [SuppleItemsPartyName,setSuppleItemsPartyName]=useState('')

const RenderItem1=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.RenderItem1} 
onPress={()=>{
setSearchSuppleItemsMover(item.name)
setSuppleItemsMoverCount(item.id)
setSuppleItemsMoverAssembly(item.assembly)
setSuppleItemsPartyName(item.party)
setHide(true)

}}>
<Text numberOfLines={3} style={styles.FlatListText1}>{item.name}({item.party})</Text>
      </TouchableOpacity>
      </View>
  )
}


{/*------------------------------------ItemSeparator for SuppleItems-Mover----------------------------------------- */}

const ItemSeparator1=({item})=>{
   return(
       <View style={{borderWidth:0.75,width:"100%",height:0.1,borderColor:"#fff",}}>
       </View>
   )
}

{/*------------------------------------SearchFilter for SuppleItems-Mover states----------------------------------------- */}

const SearchFilter1=(text)=>{
if(text){
const newData=masterData.filter((item)=>{
   const itemData=item.name ? item.name.toUpperCase() : "".toUpperCase();
   const textData=text.toUpperCase();
   return itemData.indexOf(textData) > -1 ;
});
setSuppleItemsMover(newData);
setSearchSuppleItemsMover(text);
}else{ 
setSuppleItemsMover(masterData);
setSearchSuppleItemsMover(text);
}
}


 {/*---------------------------------------- Drop-Down States----------------------------------------- */}

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Resolution', value: 'Resolution'},
    {label: 'Bill', value: 'Bill'},
    {label: 'Motion', value: 'Motion'},
    {label: 'Adjournment Motion', value: 'Adjournment Motion'},
    {label: 'Debate', value: 'Debate'},
    {label: 'Calling Attention Notice', value: 'Calling Attention Notice'},
    {label: 'Question of Privilege', value: 'Question of Privilege'},
    {label: 'Amendment', value: 'Amendment'},
    {label: 'Supplementary/Paper', value: 'Supplementary/Paper'},
    {label: 'Any Other', value: 'Any Other'},
    
  ]);


//---------------------- FlatList-2 States  & method for store Agenda name---------- //
      const [DATA1,SetDATA1]=useState([])
      const [count1,setCount1]=useState(1);
      
//-----------------------method for store Agenda name------------------------------- // 
      const HandleSubmit1=()=>{
        const newArray=[...DATA1,{id:count1,agenda:Text1.value}]
        SetDATA1(newArray)
        setCount1(count1+1)
      }  

//---------------------- FlatList-3 States  & method for store Mover name---------- //
const [DATA2,SetDATA2]=useState([])
const [count,setCount]=useState(1);
const [MoverName,setMoverName]=useState(DATA2);


//-----------------------method for store Mover name------------------------------- // 
const HandleSubmit2=()=>{
  const newArray=[...DATA2,{id:count,name:SearchSuppleItemsMover,party:SuppleItemsPartyName}]
  SetDATA2(newArray)
  setCount(count+1)
  setMoverName(newArray)
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

        <TouchableOpacity style={styles.modalhandlebtnView} onPress={onRemove1}>
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
const onRemove1 = () => {
setMoverName([])
SetDATA2('')
setCount(1)
};     

 {/*---------------------------------------- Array----------------------------------------- */}
 
      
var Array=[];
for(let i = 0 ; i < SupplementaryCount ; i++ ){
 Array.push(
  <View key={i}>

<View style={styles.paddingView}>
            <View style={styles.smallTextView}>
                <Text style={styles.smallText}>{i+1}</Text>
            </View>
{/*----------------------------------------Name of Agenda----------------------------------------- */}

<Text style={styles.QuestionsText}>Name of Agenda</Text>
<DropDownPicker style={styles.DropDownPicker} 
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  selectedItemContainerStyle={{backgroundColor: "lightgrey"}}
                  arrowIconStyle={{width: 15,height: 15}}
                  onSelectItem={(e) =>{
                    if(e.label=='Any Other')
                    {
                      setText1(e)
                      setShowAgendaBTn(true)
                      Alert.alert('Enter description & Click Add Agenda')
                    }
                    else{
                      setText1(e)
                      setShowAgendaBTn(true)
                      
                    }
    
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
                  zIndex={1000}
                />

{/*-----------------Name of Agenda--------------------------- */}

{
  Text1.value==='Any Other' ?  <TextInput 
  placeholderTextColor="#fff"
  placeholder='Description'
  onChangeText={(text)=>setText4(text)}
  style={styles.TextInput}
/> : null
}

{/*------------------------Add Agenda------------------------*/}

  {
    ShowAgendaBTn ?  <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit1()
      setShowAgendaBTn(false)
      setHide2(false)
      }}>
      <Text style={styles.AddBtnText}>Add Agenda</Text>
      </TouchableOpacity>
     :null
  }
 
{/*---------------------------------------- Details----------------------------------------- */}
<Text style={styles.QuestionsText}>Details</Text>
<TextInput 
 placeholder=''
 onChangeText={(e) => setText2(e)}
  style={styles.TextInput}
 />


 {/*---------------------------------------- Mover(s)----------------------------------------- */}
 
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



{/*---------------------------------------- Searchable FlatList for mover----------------------------------------- */}

{
  Hide ? null :<View style={styles.FlatListView}>
  <FlatList style={styles.FlatList}
  nestedScrollEnabled={true}
  data={SuppleItemsMover}
  renderItem={RenderItem1}
 />
 </View>
}
    
{MoverModal()}


{/*--------------///////////------------------------Add Mover Btn----------------//////////////--------------------*/}

      {
      ShowMoverBTn ?   <TouchableOpacity style={styles.AddBTn1} onPress={()=>{
      HandleSubmit2()
      HandleSubmitMover();
      setShowMoverBTn(false)
      setHide2(true)
      Alert.alert(
        "Mover Added!",
        SearchSuppleItemsMover,
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

{/*-------------//////////////--------------------------- Status-------------------////////////////////-------------------- */}
<Text style={styles.QuestionsText}>Status</Text>
<TextInput 
 placeholder=''
 onChangeText={(e) =>{
   setText3(e)
   setShowDetailBTn(true)
}}
 style={styles.TextInput}
 />

           {
             ShowDetailBTn ? <TouchableOpacity style={styles.addBTnTextView} onPress={()=>{
              setShowDetailBTn(false)
             }} >
               <Text style={styles.addBTnText}>Add Details</Text>
           </TouchableOpacity> : null
           } 
 

{/*---------------------------------------- RadioButtonRN----------------------------------------- */}

<RadioButtonRN
  data={SupplementaryRadioBtn}
  textStyle={styles.RNLabelText}
  style={{marginBottom:10}}
  box={false}
  circleSize={14}
  selectedBtn={(item)=>{if(item.label==='Check the box if debate was held'){
    setModalVisible(!modalVisible)
    setDebateHeld('Yes')
  }else if(item.label=='Check the box if agenda is related to ministries'){
    setModalVisible1(!modalVisible1)
    setMinistryHeld('Yes')
    }else{
      console.log('error')
    }
}}
/>

{/*---------------------------------------- Save Form-{i+1} Details----------------------------------------- */}

<TouchableOpacity style={styles.AddBTn1} onPress={()=>{ 
  if(SupplementaryCount.length==0){
  Alert.alert('Please fill detail in all fields')
  }
  else{
    HandleSubmitItems()
    setSupplementaryDebateArray([])
    setDebateHeld("No")
    setMemberName([])
    setMinistryNameArray([])
    setSearchSupplementaryMember('')
    setSearchSuppleItemsMover('')
    setMoverName([])
    SetDATA2('')
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


{/*------------------------------------SuppleItemsModal-1 code start----------------------------------------- */}

     const SuppleItemsModal1=()=>{
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

<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2} onChangeText={(value)=> setSupplementaryDebateCount(value)} />

{/*----------------------------------------DebateArray Calling----------------------------------------- */}
<ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
{DebateArray}

<View style={{marginBottom:100,marginTop:10}}/>
</ScrollView>
                                   
    {/*------------------------------------Modal Handle Modal btn----------------------------------------- */}
        <View style={{width:"100%",height:40}} />
         <View style={styles.modalhandlebtnDebate} >
         <TouchableOpacity onPress={()=>{
             setModalVisible(!modalVisible)
             setSupplementaryDebateCount()
             setSearchSupplementaryMember()
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
        
    
     {/*------------------------------------SuppleItems Modal-1 Code (End)----------------------------------------- */}


     {/*------------------------------------SuppleItemsModal-2 code start----------------------------------------- */}

     const SuppleItemsModal2=()=>{
        return(
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible1(!modalVisible1);
          }}>
      <View style={styles.outerDebateView}>
                  <View style={styles.DropDownPickerView}>
                  <Text style={styles.modalText}>Ministries</Text> 

      <TextInput
      style={styles.TextInput}
      value={String(SearchChairPerson)}
      placeholder="Search here"
      placeholderTextColor="#fff"
      onChangeText={(text)=>{
        SearchFilterMinistry(text)
        setShow(true)
      }}
      />

 {/*------------------------ Calling ChairPersonModal------------------------*/}

 {ChairPersonModal()}        

{/*------------------------FlatList-1 for Display ChairPerson's name------------------------*/}

{
  show ? <FlatList style={styles.FlatList}
  data={Name}
  renderItem={renderMinistryItem}
  /> :null    

}

{/* ------------------------------- ChairPerson View List---------------------------- */}

<TouchableOpacity style={styles.modalBtn}
        onPress={()=>setMinistryModalVisible(!MinistryModalVisible)}>
        <Text style={styles.modalBtnText}>View List</Text>
      </TouchableOpacity>

     
  {/*------------------------Add ChairPerson------------------------*/}
<TouchableOpacity style={styles.modalBtn1} onPress={()=>{
  HandleSubmitMinistry()
  Alert.alert('Member Saved!')
  }}>
<Text style={styles.modalBtnText}>Add Ministries</Text>
</TouchableOpacity>

      {/*------------------------------------Modal Handle Modal btn----------------------------------------- */}
          <View style={{width:"100%",height:40}} />
           <View style={styles.modalhandlebtnMinistry}>
           <TouchableOpacity  onPress={()=>{
             setModalVisible1(!modalVisible1)
             SetMinistryDATA([])
             setMinistryCount(1)
             SearchFilterMinistry('')
             setShow(false)
             }}>
               <Text style={styles.modalText}>Close</Text>
          </TouchableOpacity>
    
           </View>
           
                      </View>
                      </View>
      
          </Modal>
               
        )
      }
          
      
       {/*------------------------------------SuppleItems Modal-2 Code (End)----------------------------------------- */}


{/*---------------------------------------- Main Code----------------------------------------- */}

const Check = SupplementaryCount.length==0 || Text1.length==0  || Text2.length==0 || Text3.length==0 


{/*------------------------Modal for FlatList-1 for Store ChairPerson's name------------------------*/}



  return (
    
        <View style={styles.container}>

<Text style={styles.Text}>Number of Supplementary Items?</Text>

<View style={styles.TextInputView}>
<TextInput style={styles.TextInput} keyboardType="numeric" maxLength={2} onChangeText={(value)=>setSupplementaryCount(value)} />
</View>

{
  SupplementaryCount.length==0 ?  null :<View style={styles.paddingView}>
  <Text style={styles.HeadingText}>Supplementary Items </Text>
  </View> 
}

{/*----------------------------------------Array Calling----------------------------------------- */}
<ScrollView nestedScrollEnabled={true} >
  {Array}
{SuppleItemsModal1()}
{SuppleItemsModal2()}
<View style={{marginBottom:100,marginTop:10}}/>

</ScrollView>

{/* ------------------------------- Clear List ---------------------------- */}

      <TouchableOpacity style={styles.modalBtn}
        onPress={removeData}>
        <Text style={styles.modalBtnText}>Clear</Text>
      </TouchableOpacity>

<TouchableOpacity 
onPress={()=>{
  if(SupplementaryCount=='0'){
    StoreData();
    navigation.navigate('35 of 37')
  }
  else if(Check)
  {
  Alert.alert('Please fill detail in all fields')
  }else{
    StoreData();
    navigation.navigate('35 of 37')
  }
}} 
style={styles.forwardBtn}>

<Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('33 of 37')} style={styles.backBtn}>
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
modalhandlebtnDebate:{
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
    height:45,
    borderRadius:15,
    justifyContent:"center",
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:17,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginBottom:2,
    marginTop:2
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
    fontSize:15,
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
  fontSize:15,
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
FlatList:{
    height:200,
    width:"100%"
},
  RenderItem:{
    backgroundColor:"#fff",
    height:45,
    borderRadius:15,
    justifyContent:"center",
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:17,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
    marginBottom:2,
    marginTop:2
  },
  FlatListText:{
    fontSize:14,
    paddingHorizontal:2,
    fontFamily:"Montserrat-Regular",
},
modalTextMember:{
  fontFamily:"Montserrat-Regular",
  fontSize:15,
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
  fontSize:15,
},
addBTnTextView:{
  backgroundColor:"#48C9B0",
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F4F6F6",
  paddingHorizontal:10,
  marginTop:10
},
addBTnText:{
  marginTop:2,
  marginBottom:2,
  fontFamily:"Montserrat-Medium",
  fontSize:13,
  color:"#fff",
  textAlign:"center"
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
RenderItem2:{
  backgroundColor:"#48C9B0",
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

FlatListText2:{
fontSize:14,
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
  height:250,
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
modalText:{
  marginTop:45,
  marginBottom:2,
  fontFamily:"Montserrat-Medium",
  fontSize:14,
  paddingHorizontal:3,
},
modalBtn1:{
  position:"absolute",
  left:10,
  top:5,
  backgroundColor:"#48C9B0",
  borderWidth:0.45,
  elevation:5,
  borderColor:"#F4F6F6",
  borderRadius:15,
  paddingHorizontal:10,
},

OuterModalView:{
  paddingLeft:33,
  paddingRight:33,
},
modalView:{
  backgroundColor:"#fff",
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F4F6F6",
  paddingLeft:33,
  paddingRight:33,
  marginBottom:10,
  marginTop:50,
  height:400,
  overflow:"hidden"
},
modalhandlebtnMinistry:{
  bottom:2,
  position:"absolute",
  left:10
  },
  OkBtn:{
    position:"absolute",
    bottom:-64,
    right:3
  },
  OkBtnText:{
    fontFamily:"Montserrat-Medium",
    fontSize:14,
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
    Text1:{
      marginTop:25,
      marginBottom:20,
      fontFamily:"Montserrat-Medium",
      fontSize:17,
      textAlign:"center"
    },
 
 
})