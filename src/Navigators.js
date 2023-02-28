import { createStackNavigator } from '@react-navigation/stack';
import CarList from "./CarList";
import Cars from "./CarsForm";
import Dashboard from "./Dashboard";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";


const MainStack = createStackNavigator();
const Stack = createStackNavigator();

export function AuthenticationFlow() {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerTintColor: 'black',
                // cardStyle: {backgroundColor: 'pink'},
            }}>
            <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
            />
        </MainStack.Navigator>


    );
}

export function MainFlow() {
    return (
        <MainStack.Navigator
      initialRouteName="CarList"
            screenOptions={{
                headerShown: true,
                headerTintColor: 'black',
                // cardStyle: {backgroundColor: 'pink'},
            }}>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
            />
            <Stack.Screen
                name="CarList"
                component={CarList}
            />
            <Stack.Screen
                name="CarForm"
                component={Cars}
            />
        </MainStack.Navigator>
    );
}