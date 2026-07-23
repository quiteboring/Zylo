import { View, Text, StyleSheet } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";

export default function Header({ children }) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>ZYLO</Text>
      <View style={styles.right}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  text: {
    color: colors.textSecondary,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  right: {
    flexDirection: "row",
    gap: 10,
  },
});
