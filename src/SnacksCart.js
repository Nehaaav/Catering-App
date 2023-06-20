import React, { useState,useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SnacksCart = ({route}) => {

//   let cartFormated=[
//     { key: '1', value: 'ಸ್ವೀಟ್ಸ್' },
//     { key: '2', value: 'ರಸಾಯನ' },
//     { key: '3', value: 'ಪಾಯಸ' },
//     { key: '4', value: 'ಕಾಯಿಹುಳಿ' },
//   ];
  const navigation = useNavigation(); 
  const {selected,updatedDates} = route.params;

  useEffect(() => {

    getBfItems();
    
    // console.log("cart Formatted before render",cartFormated);
  }, []);
 
let arrayCart=[];
  const [cartItems, setCartItems] = useState([]
    
    // Add more items as needed
  );

//   console.log("cart Formatted after",cartFormated);

//   getBfItems();

  const deleteItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>ಅಳಿಸಿ</Text>
      </TouchableOpacity>
    </View>
  );

  

  const getBfItems = async () =>{
    try{
        const currentUser = auth().currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
      
            const parentCollectionRef = firestore().collection('orderDetails');
        const documentRef = parentCollectionRef.doc(userId);
        const nestedCollectionRef = documentRef.collection(selected);
        console.log("date",selected);
        const nestedDocRef = nestedCollectionRef.doc('details');
        const timeCollection = nestedDocRef.collection('ಸ್ನಾಕ್ಸ್');
  
        // Fetch the items array from Firestore
        const documentSnapshot = await timeCollection.doc('items').get();
        console.log('doc snapshot',documentSnapshot);
       let  arrayCart = documentSnapshot.data().name || [];
                let cartFormated = arrayCart.map((item, index) => {
                    return { id: index + 1, name: item };
                  });
                  setCartItems(cartFormated)

                  console.log("cartformatted",cartFormated);
                  

            
          } else {
            console.error('ಪ್ರಸ್ತುತ ಯಾವುದೇ ಬಳಕೆದಾರರು ಸೈನ್ ಇನ್ ಆಗಿಲ್ಲ');
          }
    }catch(e){
        console.error(e);
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ಕಾರ್ಟ್</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <TouchableOpacity onPress={() =>navigation.navigate("Cart",{updatedDates,addBfCount,addDinnerCount,addLunchCount,addSnacksCount})}>
        <Text>ಕಾರ್ಟ್ ಗೆ ಹಿಂತಿರುಗಿ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
  },
  deleteButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SnacksCart;