/* 
------------------ FEEDER - Recipe Details -------------------
This is the screen that displays the details of a recipe. It shows the image, title, summary, ingredients, and instructions of a recipe.
**/

// Import necessary modules
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Linking } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from 'react';
import RenderHTML from "react-native-render-html";
import { useAuth } from "../contextProviders/authContext";
import { Snackbar } from "react-native-paper";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

// Import components
import LoadingOverlay from '../components/loadingOverlay';

export default function RecipeDetails({ route }) {
  // Set up state and constants
  const { width } = Dimensions.get("window");
  const { recipeId } = route.params;
  const [recipeData, setRecipeData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [favBeingAdded, setfavBeingAdded] = useState(false);

  // Snack bar state
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Placeholder message");
  const onDismissSnackBar = () => setSnackBarVisible(!snackBarVisible);

  // Auth context, get current user if any
  const { currentUser } = useAuth();

  // The summary is provided in HTML
  // Render it appropriately
  const summaryToHtml = {
    html: recipeData.summary || "<p>No summary available</p>",
  };
  // Set up styles for the HTML renderer
  const baseStyles = {
    textAlign: "justify",
  };

  useEffect(() => {
    setLoading(true);
    // fetch recipe based on its ID
    // Construct API url
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;

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
  }, [recipeId]);

  handleAddToFavourites = async () => {
    setfavBeingAdded(true);
    // User has to be logged in to add a favourite
    if (!currentUser) {
      alert("Please sign in to add to favourites");
    } else {
      // Add recipe to favourites
      const favourite = {
        title: recipeData.title,
        image: recipeData.image,
        id: recipeData.id,
        ingredients: [],
      };
      // Get ingredients
      recipeData.extendedIngredients.forEach((ingredient) => {
        // Save ingredient to array
        favourite.ingredients.push(ingredient.name);
      });

      // Save to database
      try {
        await updateDoc(doc(db, "users", currentUser.uid), {
          favourites: arrayUnion(favourite),
        });
        setSnackBarVisible(true);
        setSnackbarMessage("Added to favourites");
        setfavBeingAdded(false);
      } catch (error) {
        setSnackBarVisible(true);
        setSnackbarMessage("Failed to add to favourites");
        console.error("Error adding to favourites", error);
      }
    }
  };

  // Clean text with more than one space in between words
  function normalizeSpaces(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: recipeData.image }}
        style={{ width: "100%", height: "25%", resizeMode: "cover" }}
      />
      <ScrollView style={{ width: "100%" }}>
        <Text style={{ fontSize: 20, padding: "5%", fontWeight: "bold" }}>
          {recipeData.title}
        </Text>

        <View style={{ flexDirection: "row", padding: "5%" }}>
          <RenderHTML
            contentWidth={width}
            source={summaryToHtml}
            baseStyles={baseStyles}
          />
        </View>

        <Text
          style={{
            fontSize: 16,
            padding: "5%",
            fontWeight: "bold",
            paddingBottom: "2%",
          }}>
          Ingredients:
        </Text>
        {recipeData.extendedIngredients &&
          recipeData.extendedIngredients.map((ingredient) => (
            <Text
              key={ingredient.id + Math.random()}
              style={{ fontSize: 16, padding: "5%", paddingVertical: "1%" }}>
              - {ingredient.name}
            </Text>
          ))}
        <Text
          style={{
            fontSize: 16,
            padding: "5%",
            paddingTop: "7%",
            paddingBottom: "2%",
            fontWeight: "bold",
          }}>
          Instructions:
        </Text>
        <Text style={{ fontSize: 16, padding: "5%", paddingTop: "2%" }}>
          {recipeData.instructions ? (
            normalizeSpaces(recipeData.instructions)
          ) : (
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL(recipeData.sourceUrl)}>
              Click here.
            </Text>
          )}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            mode='text'
            onPress={() => {
              handleAddToFavourites();
            }}
            textColor='#572F00'
            contentStyle={{
              width: width * 0.9,
              height: 50,
              borderWidth: 2,
              borderRadius: 20,
              borderColor: "#FE8B00",
            }}
            style={{ marginVertical: "5%" }}>
            {favBeingAdded ? `Adding` : `Add to favourites`}
          </Button>
        </View>
      </ScrollView>
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
    paddingVertical: "2%",
    // justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
  },
});
