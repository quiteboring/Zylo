import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import QueueManager from "../manager/QueueManager";
import ScreenManager from "../manager/ScreenManager";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Player() {
  const [, refresh] = useState(0);

  useEffect(() => QueueManager.subscribe(() => refresh((v) => v + 1)), []);

  const track = QueueManager.getCurrentTrack();
  const progress = QueueManager.getProgress();
  const pct = track ? (progress / track.duration) * 100 : 0;

  if (!track) return null;

  const [barWidth, setBarWidth] = useState(0);

  function handleSeek(e) {
    const x = e.nativeEvent.locationX;
    const ratio = x / barWidth;
    QueueManager.seekTo(Math.floor(ratio * track.duration));
  }

  return (
    <View style={styles.player}>
      <Pressable onPress={() => ScreenManager.setScreen("Home")}>
      <View style={styles.content}>
        <View style={styles.cover}>
          <Ionicons name="musical-note" size={22} color={colors.textMuted} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{track.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
        </View>
        <Text style={styles.time}>{formatTime(progress)}</Text>
      </View>
      </Pressable>
      <Pressable
        style={styles.progressTrack}
        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
        onPress={handleSeek}
      >
        <View style={[styles.progressFill, { width: `${pct}%` }]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    bottom: 90,
    left: 10,
    right: 10,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cover: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  artist: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 1,
  },
  time: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginLeft: 8,
  },
  progressTrack: {
    height: 2,
    backgroundColor: colors.border,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
});
