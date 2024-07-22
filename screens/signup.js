/* 
----------------- Feeder - Sign Up ------------------
This is the sign up screen. It is the screen that the user
sees when they want to create a new account.
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
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
// import { auth } from "../services/firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { Snackbar, Button } from "react-native-paper";
// import LoadingOverlay from "../components/loadingOverlay";
// import { useAuth } from "../contextProviders/authContext";

// Import assets
import logoIcon from "../assets/logo/logo_icon.png";


export default function SignUp({ navigation }) {
  const { width } = Dimensions.get("window");

  // State for name, email and password
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [isLoading, setLoading] = useState(false);

//   const { apiUrl } = useAuth();

  // Snack bar state
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Placeholder message");
  const onDismissSnackBar = () => setSnackBarVisible(!snackBarVisible);

  useEffect(() => {
    // Trigger form validation when task data changes
    validateSignupData();
  }, [email, password, name]);

  const validateSignupData = () => {
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
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Validate name field
    if (!name) {
      errors.name = "Name is required.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  // Sign up function
  const signUp = () => {
    console.log("signing up");
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
    // Sign up with email and password from Firebase
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     navigation.navigate("Find Friends", { signUpFlow: true });
    //     // Send post request to backend
    //     // this stores the user in the neo4j, firestore and realtime databases
    //     const user_id = userCredential.user.uid;
    //     const userData = { name, email, user_id };
    //     fetch(`${apiUrl}/api/create-user`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-API-Key": process.env.EXPO_PUBLIC_CREATE_API_KEY,
    //       },
    //       body: JSON.stringify(userData),
    //     });
    //   })
    //   .catch((error) => {
    //     isLoading(false);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     setSnackBarVisible(true);
    //     setSnackbarMessage("Failed to sign up.", errorMessage);
    //     console.log(errorMessage);
    //   });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <SafeAreaView style={{ alignItems: "center" }}>
          <View style={styles.logoContainer}>
            <Image
              source={logoIcon}
              style={{ width: width * 0.75, flex: 1, resizeMode: "contain" }}
              alt='Feeder logo icon'
            />
          </View>
          <View style={[styles.ctaContainer, { width: width * 0.8 }]}>
            <Text style={[styles.ctaText, { fontSize: width * 0.055 }]}>
              Feeling pekish?{" "}
            </Text>
            <Text style={[styles.ctaText, { fontSize: width * 0.15 }]}>
              Sign Up{" "}
            </Text>
            <Text style={[styles.ctaText, { fontSize: width * 0.055 }]}>
              and never be hangry again!{" "}
            </Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode='outlined'
              style={[styles.input, { width: width * 0.8 }]}
              onChangeText={onChangeName}
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              autoCorrect={false}
              value={name}
              placeholder='Username'
              placeholderTextColor='lightgrey'
              autoComplete='username'
            />
            <TextInput
              mode='outlined'
              style={[styles.input, { width: width * 0.8 }]}
              onChangeText={onChangeEmail}
              onSubmitEditing={() => {
                this.thirdTextInput.focus();
              }}
              autoCorrect={false}
              value={email}
              placeholder='Email'
              placeholderTextColor='lightgrey'
              autoComplete='email'
              ref={(input) => {
                this.secondTextInput = input;
              }}
            />
            <TextInput
              style={[styles.input, { width: width * 0.8 }]}
              onChangeText={onChangePassword}
              autoCorrect={false}
              onSubmitEditing={signUp}
              value={password}
              secureTextEntry={true}
              placeholder='Password'
              placeholderTextColor='lightgrey'
              autoComplete='password'
              ref={(input) => {
                this.thirdTextInput = input;
              }}
            />
            <Button
              //   icon='camera'
              mode='elevated'
              onPress={signUp}
              buttonColor='#FEBF00'
              borderColor='#FE8B00'
              textColor='#572F00'
              contentStyle={{ width: width * 0.8, height: 50 }}
              style={{ marginVertical: "5%" }}>
              Sign In
            </Button>
          </View>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaContainer: {
    flex: 2,
    justifyContent: "center",
  },
  ctaText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  formContainer: {
    flex: 3,
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
});
