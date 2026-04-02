import {useEffect, useState} from 'react';
import {Text, StyleSheet, View } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('naturealertdb'); //opening database

export default function Map ( {route}) {
  

const saveItem = async () => {
  try {
   await db.runAsync('INSERT INTO alert (alert_type, alert_description, dateandtime, address, weather, photo_path) VALUES (?,?,?,?,?,?)', alert_type, alert_description, dateandtime, address, weather, photo_path);
    await updateList();
    //Set??
  } catch (error) {
    console.error('Could not add item', error);
  }
};

  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
 
        <View style={styles.container}>
         <Text style={styles.text_header} >NatureAlert</Text>
         <Text style={styles.text_title1} >Submit new alert</Text>      
        <View style={styles.row}>     
          </View>          
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
});
