import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import CarList from './src/CarList';
import Cars from './src/CarsForm';
import Dashboard from './src/Dashboard';
import { AuthenticationFlow, MainFlow } from './src/Navigators';
import SignInScreen from './src/SignInScreen';
import SignUpScreen from './src/SignUpScreen';
import { store } from './src/store/redux';
import { loadUserFromStorage } from './src/store/userSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function App() {


  return (
    <Provider store={store}>
      {/* <GestureHandlerRootView> */}
      <AppBootStrap />
      {/* </GestureHandlerRootView> */}

    </Provider>
  );
}

const AppBootStrap = React.memo(function () {

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  return (
    <NavigationContainer>
      {!userState.isLoggedIn && <AuthenticationFlow />}
      {userState.isLoggedIn && <MainFlow />}
    </NavigationContainer>
  );
});
export default App

{/* <Stack.Navigator>

<Stack.Screen name="SignIn" component={SignInScreen} />
<Stack.Screen name="SignUp" component={SignUpScreen} />
<Stack.Screen name="Dashboard" component={Dashboard} />
<Stack.Screen name="CarForm" component={CarList} />
<Stack.Screen name="Cars" component={Cars} />

</Stack.Navigator> */}