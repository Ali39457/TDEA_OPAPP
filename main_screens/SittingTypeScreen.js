import { StyleSheet, Text, View ,TouchableOpacity,FlatList,Dimensions,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SittingTypeScreen({navigation}) {

    const [indexChecked,setIndexChecked]=useState('');


  {/*---------------------------------------- States----------------------------------------- */}

    const [sittingType,setSittingType]=useState('')
    const[data,setData]=useState([
    {key:"1",title:"GOVERNMENT DAY",onpress:"GOVERNMENT DAY"}, 
    {key:"2",title:"IN-CAMERA SITTING",onpress:"IN-CAMERA SITTING"},
    {key:"3",title:"PRIVATE MEMBERS DAY",onpress:"PRIVATE MEMBERS DAY"},

  ]);

  {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

const StoreData=async()=>{
  try {
    var user={
      Business_Day:sittingType
    }
   await AsyncStorage.setItem('Screen-06',JSON.stringify(user))
   
  } catch (error) {
    console.log(error)
  }
}

{/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
const removeData=async()=>{
  try {
   await AsyncStorage.removeItem('Screen-06')
   navigation.replace('6 of 37')
   console.log("removed")
  } catch (error) {
    console.log(error)
  }
}
 
  
  {/*---------------------------------------- renderItem for FlatList----------------------------------------- */}
  const renderItem=({item})=>{
    return(
        <View style={styles.FlatListContainer}>
        <TouchableOpacity 
         onPress={()=>{
            setSittingType(item.onpress);
            setIndexChecked(item.key)
          }} 
         activeOpacity={0.5} 
         style={indexChecked === item.key ? styles.FlatListView1:styles.FlatListView }>
        <Text style={styles.FlatListText}>{item.title}</Text>
        </TouchableOpacity>
        </View>
    )
  }


 {/*---------------------------------------- ItemSeparator for FlatList----------------------------------------- */}
  const ItemSeparator=()=>{
    return(
      <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:7}}/>
    )
  }

  {/*---------------------------------------- Main Code----------------------------------------- */}

  return (
    <View style={styles.container}>
    <Text style={styles.Text}>Select the type of sitting:</Text>

    <FlatList 
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.key}
    />

       <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>


     <TouchableOpacity 
  onPress={()=>{if(sittingType.length==0)
   {
    Alert.alert('Select sitting type')
   }else{
     StoreData();
     navigation.navigate('7 of 37')
   }
  }} 
  style={styles.forwardBtn}>
   <Text style={styles.icon1}>➤</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>navigation.navigate('5 of 37')} style={styles.backBtn}>
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
  FlatListContainer:{
    paddingLeft:33,
    paddingRight:33,
    paddingBottom:7,
  },
  FlatListView:{
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
  FlatListView1:{
    backgroundColor:"#0E6251",
    height:60,
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    flexDirection:"row"
  },
  FlatListText:{
    fontFamily:"Montserrat-Medium",
    fontSize:14,
    color:"#fff"
  },
  FlatListText1:{
    fontFamily:"Montserrat-Medium",
    fontSize:18,
    color:"#fff",
    fontWeight:"700"
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
   
 
})