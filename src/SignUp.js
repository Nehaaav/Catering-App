import {View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Field from './Field';
import Btn from './Btn';
import Background from './Background';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from './Provider/AuthProvider';
import auth from '@react-native-firebase/auth';

const SignUp = (props) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    // const {register} = useContext(AuthContext);

    const handleSignUp = async() =>{
        try{
            if(email == '' && password==''){
                console.error("Enter email and password");
            }else if(email == ''){
                console.error("Enter email");
            }else if(password == ''){
                console.error("Enter password");
            }else if(confirmPassword == ''){
                console.error("Please confirm the password");
            }else if(confirmPassword != password){
                console.error("Confirm password doesn't match the password. Please re enter");
                setConfirmPassword('');
                setPassword('');
            }else{
                const isUserCreated = await auth().createUserWithEmailAndPassword(email,password);
                console.log(isUserCreated);
                Alert.alert("SignUp done successfully");
                props.navigation.navigate("Login")

            }
        }catch(error){
            console.error(error);
        }
    }

    // const [showErrors,setShowErrors] = useState(false);
    // const [errors,setErrors] = useState({});

    // const getErrors = (username,password,confirmPassword) => {
    //     const errors = {};
    //     if(!username){
    //         errors.username ="Please enter the username";
    //     }
    //     return errors;
    // };

    // const handleRegister = () =>{
    //     const errors = getErrors(username,password,confirmPassword);    
    //     if(Object.keys(errors).length>0){
    //         setShowErrors(true)
    //         setErrors(showErrors && errors)
    //         console.log(errors);
    //     }
    //     else{
    //         console.log('Registered');
    //     }
    // }


    return(
        <SafeAreaView>
            <View>
                <Text style={{fontSize:40,fontWeight:400,color:'#3D3D3D',marginTop:125,marginHorizontal:28}}>ಸೈನ್ ಅಪ್</Text>
                <Field placeHolder={'ಇಮೇಲ್'} marginTxtField={42} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={360} ht={58} val={email} setVal={val => setEmail(val)}></Field>
                <Field placeHolder={'ಗುಪ್ತಪದ'} secureEntry={true} marginTxtField={20} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={360} ht={58} val={password} setVal={val => setPassword(val)}></Field>
                <Field placeHolder={'ಪಾಸ್ವರ್ಡ್ ದೃಢೀಕರಿಸಿ'} secureEntry={true} marginTxtField={20} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={360} ht={58} val={confirmPassword} setVal={val => setConfirmPassword(val)}></Field>
                {/* <View style={{flexDirection:'row'}}>
                    <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"Sign in"} btnwidth={132} btnHeight={61} txtmargin={11} btnmargin={18}/>
                    <View style={{alignItems:'flex-end',marginTop:60,marginLeft:90}}>
                        <Text style={{color:'rgba(61, 61, 61, 1)',fontWeight:'bold',fontSize:16}}>
                            Forgot password?
                        </Text>
                    </View>
                </View> */}
                <Background img={require('./assets/food7.jpg')} backgroundImgHeight={'70%'} imgOpacity={0.2}>
                    <LinearGradient colors={['#f2f2f2', '#ffffff00']} style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} />
                    <View style={{flexDirection:'row',marginBottom:110,marginRight:20}}>
                    <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"ಸೈನ್ ಅಪ್ "} btnwidth={132} btnHeight={61} txtmargin={11} btnMarginleft={18} btnMarginRight={225} BtnMgTop={40} Press={() => handleSignUp()}/>
                    {/* <View style={{alignItems:'flex-end',marginTop:60,marginLeft:90}}>
                        <Text style={{color:'rgba(61, 61, 61, 1)',fontWeight:'bold',fontSize:16}}>
                            Forgot password?
                        </Text>
                    </View> */}
                </View>
                <View style={{justifyContent:'center',flexDirection:'row',marginTop:70}}>
                <Text>ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರ? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                        <Text style={{color:'#A0002C',fontWeight:'bold'}}>ಲಾಗಿನ್</Text>
                    </TouchableOpacity>
                </View>    
                </Background>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default SignUp;