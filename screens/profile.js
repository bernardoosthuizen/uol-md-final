/* 
-------------------- SOCIAL TASKER - Home ---------------------
This is the home screen. It is the screen that the user sees
when they are logged in.
**/

// Import necessary modules
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { Dimensions, Alert } from "react-native";
import { useAuth } from "../contextProviders/authContext";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import LoadingOverlay from "../components/loadingOverlay";
import RecipeList from '../components/recipeList';

export default function Profile() {

  const recipeData = [
    {
      title: "Spaghetti Carbonara",
      ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan Cheese"],
    },
    {
      title: "Spaghetti Carbonara",
      ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan Cheese"],
    },
    {
      title: "Spaghetti Carbonara",
      ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan Cheese"],
    },
  ];

  const { width } = Dimensions.get("window");
  // Auth context
  const { logout, deleteAccount, resetPassword, currentUser } =
    useAuth();
  // User data state
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  // Snack bar state
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Placeholder message");
  const onDismissSnackBar = () => setSnackBarVisible(!snackBarVisible);

  // Logout function
  const handleLogout = async () => {
    try {
      // function from auth context
      await logout();
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
    deleteAccount(password)
      .then(() => {
        console.log("Account deleted successfully", userId);
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
          {currentUser?.displayName}
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
        <RecipeList
          width={width}
          recipeData={recipeData}
          navigation={navigation}
        />
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
      {/* <LoadingOverlay visible={isLoading} /> */}
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
