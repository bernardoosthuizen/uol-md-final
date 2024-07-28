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
import { Button, Snackbar } from "react-native-paper";
import { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";

export default function Home({ navigation }) {
  // Set component state and constants
  const { width } = Dimensions.get("window");
  const [searchQuery, setSearchQuery] = useState("");

  // Lottie animation reference
  const animationRef = useRef(null);

  // Form validation state
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Snack bar state
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Placeholder message");
  const onDismissSnackBar = () => setSnackBarVisible(!snackBarVisible);

  // Handle search button press
  const handleSearch = () => {
    if (!isFormValid) {
      if (Object.keys(errors).length == 1) {
        const key = Object.keys(errors)[0];
        const errorText = errors[key];
        setSnackBarVisible(true);
        setSnackbarMessage(errorText);
        return;
      } else {
        setSnackBarVisible(true);
        setSnackbarMessage("Please fill out all required fields");
        return;
      }
    }
    navigation.navigate("SearchResults", { searchQuery });
  };

  // Validate search query
  const validateSearchQuery = () => {
    let errors = {};

    if (!searchQuery) {
      // Check if search query is empty
      errors.searchQuery = "Please enter ingredients.";
    } else {
      // Check if search query contains more than one word
      const validateMultipleWords = (query) => {
        return /(\w+[\s,]+\w+)/.test(query);
      };

      if (!validateMultipleWords(searchQuery)) {
        errors.searchQuery =
          "Please enter more than one word, separated by a space or comma.";
      }
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    // Trigger form validation when task data changes
    validateSearchQuery();
  }, [searchQuery]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/logo_icon.png")}
            style={{ width: width * 0.6, flex: 1, resizeMode: "contain" }}
            alt='Feeder logo'
          />
        </View>
        <View style={styles.ctaContainer}>
          <Text
            style={{
              fontSize: width * 0.075,
              color: "#572F00",
              fontWeight: "bold",
              marginBottom: "1%",
            }}>
            Welcome to Feeder!
          </Text>
          <Text
            style={{
              fontSize: width * 0.043,
              color: "#572F00",
              textAlign: "justify",
            }}>
            Feeder is a recipe search app that helps you find recipes based on
            the ingredients you have at home.
          </Text>
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

        <LottieView
          ref={animationRef}
          source={require("../assets/AnimationHomePage.json")}
          autoPlay={true}
          loop={true}
          style={styles.lottie}
          resizeMode='cover'
        />
        <StatusBar style='auto' />
        <Snackbar
          visible={snackBarVisible}
          onDismiss={onDismissSnackBar}
          rippleColor={"#FEBF00"}
          action={{
            label: "Dismiss",
            textColor: "#FEBF00",
          }}>
          <Text style={{ color: "white" }}>{snackbarMessage}</Text>
        </Snackbar>
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
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  ctaContainer: {
    flex: 2,
    justifyContent: "center",
    width: "80%",
  },
  searchConteiner: {
    flex: 6,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#828282",
    borderRadius: 8,
  },
  lottie: {
    position: "absolute",
    top: "60%",
    left: 0,
    right: 0,
    bottom: "-20%",
    zIndex: -1,
    pointerEvents: "none",
  },
});
