import { StyleSheet, View } from "react-native";
import { useFonts, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium } from "@expo-google-fonts/space-grotesk";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import colors from "./src/theme/colors";
import Navbar from "./src/component/layout/Navbar";
import ScreenManager from "./src/manager/ScreenManager";

export default function App() {
  let [fontsLoaded] = useFonts({ SpaceGrotesk_400Regular, SpaceGrotesk_500Medium });
  const [, refresh] = useState(0);

  useEffect(() => {
    return ScreenManager.subscribe(() => {
      refresh((value) => value + 1);
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const ActiveScreen = ScreenManager.getActiveScreen();

  return (
    <View style={styles.container}>
      <ActiveScreen />

      <Navbar
        screens={ScreenManager.getScreens()}
        active={ScreenManager.getActiveName()}
        onChange={(screen) => ScreenManager.setScreen(screen)}
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
