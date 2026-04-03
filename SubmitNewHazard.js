import {useEffect, useState} from 'react';
import { Button, TextInput} from 'react-native-paper';
import {Text, StyleSheet, View } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('naturealertdb'); //opening database

export default function Map ( {route}) {
  
const [hazard_type, setHazard_type] = useState('');
const [hazard_desc, setHazard_desc] = useState('');
const [dateandtime, setDateandtime] = useState('');
const [address, setAddress] = useState('');
const [weather, setWeather] = useState('');
const [photo_path, setPhoto_path] = useState('');


const saveItem = async () => {
  try {
   await db.runAsync('INSERT INTO hazard (hazard_type, hazard_desc, dateandtime, address, weather, photo_path) VALUES (?,?,?,?,?,?)', hazard_type, hazard_desc, dateandtime, address, weather, photo_path);
    setHazard_type('');
    setHazard_desc('');
    setDateandtime('');
    setAddress('');
    setWeather('');
    setPhoto_path('');
  } catch (error) {
    console.error('Could not add hazard', error);
  }
};

  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}> 
        <View style={styles.container}>
         <Text style={styles.text_header} >NatureAlert</Text>
         <Text style={styles.text_title1} >Submit new hazard</Text>      
          <TextInput
            style={styles.input}
            label="Type"
            onChangeText={hazard_type => setHazard_type(hazard_type)}
            value={hazard_type}/> 
         <TextInput 
            style={styles.input}
            label="Description"
            onChangeText={hazard_desc => setHazard_desc(hazard_desc)}
            value={hazard_desc}/> 
          <TextInput
            style={styles.input}
            label="Date and time"
            onChangeText={dateandtime => setDateandtime(dateandtime)}
            value={dateandtime}/> 
         <TextInput 
            style={styles.input}
            label="Address"
            onChangeText={address => setAddress(address)}
            value={address}/> 
         <TextInput
            style={styles.input}
            label="Weather"
            onChangeText={weather => setWeather(weather)}
            value={weather}/> 
         <TextInput 
            style={styles.input}
            label="Photo"
            onChangeText={photo_path => setPhoto_path(photo_path)}
            value={photo_path}/>        
         

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
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
});
