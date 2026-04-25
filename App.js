//Testattu ainoastaan iOS-simulaattorilla! Application tested on only iOS-simulator
//Source for React Native https://haagahelia.github.io/mobilecourse/docs/
//Source for Navigation https://reactnavigation.org/docs/getting-started
//Source for Navigationhttps://haagahelia.github.io/mobilecourse/docs/Navigation/reactnavigation
//Source for icons https://icons.expo.fyi/Index

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';

//Screen imports
import DashboardScreen from './DashboardScreen'
import SubmitNewHazard from './SubmitNewHazard'
import HazardScreen from './HazardsScreen'
import ShowPhoto from "./ShowPhoto";


const NatureAlert = () => {  

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


//Only main screens will be shown in the nav. ShowPhoto screen will be excluded from nav. 
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