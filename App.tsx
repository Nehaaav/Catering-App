// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Login from './src/Login';
import SignUp from './src/SignUp';
import MainView from './src/mainView.js';
import SelectFood from './src/SelectFood';
import Cart from './src/Cart';
import Checkout from './src/Checkout';
import auth from '@react-native-firebase/auth';
import { AuthContext, AuthProvider } from './src/Provider/AuthProvider';


const Stack = createNativeStackNavigator();

function App() {

  // const {user,setUser} = React.useContext(AuthContext);
  // const [initializing,setInitializing] = React.useState(true);

  // // Handle user state changes
  // function onAuthStateChanged(){
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // React.useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if(initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainView" component={MainView} />
        <Stack.Screen name="SelectFood" component={SelectFood} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;