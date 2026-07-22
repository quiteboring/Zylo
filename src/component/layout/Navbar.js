import { StyleSheet, Text, View, Pressable } from "react-native";
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";
import ScreenManager from "../../manager/ScreenManager";

export default function Navbar({ screens, active, onChange }) {
  return (
    <View style={styles.navbar}>
      {screens.map((screen) => {
        const { component: Icon, name } = ScreenManager.getIcon(screen);

        return (
          <Pressable key={screen} style={styles.button} onPress={() => onChange(screen)}>
            <Icon name={name} size={20} style={styles.icon} color={active === screen ? colors.primary : colors.textMuted}/>
            <Text style={[styles.text, active === screen && styles.activeText]}>
              {screen}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: colors.surface,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 18,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: 3,
  },
  text: {
    fontSize: 10,
    color: colors.textMuted,
    fontFamily: fonts.medium,
  },
  activeText: {
    color: colors.primary,
  },
});
