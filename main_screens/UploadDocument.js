
import { StyleSheet, Text, View ,TouchableOpacity,Image,Dimensions,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
const HEIGHT=Dimensions.get("window").height;
import FilePickerManager from 'react-native-file-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function UploadDocument({navigation}) {

{/*-------------------------------------------States----------------------------------------- */}

    const data = [{label: 'Yes',}, { label: 'No',onpress:"37 of 37"}];
    const [show,setShow]=useState(false);
    const[UploadDocuments,setUploadDocuments]=useState('');
    const[DocumentTitle,setDocumentTitle]=useState('');
    const[UploadDocData,setUploadDocData]=useState('');

   {/*---------------------------------------- StoreData using AsyncStorage----------------------------------------- */}

   const StoreData=async()=>{
    try {
      var user={
        Documents_Attached:[{
          documentAvailable:UploadDocData,
          uploadDocuments:UploadDocuments,
        }],
        Document_Names:DocumentTitle
      }
     await AsyncStorage.setItem('Screen-36',JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }
  

 {/*---------------------------------------- removeData using AsyncStorage----------------------------------------- */}
  const removeData=async()=>{
    try {
     await AsyncStorage.removeItem('Screen-36')
     navigation.replace('36 of 37')
     console.log("removed")
    } catch (error) {
      console.log(error)
    }
  } 

 {/*---------------------------------------- FileSelect Code----------------------------------------- */}
  const FileSelect=()=>{
        
    FilePickerManager.showFilePicker(null, (response) => {
      
        if (response.didCancel) {
          console.log('User cancelled file picker');
        }
        else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        }
        else {
          setUploadDocuments({
            file: response.uri
          })
          setDocumentTitle(
           response.fileName
          )
        }
      })
        }



{/*---------------------------------------- Main Code----------------------------------------- */}

  return (
        <View style={styles.container}>
 
<Text style={styles.Text}>Do you have documents to upload</Text>

{/*---------------------------------------- RadioButtonRN----------------------------------------- */}

<View style={styles.RadioBTnView}>
<RadioButtonRN
  data={data}
  textStyle={styles.RNLabelText}
  selectedBtn={(item)=>{
      if(item.label==='No')
      {
        setUploadDocData(item.label)
        setShow(false)
      }
      else
        {
          setUploadDocData(item.label)
          setShow(!show)
        }
}}
/>
</View>

{ show? 
    <View>
          <Text style={styles.Text1}>Upload Documents</Text>
          <View style={styles.TextInputView}>
                 <TouchableOpacity onPress={FileSelect} style={styles.UploadBtn}>
                 <Image source={require('../assets/uploadFile.png')} resizeMode="contain" style={styles.UploadIcon} />
                 <Text style={styles.UploadBtnText}>Select Files</Text>
                 </TouchableOpacity>

{
  DocumentTitle.length==0 ? null  : <View style={styles.smallTextView}>
  <Text style={styles.smallText}>{DocumentTitle}</Text>
</View>

}
               
          </View>
    </View> : null
}

{/*---------------------------------------- Save/Clear Buttons----------------------------------------- */}

       <TouchableOpacity style={styles.modalBtn}
         onPress={removeData}>
         <Text style={styles.modalBtnText}>Clear</Text>
       </TouchableOpacity>

{/*---------------------------------------- Handle Buttons----------------------------------------- */}

<TouchableOpacity 
onPress={()=>{if(UploadDocData.length==0)
    {
    Alert.alert('Please enter details in all fields')
    }else if(UploadDocData=='No'){
      StoreData();
      navigation.navigate('37 of 37')
    }else if(UploadDocData=='Yes' && DocumentTitle.length==0){
      Alert.alert('Please upload a document')
    }else{
      StoreData();
      navigation.navigate('37 of 37')
    }
  }} 
 style={styles.forwardBtn}>

 <Text style={styles.icon1}>➤</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={()=>navigation.navigate('35 of 37')} style={styles.backBtn}>
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
    paddingHorizontal:35,
  },
  Text1:{
    marginTop:25,
    marginBottom:10,
    fontFamily:"Montserrat-Medium",
    fontSize:17,
    paddingHorizontal:35,
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
  RadioBTnView:{
    paddingLeft:33,
    paddingRight:33,
  },
  TextInputView:{
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
    height:32,
    width:32,
},
RNLabelText:{
  fontFamily:"Montserrat-Regular",
  fontSize:14,
}
 
 
})