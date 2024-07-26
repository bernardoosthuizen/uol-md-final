/* 
------------------ FEEDER - Home -------------------
This is the home screen. It describes what the app does and allows users 
to enter ingedients to search for recipes. 
**/

// Import necessary modules
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Snackbar, Button } from "react-native-paper";

export default function Home() {
  const { width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo/logo_icon.png")}
          style={{ width: width * 0.5, flex: 1, resizeMode: "contain" }}
          alt='Feeder logo '
        />
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
