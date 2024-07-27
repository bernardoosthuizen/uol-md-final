/* 
-------------------- App.js - Navigation ---------------------
This file contains the main navigation logic for the app
**/

// Importing the necessary modules
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Image, Pressable,Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth, AuthProvider } from "./contextProviders/authContext";
import {
  useConnectivity,
  ConnectivityProvider,
} from "./contextProviders/connectivityContext";
import { Snackbar } from "react-native-paper";
import { useEffect, useState } from 'react';


// Importing the screens
import Home from "./screens/home";
import SearchResults from "./screens/searchResults";
import Login from "./screens/login";
import SignUp from "./screens/signup";
import Profile from "./screens/profile";
import RecipeDetails from "./screens/recipeDetails";

// Importing the assets
import logoText from "./assets/logo/logo_text.png";

// Creating the stack navigator
const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ height: 50, resizeMode: "contain" }}
      source={logoText}
    />
  );
}

function ProfileIcon({ navigation }) {
  return (
    <Pressable style={{width: "50%"}} onPress={()=>(navigation.navigate("ProtectedRoutes"))}>
      <Ionicons name='person-outline' size={28} />
    </Pressable>
  );
}

function ProtectedRoutes() {
  const { currentUser } = useAuth();
  return (
    <Stack.Navigator>
      {currentUser ? (
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}


function MainNavigator() {
  const { isConnected } = useConnectivity();
  const [snackBarVisible, setSnackBarVisible] = useState(!isConnected);

  useEffect(() => {
    setSnackBarVisible(!isConnected);
  }, [isConnected]);

  const onDismissSnackBar = () => setSnackBarVisible(false);

  return (
    <>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={({ navigation }) => ({
          headerRight: () => <ProfileIcon navigation={navigation} />,
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
        })}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='SearchResults' component={SearchResults} />
        <Stack.Screen name='RecipeDetails' component={RecipeDetails} />
        <Stack.Screen name='ProtectedRoutes' component={ProtectedRoutes} />
        <Stack.Screen name='SignUp' component={SignUp} />
      </Stack.Navigator>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: "Dismiss",
          onPress: () => {
            // Do something if needed
          },
        }}>
        <Text style={{ color: "white" }}>No internet connection</Text>
      </Snackbar>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ConnectivityProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='MainNavigator'
              component={MainNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ConnectivityProvider>
    </AuthProvider>
  );
}
