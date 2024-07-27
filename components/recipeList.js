/* 
------------------ FEEDER - Recipe List Component -------------------
This is a component that displays a list of recipes passed to it. It is used in the SearchResults 
and Profile screens. 
**/

// Import necessary modules
import {
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  View,
  Text,
} from "react-native";
import { Cell, TableView } from "react-native-tableview-simple";

// Custom cell component to display the recipe items
const CustomVariant = (props) => (
  <Cell
    {...props}
    cellContentView={
      <Pressable
        onPress={() =>
          props.navigation.navigate("RecipeDetails", {
            recipeId: props.recipeId,
          })
        }
        style={{
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          paddingVertical: "5%",
          borderBottomColor: "#FEBF00",
          borderBottomWidth: 1,
        }}>
        <Image
          source={{ uri: props.imgSource }}
          style={{
            height: props.profile ? 50 : 80,
            width: 60,
            borderRadius: 10,
            resizeMode: "cover",
            marginRight: 10,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            width: props.width * 0.75,
          }}>
          <Text
            allowFontScaling
            numberOfLines={2}
            style={{
              flex: 1,
              fontSize: props.width * 0.05,
              marginBottom: "3%",
              width: "100%",
            }}>
            {props.title}
          </Text>
          <Text
            numberOfLines={3}
            ellipsizeMode='tail'
            style={{
              flex: 1,
              fontSize: props.width * 0.035,
              color: "grey",
              width: "95%",
            }}>
            {props.description}
          </Text>
        </View>
      </Pressable>
    }
  />
);

export default function RecipeList({ recipeData, width, navigation, profile }) {
  // remove the first element of the array, its and ad
  const cleanedData = profile ? recipeData : recipeData.slice(1);

  if (!profile) {
    // make ingredients a string list
    cleanedData.forEach((recipe) => {
      const allIngredients = [
        ...recipe.missedIngredients,
        ...recipe.usedIngredients,
      ];
      recipe.ingredients = allIngredients
        .map((ingredient) => ingredient.original)
        .join(", ");
    });
  } else {
    cleanedData.forEach((recipe) => {
      recipe.ingredients = recipe?.ingredients.join(", ");
    });
  }

  return (
    <TableView style={styles.resultsContainer}>
      <ScrollView>
        {cleanedData.map((recipe, index) => (
          <CustomVariant
            title={recipe.title}
            description={recipe.ingredients}
            imgSource={recipe.image}
            recipeId={recipe.id}
            width={width}
            key={index}
            navigation={navigation}
            profile={profile}
          />
        ))}
      </ScrollView>
    </TableView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  resultsContainer: {
    flex: 9,
    width: "100%",
    padding: 0,
    justifyContent: "flex-start",
  },
});
