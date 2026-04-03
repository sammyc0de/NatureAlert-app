import {useEffect, useState} from 'react';
import { Button, TextInput} from 'react-native-paper';
import { StyleSheet, View, FlatList, Text, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('naturealertdb'); //opening database

export default function DashboardScreen ( {navigation}) {

const [hazardlist, setHazardlist] = useState([]);


const separator = () => (
    <View style={styles.separator} />
);

useEffect(() => { initialize() }, []);

const initialize = async () => { 
   
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS hazard (id INTEGER PRIMARY KEY NOT NULL, hazard_type TEXT, hazard_desc TEXT, dateandtime TEXT, address TEXT, weather TEXT, photo_path TEXT );
    `);
     await updateList();
  } catch (error) {
    console.error('Could not open database', error);
  }
}



  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from hazard');
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
     
         <Text style={styles.text_title1} >Most recent hazards</Text> 
    </View>
 
   <FlatList
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) =>            
      <View style={styles.flatlist} >
      
          <Text style={styles.text} >{item.hazard_type}</Text>
        
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
   text_showmap: { //flatlist text
    fontSize: 16,
    color: '#9E9E9E'
  },
  separator: { //erottaja flatlists
    marginTop: 5,
    height: 1,
    backgroundColor: '#c8c5c5',
  }
});

