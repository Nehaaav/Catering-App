import {View, StyleSheet, Text,ScrollView} from 'react-native'
import React from 'react'
import { SelectList} from 'react-native-dropdown-select-list';
import Btn from './Btn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Cart = ({route}) => {

    const navigation = useNavigation(); 

    const updatedDates = route.params;

    console.log('updated dates',updatedDates);

    const [selected, setSelected] = React.useState("");
    const [choose, setChoose] = React.useState("");

    const goToBfCart = () => {
        navigation.navigate("BfCart",{selected})
      };

      const goToLunchCart = () => {
        navigation.navigate("LunchCart",{selected})
      };
      
      const goToDinnerCart = () => {
        navigation.navigate("DinnerCart",{selected})
      };

      const goToSnacksCart = () => {
        navigation.navigate("SnacksCart",{selected})
      };


    return(
        <SafeAreaView>
        <ScrollView style={{marginTop:50,marginHorizontal:20}}>
            <SelectList data={updatedDates} setSelected={setSelected } placeholder='ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ' boxStyles={{width:200}} inputStyles={{color:'black'}} dropdownTextStyles={{color:'black'}} dropdownStyles={{width:200}} />
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:50,backgroundColor:'white',height:100,borderRadius:10}}>
                <Text style={{fontSize:25,padding:10,color:'rgb(71, 71, 72)',marginTop:25}}>ಬ್ರೇಕ್ಫಾಸ್ಟ್</Text>
                <Text style={{fontSize:25,padding:10,color:'rgb(71, 71, 72)',borderWidth:1,borderColor:'black',borderRadius:10,width:50,height:50,marginTop:25}}>10</Text>
                <Btn bgColor={'rgba(0, 160, 116, 1)'} BtnMgTop={25} textColor={'#FEF6E1'} btnLabel={"List"} btnwidth={70} btnHeight={50} txtmargin={7} btnMarginRight={18}  Press={goToBfCart}/>
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:20,backgroundColor:'white',height:100,borderRadius:10}}>
                <Text style={{fontSize:25,padding:10,color:'rgb(71, 71, 72)',marginTop:25}}>ಲಂಚ್</Text>
                <Text style={{fontSize:25,padding:10,color:'rgb(71, 71, 72)',borderWidth:1,borderColor:'black',borderRadius:10,width:50,height:50,marginTop:25,marginLeft:20}}>10</Text>
                <Btn bgColor={'rgba(0, 160, 116, 1)'} BtnMgTop={25} textColor={'#FEF6E1'} btnLabel={"CList"} btnwidth={70} btnHeight={50} txtmargin={7} btnMarginRight={18} Press={goToLunchCart}/>
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:20,backgroundColor:'white',height:100,borderRadius:10}}>
                <Text style={{fontSize:25,padding:10,color:'rgb(71, 71, 72)',marginTop:25}}>ಸ್ನಾಕ್ಸ್</Text>
                <Text style={{fontSize:25,padding:10,color:'rgb(71, 71, 72)',borderWidth:1,borderColor:'black',borderRadius:10,width:50,height:50,marginTop:25,marginLeft:23}}>10</Text>
                <Btn bgColor={'rgba(0, 160, 116, 1)'} BtnMgTop={25} textColor={'#FEF6E1'} btnLabel={"List"} btnwidth={70} btnHeight={50} txtmargin={7} btnMarginRight={18} Press={goToSnacksCart}/>
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:20,backgroundColor:'white',height:100,borderRadius:10}}>
                <Text style={{fontSize:25,padding:10,color:'rgb(71, 71, 72)',marginTop:25}}>ಡಿನ್ನರ್</Text>
                <Text style={{fontSize:25,padding:10,color:'rgb(71, 71, 72)',borderWidth:1,borderColor:'black',borderRadius:10,width:50,height:50,marginTop:25,marginLeft:16}}>10</Text>
                <Btn bgColor={'rgba(0, 160, 116, 1)'} BtnMgTop={25} textColor={'#FEF6E1'} btnLabel={"List"} btnwidth={70} btnHeight={50} txtmargin={7} btnMarginRight={18} Press={goToDinnerCart}/>
            </View>
            <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"ಚೆಕ್ಔಟ್"} btnwidth={350} btnHeight={60} txtmargin={11}  BtnMgTop={50} Press={() =>navigation.navigate("Checkout")}/>
        </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Cart;