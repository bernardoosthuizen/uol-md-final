import { StyleSheet, ScrollView, Pressable, Image, View, Text } from "react-native";
import { Cell, TableView } from "react-native-tableview-simple";

const CustomVariant = (props) => (
  <Cell
    {...props}
    cellContentView={
      <Pressable
        onPress={() => props.navigation.navigate("RecipeDetails")}
        style={{
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          paddingVertical: "5%",
          borderBottomColor: "#FEBF00",
          borderBottomWidth: 1,
        }}>
        <Image
          source={require("../assets/image-Thumbnail.png")}
          style={{
            height: 50,
            width: 60,
            borderRadius: 2,
            resizeMode: "cover",
            marginRight: 10,
          }}
        />
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text
            allowFontScaling
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: props.width * 0.05,
              marginBottom: "3%",
            }}>
            {props.title}
          </Text>
          <Text style={{ flex: 1, fontSize: props.width * 0.035, color: "grey" }}>
            {props.description.join(", ")}
          </Text>
        </View>
      </Pressable>
    }
  />
);

export default function RecipeList({recipeData, width, navigation}) {
  return (
    <TableView style={styles.resultsContainer}>
      <ScrollView>
        {recipeData.map((recipe, index) => (
          <CustomVariant
            title={recipe.title}
            description={recipe.ingredients}
            width={width}
            key={index}
            navigation={navigation}
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
