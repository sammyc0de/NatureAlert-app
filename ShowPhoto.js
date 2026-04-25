//Source for icons https://icons.expo.fyi/Index
//Source for moving between screen https://reactnavigation.org/docs/navigating/
//Source for routes https://reactnavigation.org/docs/params/
//Source for image https://reactnative.dev/docs/image
import React from "react";
import { Image, View, Pressable, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ShowPhoto({ route, navigation }) {
  const { photo_path } = route.params;

  return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
    <Pressable
        onPress={() => navigation.goBack()}
        style={styles.back_button}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
    </Pressable>
    <Image
        source={{ uri: photo_path }}
        style={styles.image}>
    </Image>

    </View>
  );
}

const styles = StyleSheet.create({
  back_button: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8
  },
 image: {
    width: "100%", 
    height: "100%", 
    resizeMode: "contain" 
  }
});
