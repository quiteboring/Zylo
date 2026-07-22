import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },

  text: {
    color: colors.text,
    fontSize: 24,
  },
});
