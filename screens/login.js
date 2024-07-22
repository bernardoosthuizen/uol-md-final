/* 
------------------ FEEDER - Login -------------------
This is the login screen. It is displayed on the profile page when
the user is not logged in. 
**/

// Import necessary modules
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { Snackbar, Button } from "react-native-paper";

// Import assets
import logoIconText from "../assets/logo/logo_icon_text.png";

export default function Login({ navigation }) {
    const width = Dimensions.get("window").width;
//   const { isConnected } = useConnectivity();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Snack bar state
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Placeholder message");
  const onDismissSnackBar = () => setSnackBarVisible(!snackBarVisible);

  // State for email and password
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!isConnected) {
//       setSnackBarVisible(true);
//       setSnackbarMessage("No internet connection.");
//     }
//   }, [isConnected]);

  useEffect(() => {
    // Trigger form validation when task data changes
    validateLoginData();
  }, [email, password]);

  const validateLoginData = () => {
    let errors = {};

    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else {
      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      if (!validateEmail(email)) {
        errors.email = "Invalid email address.";
      }
    }

    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  // Sign in function
  const signIn = () => {
    console.log('signing in');
    setLoading(true);
    if (!isFormValid) {
      if (Object.keys(errors).length == 1) {
        const key = Object.keys(errors)[0];
        const errorText = errors[key];
        setLoading(false);
        setSnackBarVisible(true);
        setSnackbarMessage(errorText);
        return;
      } else {
        setLoading(false);
        setSnackBarVisible(true);
        setSnackbarMessage("Please fill out all required fields");
        return;
      }
    }
    // Sign in with email and password from Firebase
    // signInWithEmailAndPassword(auth, email, password).catch((error) => {
    //   setLoading(false);
    //   navigation.navigate("Login");
    //   const errorMessage = error.message;
    //   setSnackBarVisible(true);
    //   if (errorMessage == "Firebase: Error (auth/invalid-email).") {
    //     setSnackbarMessage("Wrong email. ");
    //   } else if (errorMessage == "Firebase: Error (auth/invalid-credential).") {
    //     setSnackbarMessage("Incorrect password.");
    //   } else {
    //     setSnackbarMessage(`Error logging in. ${errorMessage}`);
    //   }
    // });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <SafeAreaView style={{ alignItems: "center" }}>
          <View style={styles.logoContainer}>
            <Image
              source={logoIconText}
              style={{ width: width * 0.5, flex: 1, resizeMode: "contain" }}
              alt='Feeder logo '
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode='outlined'
              style={[styles.input, { width: width * 0.8 }]}
              onChangeText={onChangeEmail}
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              autoCorrect={false}
              value={email}
              placeholder='Email'
              placeholderTextColor='lightgrey'
              autoComplete='email'
            />
            <TextInput
              style={[styles.input, { width: width * 0.8 }]}
              onChangeText={onChangePassword}
              autoCorrect={false}
              onSubmitEditing={signIn}
              value={password}
              secureTextEntry={true}
              placeholder='Password'
              placeholderTextColor='lightgrey'
              autoComplete='password'
              ref={(input) => {
                this.secondTextInput = input;
              }}
            />
            <Button
              //   icon='camera'
              mode='elevated'
              onPress={signIn}
              buttonColor='#FEBF00'
              borderColor='#FE8B00'
              textColor='#572F00'
              contentStyle={{ width: width * 0.8, height: 50}}
              style={{ marginVertical: '5%' }}>
              Sign In
            </Button>
          </View>
          <Text style={{ flex: 1 }}>
            Don't have an account?{" "}
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.navigate("SignUp")}>
              Sign Up here.
            </Text>
          </Text>
          {/* Snackbars - display errors to user */}
          <Snackbar
            visible={snackBarVisible}
            onDismiss={onDismissSnackBar}
            rippleColor={"#4F83A5"}
            action={{
              label: "Dismiss",
              textColor: "#4F83A5",
              onPress: () => {
                // Do something
              },
            }}>
            <Text style={{ color: "white" }}>{snackbarMessage}</Text>
          </Snackbar>

          <StatusBar style='dark-content' />
        </SafeAreaView>
        {/* <LoadingOverlay visible={isLoading} /> */}
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
  formContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
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
