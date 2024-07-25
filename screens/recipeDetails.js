import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-paper";

export default function RecipeDetails() {
    const {width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/image-Thumbnail.png")}
          style={{ width: "100%", height: "25%", resizeMode: "cover" }}
        />
        <ScrollView style={{ width: "100%" }}>
          <Text style={{ fontSize: 20, padding: "5%" }}>
            Spaghetti Carbonara
          </Text>
          <Text style={{ fontSize: 16, padding: "5%" }}>
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </Text>
          <Text
            style={{
              fontSize: 16,
              padding: "5%",
              fontWeight: "bold",
              paddingBottom: "2%",
            }}>
            Ingredients:
          </Text>
          <Text style={{ fontSize: 16, padding: "5%", paddingVertical: "1%" }}>
            - Spaghetti
          </Text>
          <Text style={{ fontSize: 16, padding: "5%", paddingVertical: "1%" }}>
            - Spaghetti
          </Text>
          <Text style={{ fontSize: 16, padding: "5%", paddingVertical: "1%" }}>
            - Spaghetti
          </Text>
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
            Instructions: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              //   icon='camera'
              mode='text'
              onPress={() => console.log("Pressed")}
              textColor='#572F00'
              contentStyle={{
                width: width * 0.9,
                height: 50,
                borderWidth: 2,
                borderRadius: 20,
                borderColor: "#FE8B00",
              }}
              style={{ marginVertical: "5%" }}>
              Add to favourites
            </Button>
          </View>
        </ScrollView>
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
