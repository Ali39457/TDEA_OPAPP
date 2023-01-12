
import { StyleSheet, Text, View ,TouchableOpacity,Image,Dimensions,Pressable,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
const HEIGHT=Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SubmitScreen({navigation}) {

  const [submit_date, setsubmit_date] = useState('');

useEffect(()=>{
  var date = new Date().getDate(); //submit_dDate
  var month = new Date().getMonth() + 1; //submit_dMonth
  var year = new Date().getFullYear(); //submit_dYear
  var hours = new Date().getHours(); //submit_dHours
  var min = new Date().getMinutes(); //submit_dMinutes
  var sec = new Date().getSeconds(); //submit_dSeconds
  setsubmit_date(
    date + '/' + month + '/' + year 
    + ' ' + hours + ':' + min + ':' + sec
  );

  retrieveData();

},[])

 const [FormDATA,setFormDATA]=useState([])
   //-------------------get All keys---------------//

   const retrieveData = async () => {

    try {
      const keys = ['Screen-01','Screen-02','Screen-03','Screen-04','Screen-05','Screen-06','Screen-07','Screen-08','Screen-09','Screen-10',
      'Screen-11','Screen-12','Screen-13','Screen-14','Screen-15','Screen-16','Screen-17','Screen-18','Screen-19','Screen-20','Screen-21',
      'Screen-22','Screen-23','Screen-24','Screen-25','Screen-26','Screen-27','Screen-28','Screen-29','Screen-30','Screen-31','Screen-32',
      'Screen-33','Screen-34','Screen-35','Screen-36','Screen-37']
      
     // multi get keys & map to access data
     
      const result = await AsyncStorage.multiGet(keys);
    //  JSON.parse to convert sting to object(Screen-Wise)
      const response= result.map(req => JSON.parse(req[1]))
      setFormDATA(response)
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };


  //const URL='https://pmis.tdea.pk/actions/process/op_app_data.php';


  {
    /*
    const URL=`http://openparliament.pk/op_app/insert_form_new.php`

const HandleSubmit=async()=>{
    try {
      const resp =await axios.request({
        method: 'POST',
        url: `http://openparliament.pk/op_app/insert_form_new.php`,
        headers: {
          'accept': 'application/json',
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
          'Content-Length' : FormDATA.length
        },
        data: {form_data:FormDATA.toString()}
      })
      console.log(resp.data)
      
    } catch (error) {
      console.log(error)
    }
  }



   var Array=[];
  Array.push(FormDATA)

     */
  }


  const HandleSubmit=async()=>{
    try {
      FormDATA.push({submit_date:submit_date})
      const resp =await axios.request({
        method: 'POST',
        url: `http://openparliament.pk/op_app/insert_form_new.php`,
        headers: {
          'content-type': 'application/json',
        },
        data: FormDATA
       
      })
      console.log(resp.data)
      
    } catch (error) {
      console.log(error)
    }
  }




{/*-------------------------------------------States----------------------------------------- */}


    const [show1,setShow1]=useState(true);
    const [selected1, setSelected1] = useState(false);

{/*---------------------------------------- Main Code----------------------------------------- */}

  return (
        <View style={styles.container}>
<View style={{backgroundColor:"#48C9B0",height:58,justifyContent:"center",paddingRight:33}}>
<View style={{alignItems:"flex-end"}}>
          <TouchableOpacity style={styles.CustomBtn} onPress={()=>navigation.navigate('1 of 37')}>
             <Text style={styles.iconHome}>➔</Text>
             <Text style={styles.CustomBtnText}>Home</Text>
          </TouchableOpacity> 
</View>

        </View>

{/*----------------------------------------  Show Submit BTn when No-Item-To Upload----------------------------------------- */} 

{ show1? 
    <View>
          {
  selected1 ? 
  <View style={styles.TextInputView1}>  
  <Text style={styles.Text}>Data submitted sucessfully!</Text>           
  <Pressable   
  onPress={()=>{
    HandleSubmit()
  }}
  style={{
  height:60,
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F2F3F4",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",backgroundColor: selected1 ? "#fff" : "#48C9B0"}}>
      {({ pressed }) => (
      <Text style={{fontFamily:"Montserrat-Medium", paddingHorizontal:20,color:selected1 ? null : "#fff" }}>
        {pressed ? 'SAVED!' : 'SAVED!' }
      </Text>
     )}
  
  </Pressable>
  
  </View>:
  <View style={styles.TextInputView1}>  
  <Text style={styles.Text}>Please submit your data!</Text>              
  <Pressable   
  onPressIn={()=>setSelected1(true)}
  style={{
  height:60,
  borderRadius:15,
  elevation:5,
  borderWidth:0.45,
  borderColor:"#F2F3F4",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",backgroundColor: selected1 ? "#fff" : "#48C9B0"}}>
  
      {({ pressed }) => (
      <Text style={{fontFamily:"Montserrat-Medium", paddingHorizontal:20,color:selected1 ? null : "#fff" }}>
        {pressed ? 'SUBMIT' : 'SUBMIT' }
      </Text>
     )}
  
  </Pressable>
  
  </View>
  
}
    </View> : null
}
               
<TouchableOpacity onPress={()=>navigation.navigate('37 of 37')} style={styles.backBtn}>
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
    marginBottom:10,
    fontFamily:"Montserrat-Bold",
    fontSize:17,
  },
  TextScreen:{
    marginBottom:10,
    fontFamily:"Montserrat-Medium",
    fontSize:15,
    color:"#fff"
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
    fontSize:16,
  },
  RadioBTnView:{
    paddingLeft:33,
    paddingRight:33,
  },
  TextInputView:{
    paddingLeft:33,
    paddingRight:33,
  },
  TextInputView1:{
    paddingLeft:33,
    paddingRight:33,

  },
   UploadBtn:{
    backgroundColor:"#48C9B0",
    height:60,
    borderRadius:15,
    elevation:5,
    borderWidth:0.45,
    borderColor:"#F2F3F4",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  UploadBtnText:{
    fontFamily:"Montserrat-Medium",
    fontSize:14,
    color:"#fff",
    paddingHorizontal:5
  },
  forwardBtn:{
    backgroundColor:"#48C9B0",
    height:70,
    width:70,
    position:"absolute",
    bottom:5,
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
  backBtnHome:{
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
iconHome:{
  color:"#fff",
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
  modalBtn1:{
    position:"absolute",
    right:90,
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
    color:"#fff",
  },
  UploadIcon:{
    height:35,
    width:35,
},
RNLabelText:{
  fontFamily:"Montserrat-Regular",
  fontSize:14,
},
CustomBtn:{
  backgroundColor:"#48C9B0",
  borderRadius:7,
  elevation:5,
  borderWidth:1,
  borderColor:"#F2F3F4",
  color:"#fff",
  paddingHorizontal:10,
  justifyContent:"center",
  flexDirection:"row",
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