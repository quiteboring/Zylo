import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';

export default function App() {
  let [fontsLoaded] = useFonts({ SpaceGrotesk_400Regular });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
});
