import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Image, Pressable, ScrollView} from "react-native";
import { Cell, TableView } from "react-native-tableview-simple";
import RecipeList from '../components/recipeList';


export default function SearchResults({navigation}) {
    const {width} = Dimensions.get('window');

    const recipeData= [
        {
            title: 'Spaghetti Carbonara',
            ingredients: ['Pasta', 'Eggs', 'Bacon', 'Parmesan Cheese'],
        },
        {
            title: 'Spaghetti Carbonara',
            ingredients: ['Pasta', 'Eggs', 'Bacon', 'Parmesan Cheese'],
        },
        {
            title: 'Spaghetti Carbonara',
            ingredients: ['Pasta', 'Eggs', 'Bacon', 'Parmesan Cheese'],
        },
    ]
    return (
        <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={{ fontSize: width * 0.05 }}>Your next meal</Text>
        </View>
        <RecipeList width={width} recipeData={recipeData} navigation={navigation}/>
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
    paddingHorizontal: '5%',
    paddingTop: '10%',
},

});
