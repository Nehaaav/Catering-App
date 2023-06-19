import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, StyleSheet,Text,  TextInput } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Card, IconButton, FAB, Appbar, useTheme,Button,Modal } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import DialogInput from 'react-native-dialog-input';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const BOTTOM_APPBAR_HEIGHT = 60;

var arr = [];
const SelectFood = ({route}) => {

  const navigation = useNavigation();

  const { loc, selectedDates } = route.params;

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOK = () => {
    setVisible(false);
  };

  const [selectDate, setSelectDate] = React.useState("");
  
  const [chooseTime, setChooseTime] = React.useState("");
  const [selectItemType, setSelectItemType] = React.useState("");
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const [isModalVisible, setModalVisible] = useState(false);
  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  

  var Time = [
    { key: '1', value: 'Breakfast' },
    { key: '2', value: 'Lunch' },
    { key: '3', value: 'Snacks' },
    { key: '4', value: 'Dinner' },
  ];

  var FoodType = [
    { key: '1', value: 'ಸ್ವೀಟ್ಸ್' },
    { key: '2', value: 'ರಸಾಯನ' },
    { key: '3', value: 'ಪಾಯಸ' },
    { key: '4', value: 'ಕಾಯಿಹುಳಿ' },
  ];

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('menu2')
      .doc(selectItemType)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data().item);
        const res = documentSnapshot.data().item || [];
        console.log("res", res);
        const updatedFoodList = res.map((item, index) => {
          return { ID: index + 1, Name: item };
        });
        setFoodList(updatedFoodList);
      });

    return () => unsubscribe();
  }, [selectItemType]);


  //Orderlist creation start
  console.log('dates',selectedDates);
  const updatedDates= selectedDates.map((item, index) => {
    return { key: (index + 1).toString(), value: item };
  });
  console.log('newDates',updatedDates);
  
  const goToCart = () => {
    navigation.navigate("Cart",{updatedDates})
  };
  
  
  
  const addToCart=(name)=>{
      try {
      const currentUser = auth().currentUser;
  
      if (currentUser) {
        const userId = currentUser.uid;
  
        const parentCollectionRef = firestore().collection('orderDetails');
        const documentRef = parentCollectionRef.doc(userId);
       // await documentRef.set({});
  
        const nestedCollectionRef = documentRef.collection(selectDate);
        const nestedDocRef = nestedCollectionRef.doc('details');
        
  
        const timeCollection = nestedDocRef.collection(chooseTime);
       
         timeCollection.doc('items')
         .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data().name);
        arr = documentSnapshot.data().name || [];
        arr.push(name);
        createDocumentWithNestedCollection();
        
      });
        
       // console.log('arr',arr);
      } 
    } catch (error) {
      console.error('Error creating document and nested collection:', error);
    }
  }


  // addtocart function end


  
  const createDocumentWithNestedCollection = async () => {
    try {
      const currentUser = auth().currentUser;
  
      if (currentUser) {
        const userId = currentUser.uid;
  
        const parentCollectionRef = firestore().collection('orderDetails');
        const documentRef = parentCollectionRef.doc(userId);
        await documentRef.set({});
  
        const nestedCollectionRef = documentRef.collection(selectDate);
        const nestedDocRef = nestedCollectionRef.doc('details');
        await nestedDocRef.set({
          count: '',
          delivery: true,
          location: loc,
          name: '',
          phoneNum: '',
          orderDate: '',
        });
  
        const timeCollection = nestedDocRef.collection(chooseTime);
       
        
       // timePrev = timeCollection;
        
        // const itemDoc = await timeCollection.doc('items').set({
        //   name: arr,
        // });
        
        
        console.log('Document and nested collection created successfully.');
        
        await timeCollection.doc('items').set({
          name: arr,
        });
        console.log('arr',arr);
      } else {
        console.error('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Error creating document and nested collection:', error);
    }
  };

  // orderlist creation end 

  console.log("foodlist", foodList);
  console.log("items",selectItemType)
  

  return (
    <SafeAreaView>
     <View>
        <ScrollView nestedScrollEnabled = {true}>
            <View style={{marginHorizontal:20,marginTop:50,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <SelectList data={updatedDates} setSelected={(val) => setSelectDate(val)} save="value" placeholder='ದಿನಾಂಕ' boxStyles={{width:100}} inputStyles={{color:'black'}} dropdownTextStyles={{color:'black'}} maxHeight={150} onSelect={createDocumentWithNestedCollection}/>
                <SelectList data={Time} setSelected={(val) => setChooseTime(val)} save="value" placeholder='ಸಮಯ' boxStyles={{width:100}} inputStyles={{color:'black'}} dropdownTextStyles={{color:'black'}} maxHeight={150}  defaultOption={{key:'Breakfast',value:'Breakfast'}} onSelect={createDocumentWithNestedCollection}/>
                <SelectList data={FoodType} setSelected={(val) => setSelectItemType(val)} save="value" placeholder='ಆಹಾರದ ಪ್ರಕಾರ' boxStyles={{width:140}} inputStyles={{color:'black'}} dropdownTextStyles={{color:'black'}} maxHeight={150} defaultOption={{key:'ಸ್ವೀಟ್ಸ್',value:'ಸ್ವೀಟ್ಸ್'}}/>
            </View>
            {/* <ScrollView style={{flex:1,marginTop:40}}> */}
                <FlatList
                    data={foodList}
                    style={{flex:1,marginTop:40}}
                    renderItem={({item})=> 
                    <Card style={{margin:5,borderRadius:10,marginHorizontal:20}}>
                        {/* <View style={{flexDirection:'row',flex:1}}> */}
                            {/* <Text style={{flex:1,fontSize:15}}>Name </Text> */}
                            <Card.Title title={item.Name}  right ={(props) => <IconButton {...props} icon={require('./assets/food3.webp')} style={{height:150,width:160}} onPress={() => {}} />} />
                            <FAB icon="plus" style={styles.fab} small color='white' onPress={() => addToCart(item.Name)}/>
                            {/* <Text style={{flex:1,fontSize:15,alignItems:'center'}}>{item.Name}</Text> */}
                            {/* <Card.Cover source={require('D:\myWork\react\foodApp\src\assets\food5.jpg')} resizeMode='contain' style={{height: 150,width:150}}/> */}
                            {/* <Image source={"D:\myWork\react\foodApp\src\assets\food2.jpg"}/> */}
                        {/* </View> */}
                    </Card>
                }
                keyExtractor={item=>item.ID}/>
                <Card style={{margin:5,borderRadius:10,marginHorizontal:20,color:'transparent'}}>
                  <Card.Title style={{height:90,width:160,color:'red'}}/>
                </Card>
                <Modal visible={isModalVisible} onRequestClose={closeModal} style={{height:400,backgroundColor:'white',marginTop:200,marginHorizontal:20,borderRadius:10}}>
                  <Text style={{marginTop:5,marginLeft:130,fontSize:30}}>ಸಂಖ್ಯೆ</Text>
        {/* <View style={{flexDirection:'row',display:'flex'}}> */}
                  <TextInput style={{backgroundColor:'rgb(242, 242, 242)',marginTop:10,marginHorizontal:10,borderRadius:10}} placeholder='Enter Breakfast count'/>
                  <TextInput style={{backgroundColor:'rgb(242, 242, 242)',marginTop:10,marginHorizontal:10,borderRadius:10}} placeholder='Enter Lunch Count'/>
                  <TextInput style={{backgroundColor:'rgb(242, 242, 242)',marginTop:10,marginHorizontal:10,borderRadius:10}} placeholder='Enter Snacks Count'/>
                  <TextInput style={{backgroundColor:'rgb(242, 242, 242)',marginTop:10,marginHorizontal:10,borderRadius:10}} placeholder='Enter Dinner Count'/>
                  <Button style={{marginTop:10}} onPress={closeModal} >Submit</Button>
          {/* </View> */}
                </Modal>
            {/* </ScrollView> */}
        </ScrollView> 
        {/* <FAB icon="add" label='ಮೆನು' style={styles.fabExt} small color='white' onPress={() => console.log('Pressed')}/>  */}
        <Appbar
          style={[
            styles.bottom,
            {
              height: BOTTOM_APPBAR_HEIGHT,
              backgroundColor: theme.colors.elevation.level2,
            },
          ]}
          safeAreaInsets={{ bottom }}
        >
          <Button icon="check"   style={{ borderRadius:10, marginLeft:50}} textColor='rgba(0, 0, 0, 1)'  onPress={openModal}>ಅಂತಿಮಗೊಳಿಸಿ</Button>
          <Button icon="cart" style={{ borderRadius:10, marginLeft:60,}} textColor='rgba(0, 0, 0, 1)' onPress={goToCart}>ಕಾರ್ಟ್</Button>
        </Appbar>
        </View>
      {/* Use foodList array in your component */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius:50,
    width:50,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0, 160, 116, 1)',
    
  },
  fabExt: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 50,
      height:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'rgba(61, 61, 61, 1)',
      color:"white"
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