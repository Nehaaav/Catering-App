import {View, StyleSheet, Text, TouchableOpacity, TextInput,Alert} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Field from './Field';
import Btn from './Btn';
import Background from './Background';
import { Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { getAuth } from "firebase/auth";
import Toast from 'react-native-toast-message';


const Login = (props) => {

    const[email,setEmail] = React.useState('');
    const[password,setPassword] = React.useState('');
    const [isForgotPassword, setIsForgotPassword] = React.useState(false);

    const handleResetPassword = () => {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            Alert.alert('ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಇಮೇಲ್ ಕಳುಹಿಸಲಾಗಿದೆ', 'ಹೆಚ್ಚಿನ ಸೂಚನೆಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ');
            setIsForgotPassword(false); // Reset to login form after sending the reset email
          })
          .catch((error) => {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
                position: 'bottom',
              });
          });
      };
    

    const onSignInPressed = async() =>{
        try{
            if(email=='' && password==''){
                Toast.show({
                    type: 'error',
                    text1: 'ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ',
                    position: 'bottom',
                  });
                // console.error("ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ");
            }else if(email == ''){
                Toast.show({
                    type: 'error',
                    text1: 'ಇಮೇಲ್ ನಮೂದಿಸಿ',
                    position: 'bottom',
                  });
                // console.error("ಇಮೇಲ್ ನಮೂದಿಸಿ");
            }else if(password == ''){
                Toast.show({
                    type: 'error',
                    text1: 'ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ',
                    position: 'bottom',
                  });
                // console.error("ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ");
            }else{
            const isUserLogin = await auth().signInWithEmailAndPassword(email,password);
            console.log(isUserLogin);
            Toast.show({
                type: 'success',
                text1: 'ಸೈನ್ ಇನ್ ಯಶಸ್ವಿಯಾಗಿದೆ',
                position: 'bottom',
              });
            props.navigation.navigate("MainView")
            } 
            // console.log(email,password);
        }catch(error){
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'ಅಮಾನ್ಯವಾದ ಸೈನ್-ಇನ್',
                text2: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ರುಜುವಾತುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
                position: 'bottom',
              });
        }
        // console.warn("SignIn Pressed")
        // props.navigation.navigate("MainView")
    }
 
   // Inside a component or a function





    return(
        <SafeAreaView>
            {isForgotPassword ? (
        <View>
          <TextInput
            style={{backgroundColor:'#FFFFFF',borderRadius:10,marginTop:50,marginHorizontal:10,color:'black'}}
            placeholder="ಇಮೇಲ್ ನಮೂದಿಸಿ"
            placeholderTextColor={'rgba(61, 61, 61, 0.5)'}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Button style={{marginTop:30,marginHorizontal:20,borderRadius:10}}  onPress={handleResetPassword} >ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ</Button>
          <Button style={{marginTop:30,marginHorizontal:10,borderRadius:10}}  onPress={() => setIsForgotPassword(false)} >ಲಾಗಿನ್ ಗೆ ಹಿಂತಿರುಗಿ</Button>
        </View>
      ) : (  
            <View>
                <Text style={{fontSize:40,fontWeight:400,color:'#3D3D3D',marginTop:125,marginHorizontal:28,height:70}}>ಸೈನ್ ಇನ್</Text>
                <Field placeHolder={'ಇಮೇಲ್'} marginTxtField={46} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={340} ht={58} val={email} setVal={setEmail} clr={'black'}></Field>
                <Field placeHolder={'ಗುಪ್ತಪದ'} secureEntry={true} marginTxtField={30} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={340} ht={58} val={password} setVal={setPassword} clr={'black'}></Field>
                {/* <FontAwesome5 name={"eye"} size={25} style={{alignSelf:'center'}}/> */}
                <View style={{flexDirection:'row'}}>
                    <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"ಸೈನ್ ಇನ್"} btnwidth={132} btnHeight={61} txtmargin={11} btnMarginleft={18} BtnMgTop={40} Press={() => onSignInPressed()}/>
                    <View style={{alignItems:'flex-end',marginTop:60,paddingHorizontal:50}}>
                        <TouchableOpacity onPress={()=>setIsForgotPassword(true)}>
                        <Text style={{color:'rgba(61, 61, 61, 1)',fontWeight:'bold',fontSize:16,height:40}}>
                            ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Background img={require('./assets/food7.jpg')} backgroundImgHeight={'70%'} imgOpacity={0.2}>
                    <LinearGradient colors={['#f2f2f2', '#ffffff00']} style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} />
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:30,marginTop:200,marginLeft:107,marginRight:140,}}>
                    <Text style={{height:50}}>ಖಾತೆ ಇಲ್ಲವೇ? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
                        <Text style={{color:'#A0002C',fontWeight:'bold',height:50}}>ಸೈನ್ ಅಪ್</Text>
                    </TouchableOpacity>
                    </View>
                    <Toast />
                </Background>
            </View>
        )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Login;