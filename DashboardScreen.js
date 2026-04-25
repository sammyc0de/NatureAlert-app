//Source for SQLite https://haagahelia.github.io/mobilecourse/docs/DataPersistence/sqlite
//Source for useFocusEffect https://reactnavigation.org/docs/use-focus-effect/?utm_source=copilot.com
import {useEffect, useState, useCallback} from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Button } from "react-native-paper"; 
import { useFocusEffect } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('naturealertdb'); //opening database

export default function DashboardScreen ( {navigation}) {

const [hazardlist, setHazardlist] = useState([]);

//Separator for flatlist
const separator = () => (
    <View style={styles.separator} />
);

//Database initialize and creating new table if it does not exist
useEffect(() => { initialize() }, []);

//Removed weather from database Apr 7th
const initialize = async () => { 
   
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS hazard (id INTEGER PRIMARY KEY NOT NULL, hazard_type TEXT, hazard_desc TEXT, dateandtime REAL, address TEXT, photo_path TEXT );
    `);
     await updateList();
  } catch (error) {
    console.error('Could not open database', error);
  }
  
}

//Run updateList every time when screen is opened
useFocusEffect(
  useCallback(() => {
    updateList();  
  }, [])
);

  //Data for flatlist
  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from hazard ORDER BY dateandtime DESC LIMIT 8'); //last 8 hazards will be show
      setHazardlist(list);    
      console.log(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }   


  return (
  <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.text_header} >NatureAlert</Text>
        
            <Text style={styles.text_title1} >Notification service for nature hazards</Text> 
        </View>
            <Text style={styles.text_title1} >Most recent hazards</Text> 
      <FlatList
   
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>

            <View style={styles.flatlist} >
               <View>
              <Text style={styles.text}>{item.hazard_desc}</Text>
              <Text style={styles.text}>{item.address}</Text>
              <Text style={styles.text_alt} >{new Date(item.dateandtime).toLocaleString()} </Text>
            </View>     
              <Button style={styles.text} onPress={() => navigation.navigate("ShowPhoto", { photo_path: item.photo_path })}>{item.hazard_type}</Button>
            </View>
            
            }
        data={hazardlist}
        ItemSeparatorComponent={separator}
      />   
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
  text_header: { //flatlist text
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
    alignItems: 'center',
  },
  flatlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    flex: 1
  },
  text: { //flatlist text
    fontSize: 16
  },
  text_alt: { //flatlist text
    fontSize: 16,
    color: '#9E9E9E'
  },
  separator: { //erottaja flatlists
    marginTop: 5,
    height: 1,
    backgroundColor: '#c8c5c5',
  },
   showphoto: { 
    fontSize: 16,
    color: '#9E9E9E'
  }
});

