/* 
------------------ FEEDER - Loading Component -------------------
This is a component that displays a loading spinner when the visible prop is true. 
**/

// Import necessary modules
import { View, ActivityIndicator, StyleSheet } from "react-native";

function LoadingOverlay({ visible }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size='large' color='black' />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    color: "black",
  },
});

export default LoadingOverlay;
