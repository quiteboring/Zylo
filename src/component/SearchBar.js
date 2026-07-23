import { Text, View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={colors.textMuted} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={"Search music..."}
        placeholderTextColor={colors.textMuted}
        returnKeyType="Search"
        keyboardAppearance="dark"
        spellCheck={false}
        autoCorrect={false}
        cursorColor={colors.primary}
        selectionColor={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 14,
    height: 44,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});
