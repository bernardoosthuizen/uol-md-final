/* 
-------------------- Feeder - Profile ---------------------
This is the profile screen. It displays the user's name, favourite recipes and links to logout, reset password and delete account. If the user is not logged in the login screen is displayed.
**/

// Import necessary modules
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contextProviders/authContext";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

// Import components
import LoadingOverlay from "../components/loadingOverlay";
import RecipeList from '../components/recipeList';

export default function Profile() {
  const { width } = Dimensions.get("window");
  // Auth context
  const { logout, deleteAccount, resetPassword, currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const isVisible = useIsFocused(); // To reload every time the screen is in view
  const [recipeData, setRecipeData] = useState([]);
  const navigation = useNavigation();

  // Snack bar state
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Placeholder message");
  const onDismissSnackBar = () => setSnackBarVisible(!snackBarVisible);

  // Get user favourites
  useEffect(() => {
    if(!currentUser) return;
    // Get user favourites
    // Check local storage first
    AsyncStorage.getItem("favourites").then((value) => {
      if (value?.length > 2) {
        // Favourites found in local storage
        setRecipeData(JSON.parse(value));
        setIsLoading(false);
      } else {
        // Favourites not found in local storage
        // Check firestore for user favourites
        const userId = currentUser?.uid;
        const userRef = doc(db, "users", userId);
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              // User favourites found in firestore
              setIsLoading(false);
              setRecipeData(docSnap.data().favourites);
              // Save to local storage
              AsyncStorage.setItem(
                "favourites",
                JSON.stringify(docSnap.data().favourites)
              );
            } else {
              // User favourites not found in firestore
              setIsLoading(false);
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
            setSnackBarVisible(true);
            setSnackbarMessage("Failed to get user data", error.message);
          });
      }
    });
  }, [isVisible]);

  // Logout function
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // function from auth context
      AsyncStorage.removeItem("favourites")
      .then(() => {
        logout();
      });
    } catch (error) {
      setSnackBarVisible(true);
      setSnackbarMessage("Failed to log out", error);
    }
  };

  // Delete account function
  const handleDeleteAccount = (password) => {
    setIsLoading(true);
    // UserId from context
    const userId = currentUser.uid;
    // function from auth context
    
    AsyncStorage.removeItem("favourites")
      .then(() => {
        deleteAccount(password);
      })
      .catch((error) => {
        console.error("Error during account deletion:", error);
        setSnackBarVisible(true);
        setSnackbarMessage("Failed to delete account", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontSize: width * 0.06,
            fontWeight: "bold",
            color: "#FEBF00",
          }}>
          Welcome {currentUser?.displayName}
        </Text>
      </View>
      <View style={styles.favContainer}>
        <Text
          style={{
            fontSize: width * 0.05,
            fontWeight: "bold",
            marginBottom: "5%",
            textAlign: "center",
          }}>
          Favourites
        </Text>
        {!isLoading && recipeData.length > 0 && (
          <RecipeList
            width={width}
            recipeData={recipeData}
            navigation={navigation}
            profile={true}
          />
        )}
        {!isLoading && recipeData.length == 0 && (
          <Text style={{ textAlign: "center", marginTop: "5%" }}>
            No recipes found
          </Text>
        )}
      </View>
      <View style={styles.linkContainer}>
        <Pressable
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => handleLogout(),
              },
            ]);
          }}>
          <Text style={{ color: "black", textDecorationLine: "underline" }}>
            Logout
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Alert.alert(
              "Are you Sure you want to reset your password?",
              "An email will be sent to your email address with a link to reset your password. Please enter your new password.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "YES",
                  onPress: () => {
                    try {
                      resetPassword();
                    } catch (error) {
                      setSnackBarVisible(true);
                      setSnackbarMessage("Failed to reset password", error);
                    }
                  },
                },
              ],
              "secure-text"
            );
          }}>
          <Text style={{ color: "black", textDecorationLine: "underline" }}>
            Reset Password
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Alert.prompt(
              "Delete Account",
              "Are you sure you want to delete your profile? This action cannot be undone. Please enter your password to confirm.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  style: "destructive",
                  onPress: (password) => handleDeleteAccount(password),
                },
              ],
              "secure-text"
            );
          }}>
          <Text style={{ color: "black", textDecorationLine: "underline" }}>
            Delete Account
          </Text>
        </Pressable>
      </View>
      {/* Snackbars - display errors to user */}
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
      <LoadingOverlay visible={isLoading} />
      <StatusBar style='dark-content' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 2,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "5%",
  },
  favContainer: {
    flex: 10,
    width: "100%",
  },
  linkContainer: {
    flex: 2,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5%",
  },
});
