import {View, StyleSheet, Text,ScrollView } from 'react-native'
import React from 'react'
import { SelectList} from 'react-native-dropdown-select-list';
import Btn from './Btn';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cart = (props) => {
    const [selected, setSelected] = React.useState("");
    const [choose, setChoose] = React.useState("");

    const data = [
        {key:'1',value:'Mon'},
        {key:'2',value:'Tue'},
        {key:'3',value:'Wed'},
        {key:'4',value:'Thur'},
        {key:'5',value:'Fri'},
        {key:'6',value:'Sat'},
        {key:'7',value:'Sun'},
    ];

    return(
        <SafeAreaView>
        <ScrollView style={{marginTop:80,marginHorizontal:20}}>
            <SelectList data={data} setSelected={setSelected } placeholder='ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ' boxStyles={{width:200}} inputStyles={{color:'black'}} dropdownTextStyles={{color:'black'}} />
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
                <Text style={{fontSize:25,backgroundColor:'rgb(217, 217, 217)',padding:10,color:'rgb(71, 71, 72)'}}>ಉಪಹಾರ</Text>
                <Text style={{fontSize:25,backgroundColor:'rgb(217, 217, 217)',padding:10,color:'rgb(71, 71, 72)'}}>10</Text>
                <Btn bgColor={'rgba(0, 160, 116, 1)'} textColor={'#FEF6E1'} btnLabel={"Cart"} btnwidth={80} btnHeight={50} txtmargin={7} btnMarginleft={18} Press={() => props.navigation.navigate("#")}/>
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
                <Text style={{fontSize:25,backgroundColor:'rgb(217, 217, 217)',paddingVertical:10,paddingHorizontal:30,color:'rgb(71, 71, 72)'}}>ಊಟ</Text>
                <Text style={{fontSize:25,backgroundColor:'rgb(217, 217, 217)',padding:10,color:'rgb(71, 71, 72)',}}>10</Text>
                <Btn bgColor={'rgba(0, 160, 116, 1)'} textColor={'#FEF6E1'} btnLabel={"Cart"} btnwidth={80} btnHeight={50} txtmargin={7} btnMarginleft={18} Press={() => props.navigation.navigate("#")}/>
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
                <Text style={{fontSize:25,backgroundColor:'rgb(217, 217, 217)',paddingVertical:10,paddingHorizontal:24,color:'rgb(71, 71, 72)'}}>ತಿಂಡಿಗಳು</Text>
                <Text style={{fontSize:25,backgroundColor:'rgb(217, 217, 217)',padding:10,color:'rgb(71, 71, 72)'}}>10</Text>
                <Btn bgColor={'rgba(0, 160, 116, 1)'} textColor={'#FEF6E1'} btnLabel={"Cart"} btnwidth={80} btnHeight={50} txtmargin={7} btnMarginleft={18} Press={() => props.navigation.navigate("#")}/>
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
                <Text style={{fontSize:25,backgroundColor:'rgb(217, 217, 217)',paddingVertical:10,paddingHorizontal:30,color:'rgb(71, 71, 72)'}}>Dinner</Text>
                <Text style={{fontSize:25,backgroundColor:'rgb(217, 217, 217)',padding:10,color:'rgb(71, 71, 72)'}}>10</Text>
                <Btn bgColor={'rgba(0, 160, 116, 1)'} textColor={'#FEF6E1'} btnLabel={"Cart"} btnwidth={80} btnHeight={50} txtmargin={7} btnMarginleft={18} Press={() => props.navigation.navigate("#")}/>
            </View>
            <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"ಚೆಕ್ಔಟ್"} btnwidth={350} btnHeight={60} txtmargin={11}  BtnMgTop={80} Press={() => props.navigation.navigate("Checkout")}/>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Cart;