import React from 'react';
import {View,FlatList,ScrollView,StyleSheet} from 'react-native';
import { SelectList} from 'react-native-dropdown-select-list';
import {Card,IconButton,FAB,Appbar,useTheme, Button} from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DialogInput from 'react-native-dialog-input';
import firestore from '@react-native-firebase/firestore';


const BOTTOM_APPBAR_HEIGHT = 60;


const SelectFood = (props) =>{ 
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => {
      setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    const handleOK= () => {
      // The user has pressed the "Delete" button, so here you can do your own logic.
      // ...Your logic
      setVisible(false);
    };

    const [selected, setSelected] = React.useState("");
    const [choose, setChoose] = React.useState("");
    const [selectItemType,setSelectItemType] = React.useState("");
    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();
  

    var date = [
        {key:'1',value:'Mon'},
        {key:'2',value:'Tue'},
        {key:'3',value:'Wed'},
        {key:'4',value:'Thur'},
        {key:'5',value:'Fri'},
        {key:'6',value:'Sat'},
        {key:'7',value:'Sun'},
    ];

    var Time = [
        {key:'1',value:'Breakfast'},
        {key:'2',value:'Lunch'},
        {key:'3',value:'Snacks'},
        {key:'4',value:'Dinner'},
    ];

    var FoodType = [
        {key:'1',value:'ಸ್ವೀಟ್ಸ್'},
        {key:'2',value:'ರಸಾಯನ'},
        {key:'3',value:'ಪಾಯಸ'},
        {key:'4',value:'ಕಾಯಿಹುಳಿ'},
    ];

    var FoodList = [];
        // {ID:1,Name:'ಐಟಂ 1'},
        // {ID:2,Name:'ಐಟಂ 2'},
        // {ID:3,Name:'ಐಟಂ 3'},
        // {ID:4,Name:'ಐಟಂ 4'},
        // {ID:5,Name:'ಐಟಂ 5'}
    // ];

    // get items for card start
    var res = [];

    firestore()
    .collection('menu2')
    .doc(selectItemType)
    .onSnapshot(documentSnapshot => {
      // for(i=0;i<documentSnapshot.data().item[id];i++){
        console.log('User data: ', documentSnapshot.data().item);
        res.push(documentSnapshot.data().item)
        console.log("res",res);
        // console.log("selected",selectItemType)
        var FoodList = res[0].map((item, index) => {
          return { ID: index + 1, Name: item };
        });
        
        
        // while(i=0){
        //   for(j = 0;j(res.length+1);j++){
        //     FoodList.push("ID:"+j+","+"Name:"+res[i][j]);
        //     console.log("foodList",FoodList);
        //   } 
        // } 
      // }
    });

    console.log(FoodList);

    

    // console.log(res);
  //   .then(
  //     console.log()
  // //     querySnapshot => {
  // //     querySnapshot.forEach(documentSnapshot => {
  // //     console.log(documentSnapshot.data());
  // //     // FoodList.push(documentSnapshot.data());
  // //   });
  // // }
  // ).then(testing => {
  //   console.log("new array pushed is ", FoodList);
  // });

  // get items for card end

    return(
      <SafeAreaView>
        <View>
        <ScrollView nestedScrollEnabled = {true}>
            <View style={{marginHorizontal:20,marginTop:50,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <SelectList data={date} setSelected={setSelected } placeholder='ದಿನಾಂಕ' boxStyles={{width:100}} inputStyles={{color:'black'}} dropdownTextStyles={{color:'black'}} maxHeight={150}/>
                <SelectList data={Time} setSelected={setChoose } placeholder='ಸಮಯ' boxStyles={{width:100}} inputStyles={{color:'black'}} dropdownTextStyles={{color:'black'}} maxHeight={150}/>
                <SelectList data={FoodType} setSelected={(val) => setSelectItemType(val)} save="value" placeholder='ಆಹಾರದ ಪ್ರಕಾರ' boxStyles={{width:140}} inputStyles={{color:'black'}} dropdownTextStyles={{color:'black'}} maxHeight={150} defaultOption={{key:'1',value:'ಸ್ವೀಟ್ಸ್'}}/>
            </View>
            {/* <ScrollView style={{flex:1,marginTop:40}}> */}
                <FlatList
                    data={FoodList}
                    style={{flex:1,marginTop:40}}
                    renderItem={({item})=> 
                    <Card style={{margin:5,borderRadius:10,marginHorizontal:20}}>
                        {/* <View style={{flexDirection:'row',flex:1}}> */}
                            {/* <Text style={{flex:1,fontSize:15}}>Name </Text> */}
                            <Card.Title title={item.Name}  right ={(props) => <IconButton {...props} icon={require('./assets/food3.webp')} style={{height:150,width:160}} onPress={() => {}} />} />
                            <FAB icon="plus" style={styles.fab} small color='white' onPress={() => console.log('Pressed')}/>
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
            {/* </ScrollView> */}
        </ScrollView> 
        <FAB icon="add" label='ಮೆನು' style={styles.fabExt} small color='white' onPress={() => console.log('Pressed')}/> 
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
      <Button icon="check"   style={{ borderRadius:10, marginLeft:50}} textColor='rgba(0, 0, 0, 1)'  onPress={showDialog}>ಅಂತಿಮಗೊಳಿಸಿ</Button>
      <DialogInput isDialogVisible={visible}
            title={"ಸಂಖ್ಯೆ"}
            hintInput ={"ಜನರ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ"}
            submitInput={handleOK}
            closeDialog={handleCancel}>
      </DialogInput>
      <Button icon="cart" style={{ borderRadius:10, marginLeft:60,}} textColor='rgba(0, 0, 0, 1)' onPress={() => props.navigation.navigate("Cart")}>ಕಾರ್ಟ್</Button>
    </Appbar> 
             {/* <View style={{flex:1,marginTop:100}}>
        //         <FlatList
        //         data={List}
        //         renderItem={({item})=> 
        //             <Card>
        //                 <View style={{flexDirection:'row',flex:1,padding:10}}>
        //                     <Text>Name</Text>
        //                     <Text>{item.Name}</Text>
        //                 </View>
        //             </Card>
        //         }
        //         keyExtractor={item=>item.ID}/>
        //     </View> */}

        </View>
        </SafeAreaView>
    )
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
      
  })    

export default SelectFood;