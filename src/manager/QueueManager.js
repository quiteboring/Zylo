import mockQueue from "../mockData";

class QueueManager {

  constructor() {
    this.queue = [...mockQueue];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.progress = 0;
    this.loopMode = "off"; // "off", "once", "all"
    this.shuffle = false;
    this._loopOnceUsed = false;
    this.listeners = [];
    this._interval = null;
  }

  getCurrentTrack() {
    return this.queue[this.currentIndex] || null;
  }

  getProgress() {
    return this.progress;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getLoopMode() {
    return this.loopMode;
  }

  getShuffle() {
    return this.shuffle;
  }

  cycleLoop() {
    const modes = ["off", "once", "all"];
    const idx = modes.indexOf(this.loopMode);
    this.loopMode = modes[(idx + 1) % modes.length];
    this.notify();
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
    this.notify();
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this._startTick();
    this.notify();
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this._stopTick();
    this.notify();
  }

  togglePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  next() {
    if (this.shuffle) {
      const remaining = this.queue.filter((_, i) => i !== this.currentIndex);
      if (remaining.length > 0) {
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        this.currentIndex = this.queue.indexOf(pick);
      }
    } else if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.progress = 0;
    this._loopOnceUsed = false;
    if (this.isPlaying) this._startTick();
    this.notify();
  }

  previous() {
    if (this.progress > 0) {
      this.progress = 0;
      this.notify();
      return;
    }
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.queue.length - 1;
    }
    this.progress = 0;
    this._loopOnceUsed = false;
    if (this.isPlaying) this._startTick();
    this.notify();
  }

  seekTo(seconds) {
    const track = this.getCurrentTrack();
    if (!track) return;
    this.progress = Math.max(0, Math.min(seconds, track.duration));
    if (this.isPlaying) this._startTick();
    this.notify();
  }

  _startTick() {
    this._stopTick();
    this._interval = setInterval(() => {
      const track = this.getCurrentTrack();
      if (!track) return;
      if (this.progress >= track.duration) {
        if (this.loopMode === "once" && !this._loopOnceUsed) {
          this.progress = 0;
          this._loopOnceUsed = true;
          this.notify();
          return;
        }
        if (this.loopMode === "off") {
          this.isPlaying = false;
          this._stopTick();
          this.notify();
          return;
        }
        this.next();
        return;
      }
      this.progress++;
      this.notify();
    }, 1000);
  }

  _stopTick() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

}

export default new QueueManager();
