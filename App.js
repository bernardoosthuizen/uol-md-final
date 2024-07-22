/* 
-------------------- App.js - Navigation ---------------------
This file contains the main navigation logic for the app
**/

// Importing the necessary modules
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";

// Importing the screens
import Home from "./screens/home";
import Login from "./screens/login";
import SignUp from "./screens/signup";

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


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}>
        <Stack.Screen
          name='Signup'
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
