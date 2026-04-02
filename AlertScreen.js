import {useEffect, useState} from 'react';
import {Text, StyleSheet, View } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Map ( {route}) {
  //const {????} = route.params;

  /*
const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM alert WHERE id=?', id);
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
         <Text style={styles.text_title1} >Alert history</Text>      
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
