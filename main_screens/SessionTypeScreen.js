import { StyleSheet, Text, View ,TouchableOpacity,FlatList,Modal,Dimensions,TextInput,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import { ScrollView } from 'react-native-virtualized-view';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SessionTypeScreen({navigation,route}) {
  const [indexChecked,setIndexChecked]=useState('');
  
//--------------------useEffect-----------------//
  useEffect(() => {
    retrieveData();
  }, [])

  //-------------------retrieveData---------------//
  const [HouseName,setHouseName]=useState('')
  const retrieveData = async () => {
    try{
      const user = await AsyncStorage.getItem('Screen-01')
      .then(value=>{if(value!=null){
        const user=JSON.parse(value)
        setHouseName(user.House)
      }})
      
    }
     catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };


  
    {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

    const StoreData=async()=>{
      try {
        var user={
          Session_Type:sessionType
        }

       await AsyncStorage.setItem('Screen-02',JSON.stringify(user))
       
      } catch (error) {
        console.log(error)
      }
    }
    
  
   {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
    const removeData=async()=>{
      try {
       await AsyncStorage.removeItem('Screen-02')
       navigation.replace('2 of 37')
       console.log("removed")
      } catch (error) {
        console.log(error)
      }
    }


    //-------------------  States  ------------------//
    const [value,setValue]=useState('');
    const [sessionType,setSessionType]=useState('')
    const [ShowAnyOther,setShowAnyOther]=useState(false)

    //---------------  data for FlatList-1  --------------------//
  const[data,setData]=useState([
    {key:"1",title:"REGULAR",onpress:"REGULAR"}, 
    {key:"2",title:"BUDGET",onpress:"BUDGET"},
    {key:"3",title:"REQUISITIONED",onpress:"REQUISITIONED"},
    {key:"4",title:"PRESIDENTIAL ADDRESS",onpress:"PRESIDENTIAL ADDRESS"},
    {key:"5",title:"ANY OTHER",onpress:"ANY OTHER"},
  ]);

 
    //-------------------- AnyOtherField method  -----------------//
    const AnyOtherField=()=>{
      return(
        <View style={styles.TextInputView}>
          <TextInput style={styles.TextInput} 
           placeholder="Describe here"
           placeholderTextColor="#000"
           onChangeText={(value)=>setSessionType(value)} />
        </View>
      )
        }

        

    //--------------------  RenderItem for FlatList-1  -----------------//
  const renderItem=({item})=>{
    return(
      <View style={styles.FlatListContainer}>
      <TouchableOpacity 
       onPress={()=>{ if(item.title=='ANY OTHER')
       {
        setShowAnyOther(true)
        setIndexChecked(item.key)
       }else{
        setSessionType(item.onpress);
        setIndexChecked(item.key)
        setShowAnyOther(false)
       }
        
        }} 
       activeOpacity={0.5} 
       style={indexChecked === item.key ? styles.FlatListView1:styles.FlatListView }>
      <Text style={styles.FlatListText}>{item.title}</Text>
      </TouchableOpacity>
     
      </View>
    )
  }

   //---------------------  data for FlatList-2  ------------------------//
  const[data1,setData1]=useState([
    {key:"1",title:"JOINT",onpress:"JOINT"}, 
    {key:"2",title:"PRESIDENTIAL",onpress:"PRESIDENTIAL"},
  ]);

   //---------------------  RenderItem for FlatList-2  -----------------------//
  const renderItem1=({item})=>{
    return(
      <View style={styles.FlatListContainer}>
      <TouchableOpacity 
       onPress={()=>{
        setSessionType(item.onpress);
        setIndexChecked(item.key)
       }}  
      activeOpacity={0.5} 
      style={indexChecked === item.key ? styles.FlatListView1:styles.FlatListView }>
      <Text style={styles.FlatListText}>{item.title}</Text>
      </TouchableOpacity>
      </View>
    )
  }

   //----------------------------  data for FlatList-3  -------------------------//
  const[data2,setData2]=useState([
    {key:"1",title:"REGULAR",onpress:"REGULAR"}, 
    {key:"2",title:"BUDGET",onpress:"BUDGET"},
    {key:"3",title:"REQUISITIONED",onpress:"REQUISITIONED"},
    {key:"4",title:"GOVERNOR ADDRESS",onpress:"GOVERNOR ADDRESS"},
    {key:"5",title:"ANY OTHER",onpress:"ANY OTHER"},
  ]);
  
    //---------------------  RenderItem for FlatList-3  -----------------------------//
  const renderItem2=({item})=>{
    return(
      <View style={styles.FlatListContainer}>
      <TouchableOpacity 
       onPress={()=>{ if(item.title=='ANY OTHER')
       {
        setShowAnyOther(true)
        setIndexChecked(item.key)
       }else{
        setSessionType(item.onpress);
        setIndexChecked(item.key)
        setShowAnyOther(false)
       }
        
        }} 
       activeOpacity={0.5} 
       style={indexChecked === item.key ? styles.FlatListView1:styles.FlatListView }>
      <Text style={styles.FlatListText}>{item.title}</Text>
      </TouchableOpacity>
      </View>
    )
  }

   //--------------------  ItemSeparator for FlatLists ----------------------------//
  const ItemSeparator=()=>{
    return(
      <View style={{borderWidth:0.5,height:0.5,width:"100%",borderColor:"#CACFD2",marginBottom:7}}/>
    )
  }

  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
     
        <Text style={styles.Text}>Please select session type:</Text>     
  {/* ------------------------------------- FLATLIST-1 ----------------------- */}

{ HouseName==='National' || HouseName==='Senate' ?  <View style={styles.FlatList}>
    <FlatList  listKey='1' 
         data={data}
         renderItem={renderItem}
         
         />

    </View> :null }

  {/* ---------------------------- FLATLIST-2 ----------------------------------- */}

{ HouseName==='Parliament' ?<View style={styles.FlatList}>
         <FlatList  listKey='2' 
         data={data1}
         renderItem={renderItem1}
         
         />

     </View> :null 
     }

  {/* ------------------------------------ FLATLIST-3 -------------------------------------- */}

{ HouseName==='Punjab' || HouseName==='Sindh' || HouseName==='Balochistan' || HouseName==='KP'
? <View style={styles.FlatList}>
<FlatList  listKey='3' 
data={data2}
renderItem={renderItem2}

/>
</View> 
:null
 }


 </ScrollView>

<View style={{position:"absolute",width:"100%",bottom:160}}>
{
     ShowAnyOther ? AnyOtherField() :null
}
</View>


    

     <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>

 
<TouchableOpacity 
  onPress={()=>{if(sessionType.length==0)
   {
   Alert.alert('Select session type')
   }else{
     StoreData();
     navigation.navigate('3 of 37')
   }
  }} 
  style={styles.forwardBtn}>
   <Text style={styles.icon1}>➤</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>navigation.navigate('1 of 37')} style={styles.backBtn}>
    <Text style={styles.icon2}>➤</Text>
  </TouchableOpacity>

        </View>
 
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#FFF",
  },
  TextInputView:{
    paddingLeft:33,
    paddingRight:33,
    width:"100%",
    marginBottom:10,
    top:15,
    
  },
  TextInput:{
    backgroundColor:"#fff",
    height:60,
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    fontSize:14,
    fontFamily:"Montserrat-Regular",
    paddingHorizontal:10,
   
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