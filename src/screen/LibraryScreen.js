import { View, StyleSheet } from "react-native";
import colors from "../theme/colors";
import Header from "../component/layout/Header";

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.body}>
        {/* content goes here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
