import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  Card,
  IconButton,
  FAB,
  Appbar,
  useTheme,
  Button,
  Modal,
} from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
// import DialogInput from 'react-native-dialog-input';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const BOTTOM_APPBAR_HEIGHT = 60;

let clr;
const ArrayDates = [];
const SelectFood = ({route}) => {
  const navigation = useNavigation();

  const {loc, selectedDates, todayDate} = route.params;

  const [visible, setVisible] = React.useState(false);
  const [dummyArr, setDummyArr] = React.useState([]);

  const [addBfCount, setAddBfCount] = React.useState('');
  const [addLunchCount, setAddLunchCount] = React.useState('');
  const [addDinnerCount, setAddDinnerCount] = React.useState('');
  const [addSnacksCount, setAddSnacksCount] = React.useState('');

  const [selectDate, setSelectDate] = React.useState('');
  const [dateArr,setDatesArr] = React.useState(); 
  

  const [chooseTime, setChooseTime] = React.useState('');
  const [selectItemType, setSelectItemType] = React.useState('');
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();

  const [isModalVisible, setModalVisible] = useState(false);
  const [clrArray, setArrColor] = useState([]);
  //setArrColor([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    createDocumentWithNestedCollection(dummyArr);
    setModalVisible(false);
  };

  var Time = [
    {key: '1', value: 'ಬ್ರೇಕ್ಫಾಸ್ಟ್'},
    {key: '2', value: 'ಲಂಚ್'},
    {key: '3', value: 'ಸ್ನಾಕ್ಸ್'},
    {key: '4', value: 'ಡಿನ್ನರ್'},
  ];

  var FoodType = [
    {key: '1', value: 'ಸ್ವೀಟ್ಸ್'},
    {key: '2', value: 'ರಸಾಯನ'},
    {key: '3', value: 'ಪಾಯಸ'},
    {key: '4', value: 'ಕಾಯಿಹುಳಿ'},
  ];

  const [foodList, setFoodList] = React.useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('menu2')
      .doc(selectItemType)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data().item);
        const res = documentSnapshot.data().item || [];
        console.log('res', res);
        const updatedFoodList = res.map((item, index) => {
          return {ID: index + 1, Name: item};
        });
        setFoodList(updatedFoodList);
      });

    return () => unsubscribe();
  }, [selectItemType]);
  

  //Orderlist creation start
  console.log('dates', selectedDates);
  const updatedDates = selectedDates.map((item, index) => {
    return {key: (index + 1).toString(), value: item};
  });
  console.log('newDates', updatedDates);

  const goToCart = () => {
    navigation.navigate('Cart', {
      updatedDates,
      addBfCount,
      addDinnerCount,
      addLunchCount,
      addSnacksCount,
    });
  };

  //let arr=[]

  const addToCart = async name => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const parentCollectionRef = firestore().collection('orderDetails');
        const documentRef = parentCollectionRef.doc(userId);
        const nestedCollectionRef = documentRef.collection(selectDate);
        const nestedDocRef = nestedCollectionRef.doc('details');
        const timeCollection = nestedDocRef.collection(chooseTime);

        // Fetch the items array from Firestore
        const documentSnapshot = await timeCollection.doc('items').get();
        var arr = (await documentSnapshot.data().name) || [];
        console.log('arr inside snapshot', arr);

        // Push the new item to the array
        if (!arr.includes(name)) {
          arr.push(name);
        } else {
          Toast.show({
            type: 'error',
            text1: 'ಐಟಂ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ',
            position: 'bottom',
          });
        }
        console.log('arr after push', arr);

        // Update the Firestore document with the updated array
        await createDocumentWithNestedCollection(arr);

        // if(!dummyArr.includes(name)){
        //   clr = 'rgba(0, 160, 116, 1)';
        // }
        // else{
        //   setButtonClr('red');
        // }

        // Alert.alert('ಐಟಂ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ');
        console.log('dummy array in addToCart func', dummyArr);
        console.log('arr after updating Firestore', arr);
        //console.log('clr', clr);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
        position: 'bottom',
      });
    }
  };

  const refreshArr = async () => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const parentCollectionRef = firestore().collection('orderDetails');
        const documentRef = parentCollectionRef.doc(userId);
        const nestedCollectionRef = documentRef.collection(selectDate);
        const nestedDocRef = nestedCollectionRef.doc('details');
        const timeCollection = nestedDocRef.collection(chooseTime);

        // Fetch the items array from Firestore
        const documentSnapshot = await timeCollection.doc('items').get();
        var arr = (await documentSnapshot.data().name) || [];
        console.log('arr inside snapshot', arr);

        // Push the new item to the array
        
        console.log('arr after push', arr);
        await setDummyArr(arr);

        
      }
    } catch (error) {
      console.error("refreshArr function error");
    }
  };

  // addtocart function end
  function btnColor(name) {
    try {
      if (dummyArr.includes(name)) {
        return 'red';
      } else {
        return 'green';
      }
    } catch (error) {
      return 'green';
    }
  }
  function btnIcon(name) {
    try {
      if (dummyArr.includes(name)) {
        return 'minus';
      } else {
        return 'plus';
      }
    } catch (error) {
      return 'plus';
    }
  }
  const createDocumentWithNestedCollection = async arr => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const parentCollectionRef = firestore().collection('orderDetails');
        const documentRef = parentCollectionRef.doc(userId);
        await documentRef.set({
          dates:ArrayDates
        });

        const nestedCollectionRef = documentRef.collection(selectDate);
        const nestedDocRef = nestedCollectionRef.doc('details');
        await nestedDocRef.set({
          bfCount: addBfCount,
          lunchCount: addLunchCount,
          snacksCount: addSnacksCount,
          dinnerCount: addDinnerCount,
          delivery: true,
          location: loc,
          name: '',
          phoneNum: '',
          orderDate: todayDate,
        });

        const timeCollection = nestedDocRef.collection(chooseTime);
        const emptyArray = [];

        // timePrev = timeCollection;

        // const itemDoc = await timeCollection.doc('items').set({
        //   name: arr,
        // });

        console.log('Document and nested collection created successfully.');

        const timeDocSnapshot = await timeCollection.doc('items').get();

        if (timeDocSnapshot.exists) {
          // If the chooseTime collection already exists, update the existing document
          await timeCollection.doc('items').update({
            name: arr,
          });
        } else {
          // If the chooseTime collection doesn't exist, create it and add the document
          await timeCollection.doc('items').set({
            name: emptyArray,
          });
        }
        setDummyArr(arr);
        setFoodList(foodList);
        setArrColor(dummyArr);

        //setButtonClr('green')
        console.log('dummy array inside func', dummyArr);
        console.log('arr', arr);
      } else {
        console.error('ಪ್ರಸ್ತುತ ಯಾವುದೇ ಬಳಕೆದಾರರು ಸೈನ್ ಇನ್ ಆಗಿಲ್ಲ.');
      }
    } catch (error) {
      console.log('Error creating document and nested collection:', error);
    }
  };
  const handleTime = (valuetime)=>{
    setChooseTime(valuetime);
    //datesArr.push(valuetime);
    //setDummyArr([])
   // refreshArr();
    //createDocumentWithNestedCollection
  }
  const handleDate =(valueDate) =>{
    setSelectDate(valueDate);
    ArrayDates.push(valueDate);
    
    
    
    //setDummyArr([]);
    //refreshArr();
    //createDocumentWithNestedCollection
  }
  const deleteItem = (name) => {
    var dltarr = dummyArr;
    console.log("dlt function started")
    //const updatedItems = dummyArr.filter(item => item.id !== itemId);
    const index = dltarr.indexOf(name);
    console.log("index of item",index)
  if (index !== -1) {
    dltarr.splice(index, 1);

  
    
    console.log('arr cart in dlt func',dltarr);
    createDocumentWithNestedCollection(dltarr);
    setDummyArr(dltarr)
  }
  };

  const buttonFunc = (name)=>{
    try {
      console.log("btn func",dummyArr)
      if (dummyArr.includes(name)) {
        console.log("deleteItem in btn func")
        
        return deleteItem(name);
      } else {
        console.log("add cart in btn func")
        return addToCart(name);
      }
    } catch (error) {
      return addToCart(name);
    }
    
  }

  

  // orderlist creation end

  console.log('foodlist', foodList);
  console.log('items', selectItemType);
  console.log('dummy array', dummyArr);

  return (
    <SafeAreaView>
      <View>
        <ScrollView nestedScrollEnabled={true}>
          <View
            style={{
              marginRight: 40,
              marginTop: 50,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 20,
            }}>
            <SelectList
              data={updatedDates}
              setSelected={val => handleDate(val)}
              save="value"
              placeholder="ದಿನಾಂಕ"
              boxStyles={{width: 100}}
              inputStyles={{color: 'black'}}
              dropdownTextStyles={{color: 'black'}}
              maxHeight={150}
              onSelect={value => {

                
                createDocumentWithNestedCollection(value);
                refreshArr();
                 // Call the refreshArr function here
              }}
            />
            <SelectList
              data={Time}
              setSelected={val => handleTime(val)}
              save="value"
              placeholder="ಸಮಯ"
              boxStyles={{width: 100}}
              inputStyles={{color: 'black'}}
              dropdownTextStyles={{color: 'black'}}
              maxHeight={150}
              defaultOption={{key: 'ಬ್ರೇಕ್ಫಾಸ್ಟ್', value: 'ಬ್ರೇಕ್ಫಾಸ್ಟ್'}}
              onSelect={value => {
                createDocumentWithNestedCollection(value);
                refreshArr(); // Call the refreshArr function here
              }}
            />
            <SelectList
              data={FoodType}
              setSelected={val => setSelectItemType(val)}
              save="value"
              placeholder="ಆಹಾರದ ಪ್ರಕಾರ"
              boxStyles={{width: 100}}
              inputStyles={{color: 'black'}}
              dropdownTextStyles={{color: 'black'}}
              maxHeight={150}
              defaultOption={{key: 'ಸ್ವೀಟ್ಸ್', value: 'ಸ್ವೀಟ್ಸ್'}}
            />
          </View>
          {/* <ScrollView style={{flex:1,marginTop:40}}> */}
          <FlatList
            data={foodList}
            style={{flex: 1, marginTop: 40}}
            renderItem={({item}) => (
              <Card
                style={{
                  margin: 5,
                  borderRadius: 10,
                  marginRight: 20,
                  height: 150,
                  width: 330,
                  marginLeft: 20,
                }}>
                {/* <View style={{flexDirection:'row',flex:1}}> */}
                {/* <Text style={{flex:1,fontSize:15}}>Name </Text> */}
                <Card.Title
                  title={item.Name}
                  style={{marginTop: 55}}
                  //  right ={() => <IconButton {...props} icon={require('./assets/food3.webp')} style={{height:150,width:160}} onPress={() => {}} />}
                />
                <FAB
                  icon={btnIcon(item.Name)}
                  style={{
                    position: 'absolute',
                    marginRight: 10,
                    right: 0,
                    bottom: 0,
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: btnColor(item.Name),
                  }}
                  small
                  color="white"
                  onPress={() => buttonFunc(item.Name)}
                />

                {/* <Text style={{flex:1,fontSize:15,alignItems:'center'}}>{item.Name}</Text> */}
                {/* <Card.Cover source={require('D:\myWork\react\foodApp\src\assets\food5.jpg')} resizeMode='contain' style={{height: 150,width:150}}/> */}
                {/* <Image source={"D:\myWork\react\foodApp\src\assets\food2.jpg"}/> */}
                {/* </View> */}
              </Card>
            )}
            keyExtractor={item => item.ID}
          />
          <Card
            style={{
              margin: 5,
              borderRadius: 10,
              marginHorizontal: 20,
              color: 'transparent',
            }}>
            <Card.Title style={{height: 90, width: 160, color: 'red'}} />
          </Card>
          <Modal
            visible={isModalVisible}
            onRequestClose={closeModal}
            style={{
              height: 400,
              backgroundColor: 'white',
              marginTop: 200,
              marginHorizontal: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                marginTop: 5,
                marginLeft: 130,
                fontSize: 30,
                color: 'black',
              }}>
              ಸಂಖ್ಯೆ
            </Text>
            {/* <View style={{flexDirection:'row',display:'flex'}}> */}
            <TextInput
              style={{
                backgroundColor: 'rgb(242, 242, 242)',
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 10,
                color: 'black',
              }}
              placeholderTextColor={'black'}
              placeholder="ಬ್ರೇಕ್ಫಾಸ್ಟ್ ಎಣಿಕೆ ನಮೂದಿಸಿ"
              value={addBfCount}
              onChangeText={val => setAddBfCount(val)}
            />
            <TextInput
              style={{
                backgroundColor: 'rgb(242, 242, 242)',
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 10,
                color: 'black',
              }}
              placeholderTextColor={'black'}
              placeholder="ಲಂಚ್ ಎಣಿಕೆ ನಮೂದಿಸಿ"
              value={addLunchCount}
              onChangeText={val => setAddLunchCount(val)}
            />
            <TextInput
              style={{
                backgroundColor: 'rgb(242, 242, 242)',
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 10,
                color: 'black',
              }}
              placeholderTextColor={'black'}
              placeholder="ಸ್ನಾಕ್ಸ್ ಎಣಿಕೆ ನಮೂದಿಸಿ"
              value={addSnacksCount}
              onChangeText={val => setAddSnacksCount(val)}
            />
            <TextInput
              style={{
                backgroundColor: 'rgb(242, 242, 242)',
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 10,
                color: 'black',
              }}
              placeholderTextColor={'black'}
              placeholder="ಡಿನ್ನರ್ ಎಣಿಕೆ ನಮೂದಿಸಿ"
              value={addDinnerCount}
              onChangeText={val => setAddDinnerCount(val)}
            />
            <Button style={{marginTop: 10}} onPress={closeModal}>
              ಸಲ್ಲಿಸು
            </Button>
            {/* </View> */}
          </Modal>
          {/* </ScrollView> */}
        </ScrollView>
        <Toast />
        {/* <FAB icon="add" label='ಮೆನು' style={styles.fabExt} small color='white' onPress={() => console.log('Pressed')}/>  */}
        {/* <Appbar
          style={[
            styles.bottom,
            {
              height: BOTTOM_APPBAR_HEIGHT,
              backgroundColor: theme.colors.elevation.level2,
            },
          ]}
          safeAreaInsets={{bottom}}>
          <Button
            icon="check"
            style={{borderRadius: 10, marginLeft: 30}}
            textColor="rgba(0, 0, 0, 1)"
            onPress={openModal}>
            ಅಂತಿಮಗೊಳಿಸಿ
          </Button>
          <Button
            icon="cart"
            style={{borderRadius: 10, marginLeft: 60}}
            textColor="rgba(0, 0, 0, 1)"
            onPress={goToCart}>
            ಕಾರ್ಟ್
          </Button>
        </Appbar> */}
      </View>
      <View>
      <Appbar
          style={[
            styles.bottom,
            {
              height: BOTTOM_APPBAR_HEIGHT,
              backgroundColor: theme.colors.elevation.level2,
            },
          ]}
          safeAreaInsets={{bottom}}>
          <Button
            icon="check"
            style={{borderRadius: 10, marginLeft: 30}}
            textColor="rgba(0, 0, 0, 1)"
            onPress={openModal}>
            ಅಂತಿಮಗೊಳಿಸಿ
          </Button>
          <Button
            icon="cart"
            style={{borderRadius: 10, marginLeft: 60}}
            textColor="rgba(0, 0, 0, 1)"
            onPress={goToCart}>
            ಕಾರ್ಟ್
          </Button>
        </Appbar>
        </View>
      {/* Use foodList array in your component */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    // margin: 0,
    marginRight: 10,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 160, 116, 1)',
  },
  fabExt: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(61, 61, 61, 1)',
    color: 'white',
  },
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Styles for your component
});

export default SelectFood;