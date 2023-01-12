import { StyleSheet, Text, View ,TouchableOpacity,FlatList,TextInput,Dimensions,Alert,LogBox} from 'react-native';
import React,{useState,useEffect} from 'react';
import { ScrollView } from 'react-native-virtualized-view';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {

  const [indexChecked,setIndexChecked]=useState('');
  const [ID,setID]=useState('');
  const [Username,setUsername]=useState('');


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
        setID((user.ID))
        setUsername((user.username))
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };


//------------------------------------removeToken------------------------------------------//
  const removeToken = async () => {
      try {
        const keys = ['@ApiData']
        const userToken = await AsyncStorage.multiRemove(keys)

        if (userToken == null) {
            navigation.navigate('LoginScreen')
            console.log('Token successfully removed!')
          }
    } catch (e) {
        console.log('Failed to remove the Token from the storage!')
    }
  };

  const [HouseName,setHouseName]=useState('');
  const[data,setData]=useState([
    {key:"1",title:"NATIONAL ASSEMBLY",value:"National",onpress:"2 of 37"}, 
    {key:"2",title:"SENATE",value:"Senate",onpress:"2 of 37"},
    {key:"3",title:"PARLIAMENT",value:"Parliament",onpress:"2 of 37"},
    {key:"4",title:"PUNJAB ASSEMBLY",value:"Punjab",onpress:"2 of 37"},
    {key:"5",title:"SINDH ASSEMBLY",value:"Sindh",onpress:"2 of 37"},
    {key:"6",title:"BALOCHISTAN ASSEMBLY",value:"Balochistan",onpress:"2 of 37"},
    {key:"7",title:"KHYBER PAKHTUNKHAWA ASSEMBLY",value:"KP",onpress:"2 of 37"},
  ]);
  

    {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

    const StoreData=async()=>{
      try {
        var user={
          House:HouseName,
          userID:ID,
          username:Username
        }
       await AsyncStorage.setItem('Screen-01',JSON.stringify(user))
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
      setHouseName(item.value)
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
        <View style={{backgroundColor:"#48C9B0",height:58,justifyContent:"center",alignItems:"flex-end",paddingRight:33}}>
          <TouchableOpacity style={styles.CustomBtn} onPress={removeToken}>
             <Text style={styles.CustomBtnText}>LogOut</Text>
          </TouchableOpacity> 
        </View>
        <View style={{borderWidth:0.25,height:0.30,width:"100%",borderColor:"#CACFD2",marginBottom:7}}/>

  <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
      <Text style={styles.Text}>Please select your House:</Text>

       <FlatList 
       data={data}
       renderItem={renderItem}
       />
            
  </ScrollView>

      <TouchableOpacity 
       onPress={()=>{if(HouseName.length==0)
       {
       Alert.alert('Select session type')
       }else{
       StoreData();
       navigation.navigate('2 of 37')
       }
       }} 
       style={styles.forwardBtn}>
       <Text style={styles.icon1}>➤</Text>
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
  icon1:{
    fontSize:45,
    color:"#fff",
    left:4,
    bottom:2
},
CustomBtn:{
  backgroundColor:"#48C9B0",
  height:25,
  borderRadius:7,
  elevation:5,
  borderWidth:1,
  borderColor:"#F2F3F4",
  color:"#fff",
  paddingHorizontal:10,
  justifyContent:"center",
  width:"25%",
},
CustomBtnText:{
  fontSize:14,
  paddingHorizontal:2,
  fontFamily:"Montserrat-Regular",
  color:"#fff",
  textAlign:"center"
},
 
})