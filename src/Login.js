import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Field from './Field';
import Btn from './Btn';
import Background from './Background';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const Login = (props) => {

    const[email,setEmail] = React.useState('');
    const[password,setPassword] = React.useState('');

    const onSignInPressed = async() =>{
        try{
            // const isUserLogin = await auth().signInWithEmailAndPassword(email,password);
            // console.log(isUserLogin);
            props.navigation.navigate("MainView")
            // console.log(email,password);
        }catch(error){
            console.log(error);
        }
        // console.warn("SignIn Pressed")
        // props.navigation.navigate("MainView")
    }

    return(
        <SafeAreaView>  
            <View>
                <Text style={{fontSize:40,fontWeight:400,color:'#3D3D3D',marginTop:125,marginHorizontal:28}}>ಸೈನ್ ಇನ್</Text>
                <Field placeHolder={'ಬಳಕೆದಾರ ಹೆಸರು'} marginTxtField={52} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={360} ht={58} val={email} setVal={setEmail}></Field>
                <Field placeHolder={'ಗುಪ್ತಪದ'} secureEntry={true} marginTxtField={30} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={360} ht={58} val={password} setVal={setPassword}></Field>
                {/* <FontAwesome5 name={"eye"} size={25} style={{alignSelf:'center'}}/> */}
                <View style={{flexDirection:'row'}}>
                    <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"ಸೈನ್ ಇನ್"} btnwidth={132} btnHeight={61} txtmargin={11} btnMarginleft={18} BtnMgTop={40} Press={() => onSignInPressed()}/>
                    <View style={{alignItems:'flex-end',marginTop:60,marginLeft:90}}>
                        <Text style={{color:'rgba(61, 61, 61, 1)',fontWeight:'bold',fontSize:16}}>
                            ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?
                        </Text>
                    </View>
                </View>
                <Background img={require('./assets/food7.jpg')} backgroundImgHeight={'65%'} imgOpacity={0.2}>
                    <LinearGradient colors={['#f2f2f2', '#ffffff00']} style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} />
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:30,marginTop:237,marginLeft:107,marginRight:140,}}>
                    <Text>ಖಾತೆ ಇಲ್ಲವೇ? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
                        <Text style={{color:'#A0002C',fontWeight:'bold'}}>ಸೈನ್ ಅಪ್</Text>
                    </TouchableOpacity>
                    </View>
                </Background>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Login;