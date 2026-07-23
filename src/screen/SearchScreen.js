import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Pressable } from "react-native";
import { useState } from "react";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import SearchBar from "../component/SearchBar";
import Header from "../component/layout/Header";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header />

        <View style={styles.body}>
          <Text style={styles.searchTitle}>SEARCH</Text>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchTitle: {
    color: colors.textMuted,
    fontFamily: fonts.medium,
    fontSize: 12,
    marginBlock: 7,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
