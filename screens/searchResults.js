/* 
------------------ FEEDER - Search Results -------------------
This screen displays the search results. The recipes' title, a short summary and image is displayed
in a list form. 
**/

// Import necessary modules
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";

// Import components
import RecipeList from "../components/recipeList";
import LoadingOverlay from '../components/loadingOverlay';

export default function SearchResults({ navigation, route }) {
  // Set up comonent state and constants
  const { width } = Dimensions.get("window");
  const [recipeData, setRecipeData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // Snack bar state
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Placeholder message");
  const onDismissSnackBar = () => setSnackBarVisible(!snackBarVisible);

  useEffect(() => {
    // fetch recipes based on search query
    // Construct API url
    const cleanedQuery = route.params.searchQuery
      .replace("  ", " ")
      .replace(" ", ",");
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${cleanedQuery}&number=5&ranking=1&ignorePantry=true`;

    // Set up method and headers
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY,
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    // Send request
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setSnackBarVisible(true);
        setSnackbarMessage(error.message);
        return;
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: width * 0.05 }}>Your next meal</Text>
      </View>
      {recipeData.length != 0 ? (
        <RecipeList
          width={width}
          recipeData={recipeData}
          navigation={navigation}
        />
      ) : null}
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
  titleContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
    paddingTop: "10%",
  },
});
