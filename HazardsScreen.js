import {useEffect, useState} from 'react';
import {Text, StyleSheet, View, FlatList } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('naturealertdb'); //opening database


export default function Hazards ( {route}) {
  //const {????} = route.params;

const [hazardlist, setHazardlist] = useState([]);


const separator = () => (
    <View style={styles.separator} />
);

//Database initialize
useEffect(() => { initialize() }, []);

const initialize = async () => { 
   
  try {
   
     await updateList();
  } catch (error) {
    console.error('Could not open database', error);
  }
}


  //data for flatlist
  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from hazard ORDER BY dateandtime DESC'); //order by date and time
      setHazardlist(list);    
      console.log(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }   


  /*
const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM hazard WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }


*/

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
         <Text style={styles.text_header} >NatureAlert</Text>
         <Text style={styles.text_title1} >Hazard history</Text>      
      <FlatList
   
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>

            <View style={styles.flatlist} >
               <View style={{ flex: 1 }}>
              <Text style={styles.text}>{item.hazard_desc}</Text>
              <Text style={styles.text}>{item.address}</Text>
              <Text style={styles.text_alt} >{new Date(item.dateandtime).toLocaleString()} </Text>
              </View>    
              <Text style={styles.text}>{item.hazard_type}</Text>  
            </View>
            }
        data={hazardlist}
        ItemSeparatorComponent={separator}
      />          
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
  }
});
