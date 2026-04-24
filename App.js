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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';

import DashboardScreen from './DashboardScreen'
import SubmitNewHazard from './SubmitNewHazard'
import HazardScreen from './HazardsScreen'
import ShowPhoto from "./ShowPhoto";


const NatureAlert = () => {  

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Dashboard') {
      iconName = 'alert-circle';
      } else if (route.name === 'New hazard') {
      iconName = 'add-circle';
      }
      else if (route.name === 'List hazards') {
      iconName = 'list-circle';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
      },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="New hazard" component={SubmitNewHazard} options={{ headerShown: false }} />
        <Tab.Screen name="List hazards" component={HazardScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}


  return (
    <SafeAreaProvider>    
      <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShowPhoto"
          component={ShowPhoto}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
        </NavigationContainer>      
    </SafeAreaProvider>
  );
};

export default NatureAlert;