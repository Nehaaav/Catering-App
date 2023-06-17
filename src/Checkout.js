import {View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import Field from './Field';
import Btn from './Btn';
import Dialog from "react-native-dialog";
import { SafeAreaView } from 'react-native-safe-area-context';

const Checkout = (props) => {

    const [checked, setChecked] = React.useState('first');

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
        props.navigation.navigate("MainView")
    };



    return(
        <SafeAreaView>
        <View>
            <Text style={{fontSize:40,fontWeight:400,color:'#3D3D3D',marginTop:85,marginHorizontal:28}}>ಚೆಕ್ಔಟ್</Text>
            <Field placeHolder={'ಹೆಸರು'} marginTxtField={52} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={360} ht={58}></Field>
            <Field placeHolder={'ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ'} marginTxtField={30} bgcolor={'#FFFFFF'} bgradius={10} phTcolor={'rgba(61, 61, 61, 0.5)'} wd={360} ht={58} ></Field>
            <View style={{flexDirection:"row",alignItems:'center',marginTop:80}}>
                <View style={{flex:4,marginLeft:50}}>
                    <Text style={{fontSize:20}}>ಸ್ಥಳದಲ್ಲಿ ಅಡುಗೆ</Text>
                </View>
                <View style={{flex:1,marginRight:30}}>
                    <RadioButton
                        value="first"
                        color='black'
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                    />
                </View>
            </View>
            <View style={{flexDirection:"row",alignItems:'center',marginTop:30}}>
                <View style={{flex:4,marginLeft:50}}>
                    <Text style={{fontSize:20}}>ವಿತರಣೆ</Text>
                </View>
                <View style={{flex:1,marginRight:30}}>
                    <RadioButton
                        style={{}}
                        color='black'
                        value="second"
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                    />
                </View>
            </View>
            <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"ಉದ್ಧರಣವನ್ನು ವಿನಂತಿಸಿ"} btnwidth={350} btnHeight={60} txtmargin={11} btnMarginleft={21}  BtnMgTop={80} Press={showDialog}/>
            <Dialog.Container visible={visible}>
                <Dialog.Title>ಅಭಿನಂದನೆಗಳು</Dialog.Title>
                <Dialog.Description>
                    ಉದ್ಧರಣ ವಿನಂತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!
                </Dialog.Description>
                <Dialog.Button label="ಮುಚ್ಚಿ" onPress={closeDialog} />
      </Dialog.Container>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Checkout;