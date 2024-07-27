/* 
------------------ FEEDER - Home -------------------
This is the home screen. It describes what the app does and allows users 
to enter ingedients to search for recipes. 
**/

// Import necessary modules
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Snackbar, Button } from "react-native-paper";
import { useState } from "react";

export default function Home({ navigation }) {
  const { width } = Dimensions.get("window");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    navigation.navigate("SearchResults", { searchQuery });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/logo_icon.png")}
            style={{ width: width * 0.5, flex: 1, resizeMode: "contain" }}
            alt='Feeder logo '
          />
        </View>
        <View style={styles.searchConteiner}>
          <TextInput
            style={[styles.input, { width: width * 0.8 }]}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            onSubmitEditing={handleSearch}
            value={searchQuery}
            placeholder='Enter ingredients'
            placeholderTextColor='lightgrey'
            autoComplete='password'
          />
          <Button
            mode='elevated'
            onPress={() => {
              handleSearch();
            }}
            buttonColor='#FEBF00'
            borderColor='#FE8B00'
            textColor='#572F00'
            contentStyle={{ width: width * 0.8, height: 50 }}
            style={{ marginVertical: "5%" }}>
            Feed Me!
          </Button>
        </View>
        <StatusBar style='auto' />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  searchConteiner: {
    flex: 5,
    alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#828282",
    borderRadius: 8,
  },
});
