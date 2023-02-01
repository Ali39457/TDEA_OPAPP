import React from 'react';
import { StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../main_screens/HomeScreen';
import SplashScreen from '../main_screens/SplashScreen';
import SessionTypeScreen from '../main_screens/SessionTypeScreen';
import SessionNoScreen from '../main_screens/SessionNoScreen';
import SittingNoScreen from '../main_screens/SittingNoScreen';
import SittingDateScreen from '../main_screens/SittingDateScreen';
import SittingTypeScreen from '../main_screens/SittingTypeScreen';
import SittingTimeScreen from '../main_screens/SittingTimeScreen';
import ProceedingStartTime from '../main_screens/ProceedingStartTime';
import CommencementCountScreen from '../main_screens/CommencementCountScreen';
import AdjournmentCountScreen from '../main_screens/AdjournmentCountScreen';
import ProceedingConcludeTime from '../main_screens/ProceedingConcludeTime';
import ProceedingsHighAttend from '../main_screens/ProceedingsHighAttend';
import MinorityPresentCount from '../main_screens/MinorityPresentCount';
import MemberAttendOAW from '../main_screens/MemberAttendOAW';
import LeaveAppRead from '../main_screens/LeaveAppRead';
import ProceedingsTotalTime from '../main_screens/ProceedingsTotalTime';
import PanelChairPerson from '../main_screens/PanelChairPerson';
import ChairAttendance from '../main_screens/ChairAttendance';
import ProceedingInterrupt from '../main_screens/ProceedingInterrupt';
import ProceedingInterruptCount from '../main_screens/ProceedingInterruptCount';
import KeyMemberAttend from '../main_screens/KeyMemberAttend';
import PartyLeaderMark from '../main_screens/PartyLeaderMark';
import QuestionHourScreen from '../main_screens/QuestionHourScreen';
import QuestionHourScreen2 from '../main_screens/QuestionHourScreen2';
import PrivilegeQuestionsScreen from '../main_screens/PrivilegeQuestionsScreen';
import AdjournmentMotion from '../main_screens/AdjournmentMotion';
import CallingAttentionNotice from '../main_screens/CallingAttentionNotice';
import BillScreen from '../main_screens/BillScreen';
import ResolutionScreen from '../main_screens/ResolutionScreen';
import MotionDiscussedScreen from '../main_screens/MotionDiscussedScreen';
import AmendmentScreen from '../main_screens/AmendmentScreen';
import ReportScreen from '../main_screens/ReportScreen';
import PointOrderScreen from '../main_screens/PointOrderScreen';
import SupplementaryItems from '../main_screens/SupplementaryItems';
import InformationScreen from '../main_screens/InformationScreen';
import UploadDocument from '../main_screens/UploadDocument';
import UploadPicture from '../main_screens/UploadPicture';
import LoginScreen from '../main_screens/LoginScreen';
import SubmitScreen from '../main_screens/SubmitScreen';
import Sample from '../main_screens/Sample';


const Stack = createNativeStackNavigator();


export default function AppNavigator({navigation,route}){

  
   //------------------------------------Main Code------------------------------------------//

   //------------------------------------Index Checking From ------------------------------------------//

  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={styles.header}>
   
  
     <Stack.Screen name="Parliamentary Observation App" component={SplashScreen}  />
     <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerBackVisible:false,headerShown:false}}/>
     <Stack.Screen name="1 of 37" component={HomeScreen} options={{headerBackVisible:false,headerShown:false}}  />
     <Stack.Screen name="2 of 37" component={SessionTypeScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="3 of 37" component={SessionNoScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="4 of 37" component={SittingNoScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="5 of 37" component={SittingDateScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="6 of 37" component={SittingTypeScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="7 of 37" component={SittingTimeScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="8 of 37" component={ProceedingStartTime} options={{headerBackVisible:false}} />
     <Stack.Screen name="9 of 37" component={CommencementCountScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="10 of 37" component={AdjournmentCountScreen} options={{headerBackVisible:false}}  />
     <Stack.Screen name="11 of 37" component={ProceedingConcludeTime} options={{headerBackVisible:false}}  />
     <Stack.Screen name="12 of 37" component={MemberAttendOAW} options={{headerBackVisible:false}}  />
     <Stack.Screen name="13 of 37" component={ProceedingsHighAttend} options={{headerBackVisible:false}}  />
     <Stack.Screen name="14 of 37" component={MinorityPresentCount} options={{headerBackVisible:false}}  />
     <Stack.Screen name="15 of 37" component={LeaveAppRead} options={{headerBackVisible:false}}  />
     <Stack.Screen name="16 of 37" component={ProceedingsTotalTime} options={{headerBackVisible:false}}  />
     <Stack.Screen name="17 of 37" component={PanelChairPerson} options={{headerBackVisible:false}}  />
     <Stack.Screen name="18 of 37" component={ChairAttendance} options={{headerBackVisible:false}}  />
     <Stack.Screen name="19 of 37" component={ProceedingInterrupt} options={{headerBackVisible:false}}  />
     <Stack.Screen name="20 of 37" component={ProceedingInterruptCount} options={{headerBackVisible:false}}/>
     <Stack.Screen name="21 of 37" component={KeyMemberAttend} options={{headerBackVisible:false}}  />
     <Stack.Screen name="22 of 37" component={PartyLeaderMark} options={{headerBackVisible:false}} />
     <Stack.Screen name="23 of 37" component={QuestionHourScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="24 of 37" component={QuestionHourScreen2} options={{headerBackVisible:false}} />
     <Stack.Screen name="25 of 37" component={PrivilegeQuestionsScreen} options={{headerBackVisible:false}} /> 
     <Stack.Screen name="26 of 37" component={AdjournmentMotion} options={{headerBackVisible:false}} />
     <Stack.Screen name="27 of 37" component={CallingAttentionNotice} options={{headerBackVisible:false}} />
     <Stack.Screen name="28 of 37" component={BillScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="29 of 37" component={ResolutionScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="30 of 37" component={MotionDiscussedScreen} options={{headerBackVisible:false}} />
     <Stack.Screen name="31 of 37" component={AmendmentScreen} options={{headerBackVisible:false}}  />
     <Stack.Screen name="32 of 37" component={ReportScreen}  options={{headerBackVisible:false}}   />
     <Stack.Screen name="33 of 37" component={PointOrderScreen}  options={{headerBackVisible:false}}   />
     <Stack.Screen name="34 of 37" component={SupplementaryItems}  options={{headerBackVisible:false}}   />
     <Stack.Screen name="35 of 37" component={InformationScreen}  options={{headerBackVisible:false}}   />
     <Stack.Screen name="36 of 37" component={UploadDocument}  options={{headerBackVisible:false}}   />
     <Stack.Screen name="37 of 37" component={UploadPicture} options={{headerBackVisible:false}}     />
     <Stack.Screen name="SUBMIT" component={SubmitScreen} options={{headerBackVisible:false,headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  header:{
    headerTitleAlign: 'center',
    headerStyle:{backgroundColor:"#48C9B0"},
    headerTitleStyle: {fontFamily:"Montserrat-Medium",color:"#fff"}, 
  },
  AddBtn:{
    backgroundColor:"#48C9B0",
    height:30,
    borderRadius:15,
    elevation:5,
    borderWidth:1,
    borderColor:"#48C9B0",
    color:"#fff",
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

