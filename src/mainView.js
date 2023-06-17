import {View, StyleSheet, Text, TouchableOpacity, Keyboard, Alert } from 'react-native'
import React from 'react'
import Background from './Background';
import Btn from './Btn';
import Field from './Field';
import firestore from '@react-native-firebase/firestore';
import { Modal } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateRangePicker from "rn-select-date-range";



const MainView = (props) => {

    const sendData = firestore().collection('test');
    const [addLoc,setAddLoc] = React.useState('');
    const [addDateFrom,setAddDateFrom] = React.useState('');
    const [addDateTo,setAddDateTo] = React.useState('');

    const [openStartDatePicker,setOpenStartDatePicker] = React.useState(false);
    const [selectedRange, setRange] = React.useState({});
   
    // const[state,setState] = React.useState({fromDate:'',toDate:'',dateError:''});
    // const[dateList,setDateList] = React.useState([]);

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
        // if(addData && addData.length > 0){
        //     const data = {
        //         location : addData
        //     };
        //     sendData
        //         .add(data)
        //         .then(() => {
        //             setAddData('');
        //             Keyboard.dismiss();
        //         })
        //         .catch((error) => {
        //             Alert(error);
        //         })
        // } 
    }

    const btnPressed = () => {
        addField();
        props.navigation.navigate("SelectFood");
    }

    // Date range picker start

  state = {
    markedDates: {},
    isStartDatePicked: false,
    isEndDatePicked: false,
    startDate: ''
  }

  onDayPress = (day) => {
      if (this.state.isStartDatePicked == false) {
          let markedDates = {}
          markedDates[day.dateString] = { startingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
          this.setState({
              markedDates: markedDates,
              isStartDatePicked: true,
              isEndDatePicked: false,
              startDate: day.dateString,
          });
      } else {
          let markedDates = this.state.markedDates
          let startDate = moment(this.state.startDate);
          let endDate = moment(day.dateString);
          let range = endDate.diff(startDate, 'days')
          if (range > 0) {
              for (let i = 1; i <= range; i++) {
                  let tempDate = startDate.add(1, 'day');
                  tempDate = moment(tempDate).format('YYYY-MM-DD')
                  if (i < range) {
                      markedDates[tempDate] = { color: '#00B0BF', textColor: '#FFFFFF' };
                  } else {
                      markedDates[tempDate] = { endingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
                  }
              }
              this.setState({
                  markedDates: markedDates,
                  isStartDatePicked: false,
                  isEndDatePicked: true,
                  startDate: ''
              });
          } else {
              alert('Select an upcomming date!');
          }
      }
  }

    // Date Range picker End

    return(
      <SafeAreaView>
        <View style={{backgroundColor:'black'}}>
        <Background img={require('./assets/food4.webp')} backgroundImgHeight={'100%'} imgOpacity={0.35}>
            <Field marginTxtField={220} bgcolor={'rgba(128,128,128,0.5)'} bgradius={10} placeHolder={'ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ'} mrgLeft={12} mrgRight={20} phTcolor={'white'} wd={370} ht={58} setVal={(location) => setAddLoc(location)} val={addLoc} clr={'white'}></Field>
            <TouchableOpacity style={{backgroundColor:'rgba(128,128,128,0.5)',marginTop:40,marginLeft:12,width:370,height:58,borderRadius:10}} onPress={() => setOpenStartDatePicker(true)}>
              <Text style={{color:'white',marginTop:19,marginLeft:10}}>Select the dates</Text>
            </TouchableOpacity>
            {/* <View style={{display:'flex',flexDirection:'row'}}>
            <Field marginTxtField={40} bgcolor={'rgba(128,128,128,0.5)'} bgradius={10} placeHolder={'ದಿನಾಂಕದಿಂದ'} mrgLeft={12} phTcolor={'white'} wd={180} ht={58} setVal={(dateFrom) => setAddDateFrom(dateFrom)} val={addDateFrom} clr={'white'}></Field>
            <Field marginTxtField={40} bgcolor={'rgba(128,128,128,0.5)'} bgradius={10} placeHolder={'ದಿನಾಂಕ ಗೆ'} mrgLeft={12} phTcolor={'white'} wd={180} ht={58} setVal={(dateTo) => setAddDateTo(dateTo)} val={addDateTo} clr={'white'}></Field>
            </View> */}
            <Btn bgColor={'#A0002C'} textColor={'#FEF6E1'} btnLabel={"ಮುಂದುವರಿಸಿ"} btnwidth={350} btnHeight={60} txtmargin={11} btnMarginleft={18} BtnMgTop={140} Press={() => btnPressed()} />
            <View style={{alignItems:'flex-end',marginTop:20,marginLeft:90}}>
            <TouchableOpacity onPress={() => props.navigation.navigate("SelectFood")}>
                <Text style={{color:'white',fontWeight:'bold'}}>ಐಟಂ ಪಟ್ಟಿಗೆ ತೆರಳಿ</Text>
            </TouchableOpacity>
            </View>

            {/* Modal for datepicker */}
            <Modal 
            animationType='slide'
            visible={openStartDatePicker}
            transparent={false}
            style={{backgroundColor:'white',height:500,marginTop:100,borderRadius:20}}
            // onRequestClose={()=>setOpenStartDatePicker(false)}
            >
              {/* <DateRangePicker
                onSuccess ={(start: any ,end: any) => {
                setState({
                  ...state,
                  fromDate:start,
                  toDate:end,
                  dateError:'',
                });
              }}
              dateList = {dateList}
              errorMsg = {state?.dateError}
              /> */}

              <DateRangePicker
                style={{backgroundColor:'white'}}
                onSelectDateRange={(range) => {
                  setRange(range);
                }}
                responseFormat="DD-MM-YYYY"
                minDate={Date()}
              />

              <TouchableOpacity style={{backgroundColor:'black',width:150,marginHorizontal:100,borderRadius:10}} onPress={() => setOpenStartDatePicker(false)}>
                <Text style={{textAlign:'center',fontSize:20,padding:10}}>Close</Text>
              </TouchableOpacity>

              {/* <Calendar
                    minDate={Date()}
                    monthFormat={"MMMM yyyy"}
                    markedDates={this.state.markedDates}
                    markingType="period"
                    hideExtraDays={true}
                    hideDayNames={false}
                    onDayPress={this.onDayPress}
                /> */}

              {/* <Calendar   
                theme={{selectedDayBackgroundColor: 'black',selectedDayTextColor: 'white',}}
                style={{borderRadius:10,elevation:4,margin:40}}
                onDayPress={(date) => console.log(date)}
                markingType={'period'}
                markedDates={{
                  '2023-06-18': {startingDay:true,color:'lightblue',textColor:'black'},
                  '2023-06-20':{endingDay:true,color:'lightblue',textColor:'black'}
                }}
              /> */}
            </Modal>
        </Background>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default MainView;