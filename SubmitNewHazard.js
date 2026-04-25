//Source for DropDownPicker https://github.com/hossein-zare/react-native-dropdown-picker
//Source for DatePicker https://docs.expo.dev/versions/latest/sdk/date-time-picker/
//Source for Geocode https://geocode.maps.co/docs/
//Source for ImagePicker https://docs.expo.dev/versions/latest/sdk/imagepicker/
//Source for Location https://docs.expo.dev/versions/latest/sdk/location/
//Source for SQLite https://haagahelia.github.io/mobilecourse/docs/DataPersistence/sqlite
//Source for Date ISO string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

import React, { useState, useRef } from 'react';
import { Button, TextInput, Text } from 'react-native-paper';
import {StyleSheet, View, Pressable, Image} from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import * as ImagePicker from "expo-image-picker";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('naturealertdb'); //opening database

export default function NewHazard ( {route}) {
  
const [hazard_type, setHazard_type] = useState('');
const [hazard_desc, setHazard_desc] = useState('');
const [dateandtime, setDateandtime] = useState(new Date());
const [address, setAddress] = useState(null);

const [open, setOpen] = useState(false); //dropdown menu
const [show, setShow] = useState(false); //show date time picker

const GEOCODE_API_KEY = process.env.EXPO_PUBLIC_GEOCODE_API_KEY;
const [latitude, setLatitude] = useState(null); 
const [longitude, setLongitude] = useState(null);

const [photo_path, setPhoto_path] = useState(null);

const saveItem = async () => {
    try {
     const dateandtime_iso = dateandtime.toISOString(); // Convert date and time for ISO string format
     await db.runAsync('INSERT INTO hazard (hazard_type, hazard_desc, dateandtime, address, photo_path) VALUES (?,?,?,?,?)', hazard_type, hazard_desc, dateandtime_iso, address, photo_path);
     console.log(hazard_type) 
     setHazard_type('');
     setHazard_desc('');      
     setAddress('');
     setPhoto_path('');
    } catch (error) {
      console.error('Could not add hazard', error);
    }
};

//items for hazard dropdown menu
const [items, setItems] = useState([
  {label: 'Animal', value: 'Animal'},
  {label: 'Fallen trees', value: 'Tree'},
  {label: 'Water', value: 'Water'},
  {label: 'Wildfire', value: 'Wildwire'},
  {label: 'Other', value: 'Other'},
]);


const GetLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = location.coords;
   
    setLatitude(latitude); 
    setLongitude(longitude);  


   const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${GEOCODE_API_KEY}`; 


    fetch(url)
    .then(response => response.json())
    .then(data => {
      //if address does not dounf
      if (data.length === 0) { 
       console.log("Address not found");
       return; 
      }

      //check if house number exist on location

      if (!data.address?.house_number) { 
          const fullAddress = `${data.address?.road}, ${data.address?.city}`;
          setAddress(fullAddress);
      }
      else {
          const fullAddress = `${data.address?.road} ${data.address?.house_number}, ${data.address?.city}`;
          setAddress(fullAddress);
      }

          })
    .catch(error => console.log('error', error));   

  };

  //Selecting photo for hazard
  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto_path(result.assets[0].uri);
    }
  }; 

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}> 
        <View style={styles.container}>
         <Text style={styles.text_header} >NatureAlert</Text>
         <Text style={styles.text_title1} >Submit new hazard</Text> 
         <View
          style={styles.input_dropdown}>
            <DropDownPicker
              open={open}
              value={hazard_type}
              items={items}
              setOpen={setOpen}
              setValue={setHazard_type}
              setItems={setItems}
              placeholder={'Choose hazard'}  
              style={styles.dropdown}
              />
          </View>     

        <DateTimePicker  
          value={dateandtime}
          mode="datetime"
          display="default"
          locale="fi-FI"
          onChange={(event, selected) => {
            setShow(false);
            if (selected) setDateandtime(selected); 
          }}
        />

          <TextInput 
            style={styles.input}
            label="Description"
            onChangeText={hazard_desc => setHazard_desc(hazard_desc)}
            value={hazard_desc}/>  

         <Pressable onPress={GetLocation}>
            <Text style={{ color: 'dodgerblue' }}>Get Location</Text>
        </Pressable>
         <TextInput 
            style={styles.input}
            label="Address"
            onChangeText={address => setAddress(address)}
             editable={false}
            value={address}/>

    <Pressable onPress={pickPhoto}>
            <Text style={{ color: 'dodgerblue', marginBottom:10 }}>Select photo</Text>
        </Pressable> 

        <Image
          source={{ uri: photo_path }}
          style={ styles.image }
        />
  
 <Button mode="contained" onPress={saveItem}  icon="content-save">
        Save
      </Button> 
          </View> 
     
        </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
    text_header: { 
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 16,
    color: "#222",
  },
    text_title1: { 
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#222",
  },
   input: { //input
    width: 300,
    height: 25,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10  
  },
   input_dropdown: { //input dropdown   
    alignItems: 'center',  
    justifyContent: 'center',
    paddingHorizontal: 50
  },
   dropdown: {
    borderWidth: 1,
    height: 60,
    marginBottom: 10
  },
  image: {
    marginBottom: 10,
    marginTop: 10,
    width: 150, 
    height: 150
  }
});
