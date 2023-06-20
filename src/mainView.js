import {View, StyleSheet, Text, TouchableOpacity, Keyboard, Alert,TextInput,Modal, Button } from 'react-native'
import React from 'react'
import Background from './Background';
import Btn from './Btn';
import Field from './Field';
import firestore from '@react-native-firebase/firestore';
// import { Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateRangePicker from "rn-select-date-range";
import { useNavigation } from '@react-navigation/native';



const MainView = (props) => {

    const navigation = useNavigation();

    const sendData = firestore().collection('test');
    const [addLoc,setAddLoc] = React.useState('');
    const [addDateFrom,setAddDateFrom] = React.useState('');
    const [addDateTo,setAddDateTo] = React.useState('');

    const [openStartDatePicker,setOpenStartDatePicker] = React.useState(false);
    const [selectedRange, setRange] = React.useState({});

    const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDates, setSelectedDates] = React.useState([]);
  const [textInputValue, setTextInputValue] = React.useState('');

  const handleConfirm = (event, date) => {
    if (date !== undefined) {
      const selectedDate = date.toISOString().split('T')[0];
      if (!selectedDates.includes(selectedDate) && selectedDate !== getTodayDate()) {
        const updatedSelectedDates = [...selectedDates, selectedDate];
        setSelectedDates(updatedSelectedDates);
        setTextInputValue(updatedSelectedDates.join(', '));
      }
    }
    setShowDatePicker(false);
  };

  const handleTextInputPress = () => {
    setShowDatePicker(true);
  };

  
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const todayDate = getTodayDate();

  console.log("todays date",todayDate);

  

    React.useEffect(() => {
        // getDatabase();
      }, []);

    const addField = async() =>{
        try {
            const loc =  await firestore()
            .collection('test')
            .add({
              location:addLoc,
              dateFrom:addDateFrom,
              dateTo:addDateTo,
            })
            .then(() => {
              console.log('User updated!');
            });
            // setMyData(flagVal);
          } catch (err) {
            console.log(err);
            
          }
      
    }

    const btnPressed = () => {
        
        if(addLoc == '' && selectedDates=='' ){
          console.error("ಸ್ಥಳ ಮತ್ತು ದಿನಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ")
        }else if(addLoc == ''){
          console.error("ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ")
        }else if(selectedDates==''){
          console.error("ದಿನಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ")
        }else{
          addField();
          //console.log(selectedDates);
          navigation.navigate('SelectFood', { loc: addLoc , selectedDates,todayDate});
        }
        
        // props.navigation.navigate("SelectFood");
    }

    return(
      <SafeAreaView>
        <View style={{backgroundColor:'black'}}>
        <Background img={require('./assets/food4.webp')} marginLeft backgroundImgHeight={'100%'} imgOpacity={0.35}>
            <Field marginTxtField={220} bgcolor={'rgba(128,128,128,0.5)'} mrgLeft={25} bgradius={10} placeHolder={'ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ'}  phTcolor={'white'} wd={320} ht={58} setVal={(location) => setAddLoc(location)} val={addLoc} clr={'white'}></Field>
            <TouchableOpacity style={{backgroundColor:'rgba(128,128,128,0.5)',marginTop:40,marginLeft:25,width:320,height:58,borderRadius:10}} onPress={handleTextInputPress}>
            <TextInput
              value={textInputValue}
              placeholder="ದಿನಾಂಕಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ"
              editable={false}
              placeholderTextColor={'white'}  
              style={{color:'white',marginLeft:12}}
            />
            </TouchableOpacity>
            <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"ಮುಂದುವರಿಸಿ"} btnwidth={320} btnHeight={60} txtmargin={11} btnMarginleft={28} BtnMgTop={140} Press={() => btnPressed()} />
            <View style={{alignItems:'flex-end',marginTop:20,marginLeft:90}}>
            {/* <TouchableOpacity onPress={() => props.navigation.navigate("SelectFood")}>
                <Text style={{color:'white',fontWeight:'bold'}}>ಐಟಂ ಪಟ್ಟಿಗೆ ತೆರಳಿ</Text>
            </TouchableOpacity> */}
            </View>

            {/* Modal for datepicker */}
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={new Date()}
                minimumDate={new Date()} // Set minimum date to today's date
                onChange={handleConfirm}
              />
            )}
            {/* <Modal visible={isModalVisible} animationType="slide">
              <View>
                <DateTimePicker
                  mode="date"
                  display="calendar"
                  value={new Date()}
                  minimumDate={new Date()} // Set minimum date to today's date
                  onChange={handleConfirm}
                />
                <Button style={{backgroundColor:'white',color:'white'}} title='Confirm'/>
              </View>
            </Modal> */}

            {/* <Modal visible={isDatePickerVisible} animationType="slide" style={{backgroundColor:'white'}}>
              <View>
                <DateTimePickerModal
                  mode="date"
                  display="calendar"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                {/* <Button title="Confirm" onPress={hideDatePicker} /> */}
              {/* </View> */}
            {/* </Modal>  */}
        </Background>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default MainView;