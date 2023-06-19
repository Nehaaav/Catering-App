import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const LunchCart = (props) => {

  let cartFormated;
  const navigation = useNavigation(); 
  const selected = route.params;
 
let arrayCart=[];
  const [cartItems, setCartItems] = useState(cartFormated
    
    // Add more items as needed
  );

  getBfItems();

  const deleteItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  

  const getBfItems = () =>{
    try{
        const currentUser = auth().currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
      
            const getItems = firestore().collection('orderDetails').doc(userId).collection(selected).doc('details').collection('Lunch');
            getItems.doc('items')
            .onSnapshot(documentSnapshot => {
            //console.log('User data: ', documentSnapshot.data().name);
                arrayCart = documentSnapshot.data().name || [];
                 cartFormated = res.map((item, index) => {
                    return { ID: index + 1, Name: item };
                  });
                  console.log("cartformatted",cartFormated);
                });
            
          } else {
            console.error('No user is currently signed in.');
          }
    }catch(e){
        console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <TouchableOpacity onPress={() =>navigation.navigate("Cart")}>
        <Text>Back to Cart</Text>
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

export default LunchCart;