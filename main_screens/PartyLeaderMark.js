import { StyleSheet, Text, View,FlatList,TextInput,TouchableOpacity,Dimensions,Alert,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
const HEIGHT=Dimensions.get("window").height;
import RadioButtonRN from 'radio-buttons-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox} from "react-native-radio-check"

export default function PartyLeaderMark({navigation}) {
  
  useEffect(()=>{
   retrieveData0();
  },[])

    //------------------------States-------------------------//
    const RadioData = [ {label: ''}];
    const [Attendance,setAttendance]=useState(false)
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

//------------------------States for PartyName -------------------------//

   const [PartyNameList,setPartyNameList]=useState([]);
   const [PartyMasterData,setPartyMasterData]=useState([]);
   const [SearchParty,setSearchParty]=useState([]);
   const [PartyCount,setPartyCount]=useState('');
   const [PartyAssembly,setPartyAssembly]=useState('');
   const [PartyName,setPartyName]=useState(PartyName);
      

//------------------------renderItemPartyList-------------------------//

const renderItemPartyList=({item})=>{
  return(
      <View style={styles.RenderItemView}>
<TouchableOpacity style={styles.PartyRenderItem1}>
<Text style={styles.FlatListText1}>{item.party}</Text>

<CheckBox
    style={{bottom:6,position:"absolute",right:10}}
    icon={{
    normal: require('../assets/uncheck.png'),
    checked: require("../assets/check.png")
  }}
  iconStyle={{height:30,width:30}}
  onChecked={(checked, pressed) => {
    setPartyName(item.party)
    setPartyCount(item.id)
    setPartyAssembly(item.assembly)
    setAttendance(true)
    HandleSubmit2()
  }} />

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
  setSearchParty(text);
}else{ 
setPartyNameList(PartyMasterData);
setSearchParty(text);
}
  }

  //  FlatList-2 States  & method for store Party name //

const [PartyDATA1,SetPartyDATA1]=useState([])
const [name1,setName1]=useState(PartyDATA1);
const [PartyCOunt,setPartyCOunt]=useState(1);

  //  method for store Party name //

const HandleSubmit2=()=>{if(PartyCOunt>1){
  const newArray=[...PartyDATA1,{assembly:PartyAssembly,id:PartyCount,party:PartyName,attendance:Attendance}]
  setName1(newArray)
  SetPartyDATA1(newArray)
}
 else{
  setPartyCOunt(PartyCOunt+1)
 }
}

    const StoreData=async()=>{
      try {
        var user={
          Parliamentary_Leaders_Attendance:[...name1]
        }
       await AsyncStorage.setItem('Screen-22',JSON.stringify(user))
       
      } catch (error) {
        console.log(error)
      }
    }

  {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
  const removeData=async()=>{
    try {
     await AsyncStorage.removeItem('Screen-22')
     navigation.replace('22 of 37')
     console.log("removed")
    } catch (error) {
      console.log(error)
    }
  }

    
 //------------------------MAin code-------------------------//

  return (
    <View style={styles.container}>
<Text style={styles.Text}>Mark the circle against the parties whose leaders were present</Text>

<View style={styles.RenderItemView}>
<TextInput  value={String(SearchParty)}
             style={styles.TextInput1}
             placeholder='Search here'
             placeholderTextColor="#fff"
             onChangeText={(text)=>{
               SearchFilterParty(text)
               }} />
</View>
            

  <View style={styles.FlatListView}>
   <FlatList style={styles.FlatList}
   data={PartyNameList}
   nestedScrollEnabled={true}
   renderItem={renderItemPartyList}
   />
   </View>

      <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>

<TouchableOpacity style={styles.AddBtn} onPress={()=>{
  HandleSubmit2()
  setSearchParty('')
  Alert.alert('List Saved!')
  }}>
<Text style={styles.AddBtnText}>Add List</Text>
</TouchableOpacity>

<TouchableOpacity 
onPress={()=>{
    StoreData()
    navigation.navigate('23 of 37')
}} 
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('21 of 37')} style={styles.backBtn}>
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
    RenderItemView:{
        paddingLeft:23,
        paddingRight:23,
      },
    RenderItem:{
        backgroundColor:"#fff",
        height:50,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
      },
    FlatListText:{
        fontSize:14,
        paddingHorizontal:5,
        fontFamily:"Montserrat-Regular",
        width:"70%"
    },
    FlatListView:{
        paddingHorizontal:5,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        marginBottom:20,
        height:HEIGHT-275
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
    flag:{
        height:50,
        width:50,
        borderRadius:25
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
    AddBtn:{
      backgroundColor:"#48C9B0",
      height:45,
      borderRadius:15,
      elevation:5,
      borderWidth:0.45,
      borderColor:"#F2F3F4",
      color:"#fff",
      paddingHorizontal:10,
      justifyContent:"center",
      position:"absolute",
      bottom:25,
      left:"32%",
      width:"36%"
    },
    AddBtnText:{
      fontSize:14,
      paddingHorizontal:2,
      fontFamily:"Montserrat-Regular",
      color:"#fff",
      textAlign:"center"
    },
    PartyRenderItem1:{
    backgroundColor:"#fff",
    height:45,
    borderRadius:10,
    justifyContent:"center",
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    paddingHorizontal:12,
    marginBottom:1,
    marginTop:1,
    },
  FlatListText1:{
    fontSize:14,
    paddingHorizontal:2,
    fontFamily:"Montserrat-Regular",
    paddingRight:20
  },
  TextInput1:{
    backgroundColor:"#48C9B0",
    height:60,
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    color:"#fff",
    fontSize:17,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:12
  },

})