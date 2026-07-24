import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, Entypo, Foundation } from "@expo/vector-icons";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import QueueManager from "../manager/QueueManager";
import Header from "../component/layout/Header";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function HomeScreen() {
  const [, refresh] = useState(0);

  useEffect(() => QueueManager.subscribe(() => refresh((v) => v + 1)), []);

  const track = QueueManager.getCurrentTrack();
  const progress = QueueManager.getProgress();
  const isPlaying = QueueManager.getIsPlaying();
  const loopMode = QueueManager.getLoopMode();
  const shuffle = QueueManager.getShuffle();

  const pct = track ? (progress / track.duration) * 100 : 0;

  const [barWidth, setBarWidth] = useState(0);

  function handleSeek(e) {
    if (!track) return;
    const x = e.nativeEvent.locationX;
    const ratio = x / barWidth;
    QueueManager.seekTo(Math.floor(ratio * track.duration));
  }

  if (!track) {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.empty}>No tracks in queue</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={styles.cover}>
          <Ionicons name="musical-note" size={80} color={colors.textSecondary} />
        </View>

        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.artist}>{track.artist}</Text>

        <View style={styles.progressSection}>
          <View
            style={styles.progressHitbox}
            onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={handleSeek}
            onResponderMove={handleSeek}
          >
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${pct}%` }]} />
            </View>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.time}>{formatTime(progress)}</Text>
            <Text style={styles.time}>{formatTime(track.duration)}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <Pressable onPress={() => QueueManager.toggleShuffle()}>
            <Ionicons name="shuffle" size={24} color={shuffle ? colors.primary : colors.textMuted} />
          </Pressable>
          <Pressable onPress={() => QueueManager.previous()}>
            <Entypo name="controller-jump-to-start" size={28} color={colors.textMuted} />
          </Pressable>
          <Pressable onPress={() => QueueManager.togglePlay()} style={styles.playButton}>
            <Foundation name={isPlaying ? "pause" : "play"} size={32} color={colors.text} />
          </Pressable>
          <Pressable onPress={() => QueueManager.next()}>
            <Entypo name="controller-next" size={28} color={colors.textMuted} />
          </Pressable>
          <Pressable onPress={() => QueueManager.cycleLoop()}>
            <View style={styles.iconWrap}>
              <Ionicons name="repeat" size={24} color={loopMode !== "off" ? colors.primary : colors.textMuted} />
              {loopMode !== "off" && <Text style={styles.badge}>{loopMode === "once" ? "1" : "∞"}</Text>}
            </View>
          </Pressable>
        </View>
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: -100,
  },
  empty: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  cover: {
    width: 200,
    height: 200,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 22,
    textAlign: "center",
  },
  artist: {
    color: colors.textSecondary,
    fontFamily: fonts.medium,
    fontSize: 16,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 30,
  },
  progressSection: {
    width: "100%",
    marginBottom: 40,
  },
  progressHitbox: {
    height: 40,
    justifyContent: "center",
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  time: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    bottom: -2,
    right: -8,
    fontSize: 11,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
});
