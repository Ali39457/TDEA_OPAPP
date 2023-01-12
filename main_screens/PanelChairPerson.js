import { StyleSheet, Text, View,FlatList,TextInput,TouchableOpacity,Dimensions,LogBox,Alert,Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
const HEIGHT=Dimensions.get("screen").height;
const Width=Dimensions.get("screen").width;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PanelChairPerson({navigation}) {


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
        setName((user.member_list))
        setMasterData((user.member_list))
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };



    //------------------------States for ChairPerson Name -------------------------//

    const[Name,setName]=useState([]);
    const [masterData,setMasterData]=useState([]);
    const [SearchChairPerson,setSearchChairPerson]=useState([]);
    const [TotalCount,setTotalCount]=useState(1);
    const [ChairpersonCount,setChairpersonCount]=useState('');
    const [Assembly,setAssembly]=useState('');
    const [PartyName,setPartyName]=useState('');
    const [ChairPersonName,setChairPersonName]=useState(ChairPersonName);
    const [modalVisible, setModalVisible] = useState(false);
    const [indexChecked,setIndexChecked]=useState('');
     


 {/*---------------------------------------- StoreData using AsyncStorage & Convert the Array into String----------------------------------------- */}

 const StoreData=async()=>{
  try {
    var user={
      Number_of_Panel_of_Chairpersons:TotalCount-1,
      Panel_of_Chairpersons:[...name1]
    }
   await AsyncStorage.setItem('Screen-17',JSON.stringify(user))
  } catch (error) {
    console.log(error)
  }
}
     
     //------------------------renderItem for FlatList-1-------------------------//
     const [PlaceName,setPlaceName]=useState('');

    const renderItem=({item})=>{
        return(
            <View style={styles.RenderItemView}>
<TouchableOpacity
  style={indexChecked === item.id ? styles.RenderItem2:styles.RenderItem1 }
  onPress={()=>{
  setChairPersonName(item.name)
  setChairpersonCount(item.id)
  setAssembly(item.assembly)
  setPartyName(item.party)
  setTotalCount(TotalCount+1)
  setIndexChecked(item.id)
  setPlaceName(item.name+" ("+item.party+")")
  Alert.alert("Click Add ChairPerson!")
  }}>

<Text numberOfLines={3}   style={indexChecked === item.id ? styles.FlatListText2:styles.FlatListText1 }>{item.name} ({item.party})</Text>
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


    //  FlatList-2 States  & method for store chairPerson name //

const [DATA1,SetDATA1]=useState([])
const [name1,setName1]=useState(DATA1);

    //  method for store chairPerson name //

const HandleSubmit2=()=>{
  const newArray=[...DATA1,{assembly:Assembly,id:ChairpersonCount,name:ChairPersonName,party:PartyName}]
  setName1(newArray)
  SetDATA1(newArray)
}

 //------------------------onRemove for FlatList-2-------------------------//
 const onRemove = () => {
    setName1([])
    SetDATA1([])
    setChairpersonCount(0)
};


 const renderItem1=({item})=>{
    return(
           <TouchableOpacity style={styles.RenderItem2}>
             <Text numberOfLines={3} style={styles.FlatListText2}>{item.name} ({item.party})</Text>
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
        <Text style={styles.Text1}>Saved Members</Text> 
           <FlatList style={styles.FlatList}
           data={name1}
           renderItem={renderItem1}
           />

           {/*------------------------------------Modal Handle Modal btn----------------------------------------- */}
           <View style={{width:"100%",height:40}} />
               <View style={styles.modalhandlebtnView1} >
               <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
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
    
 //------------------------MAin code-------------------------//

  return (
    <View style={styles.container}>  
<Text style={styles.Text}>Please select the members of Panel of Chairpersons?</Text> 

    <View style={styles.TextInputView}>
      <TextInput
      style={styles.TextInput}
      placeholder="Search here"
      placeholderTextColor="#fff"
      onChangeText={(text)=>SearchFilter(text)}
      />
    </View>

 {/*------------------------ Calling ChairPersonModal------------------------*/}

 {ChairPersonModal()}        

{/*------------------------FlatList-1 for Display ChairPerson's name------------------------*/}


    <View style={styles.FlatListView}>
    <FlatList style={styles.FlatList}
    nestedScrollEnabled={true}
    data={Name}
    renderItem={renderItem}
    />
    </View>



{/* ------------------------------- ChairPerson DurationTime ---------------------------- */}

  
<TouchableOpacity style={styles.modalBtn}
        onPress={()=>setModalVisible(!modalVisible)}>
        <Text style={styles.modalBtnText}>View List</Text>
      </TouchableOpacity>

<View style={{flexDirection:"row-reverse",width:"100%",justifyContent:"center",alignItems:"center",bottom:50}}>
  {/*------------------------Navigation Btn------------------------*/}
  <View style={{paddingHorizontal:6}}>
  <TouchableOpacity 
onPress={()=>{if(name1.length==0)
  {
  Alert.alert('Please select members!')
  }else{
    StoreData()
    navigation.navigate('18 of 37')
  }
}} 
 style={styles.forwardBtn}>
 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>
  </View>

{/*------------------------Add ChairPerson------------------------*/}
  <View style={{paddingHorizontal:6}}>
<TouchableOpacity style={styles.AddBtn} onPress={()=>{
  HandleSubmit2()
  Alert.alert('Member Saved!')
  }}>
<Text style={styles.AddBtnText}>Add ChairPerson</Text>
</TouchableOpacity>
  </View>

  <View style={{paddingHorizontal:6}}>
  <TouchableOpacity onPress={()=>navigation.navigate('16 of 37')} style={styles.backBtn}>
          <Text style={styles.icon2}>➤</Text>
 </TouchableOpacity>
  </View>
      

</View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
        height:HEIGHT,
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
        height:HEIGHT/1.8,
    },
    FlatList:{
        width:"100%",
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
        marginBottom:20,
        fontFamily:"Montserrat-Medium",
        fontSize:17,
        textAlign:"center"
      },
      AddBtnView:{
        paddingLeft:33,
        paddingRight:33,
      },
      AddBtn:{
        backgroundColor:"#48C9B0",
        height:45,
        borderRadius:15,
        elevation:5,
        borderWidth:0.45,
        borderColor:"#F2F3F4",
        color:"#fff",
        fontSize:17,
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
        fontSize:14,
        fontFamily:"Montserrat-Regular",
        paddingHorizontal:10,
        color:"#fff"
      },
    
forwardBtn:{
  backgroundColor:"#48C9B0",
  height:70,
  width:70,
  borderRadius:35,
  justifyContent:"center",
  alignItems:"center",
  elevation:5,
  borderWidth:1,
  borderColor:"#F2F3F4",
  zIndex: 1,
},
backBtn:{
  backgroundColor:"#48C9B0",
  height:70,
  width:70,
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
      modalBtnText:{
        fontFamily:"Montserrat-Medium",
        fontSize:14,
        color:"#fff"
      },
})