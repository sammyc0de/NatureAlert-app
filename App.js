//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/docs/
//https://reactnavigation.org/docs/getting-started
//https://haagahelia.github.io/mobilecourse/docs/Navigation/reactnavigation
//https://icons.expo.fyi/Index
//npm install react-native-paper, npx expo install expo-sqlite, npx expo install react-native-safe-area-context
//npm install @react-navigation/native, npx expo install react-native-screens react-native-safe-area-context  

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import DashboardScreen from './DashboardScreen'
import AddNewAlertScreen from './AddNewAlertScreen'
import AlertListScreen from './AlertScreen'

const NatureAlert = () => {  

const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>    
      <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                  if (route.name === 'Dashboard') {
                  iconName = 'alert-circle';
                  } else if (route.name === 'New alert') {
                  iconName = 'add-circle';
                  }
                  else if (route.name === 'List alerts') {
                  iconName = 'list-circle';
                  }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'red',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="New alert" component={AddNewAlertScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="List alerts" component={AlertListScreen} options={{ headerShown: false }}/>
         </Tab.Navigator>
     
        </NavigationContainer>      
    </SafeAreaProvider>
  );
};

export default NatureAlert;