import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Library</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  text: {
    color: colors.text,
    fontSize: 24,
  },
});
