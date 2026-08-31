// 8-Bit Web Audio API Sound Synthesizer
// Generates authentic chiptune SFX in real-time

class SoundEffectManager {
  private audioCtx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public toggleMute(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playBeep(440, 0.1);
    }
    return this.enabled;
  }

  // Generic tone generator
  private playTone(
    freq: number,
    type: OscillatorType,
    duration: number,
    gainValue = 0.1,
    rampFreq?: number
  ) {
    if (!this.enabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      if (rampFreq !== undefined) {
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(rampFreq, 20),
          ctx.currentTime + duration
        );
      }

      gain.gain.setValueAtTime(gainValue, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Retro button click / hover sound
  public playClick() {
    this.playTone(587.33, "square", 0.05, 0.06); // D5
  }

  public playHover() {
    this.playTone(880, "square", 0.03, 0.03); // A5
  }

  // Classic 8-bit Coin Collection Sound (Mario style B5 -> E6 chime)
  public playCoin() {
    if (!this.enabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.setValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio fallback
    }
  }

  // Retro Jump Sound (Mario spring sweep)
  public playJump() {
    this.playTone(150, "square", 0.18, 0.08, 650);
  }

  // Stomp enemy crunch
  public playStomp() {
    if (!this.enabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  // Hit block bump / thud
  public playBlockBump() {
    this.playTone(180, "triangle", 0.08, 0.1, 90);
  }

  // Powerup / Question block reveal
  public playPowerup() {
    if (!this.enabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    const notes = [330, 392, 659, 523, 587, 784];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "square", 0.07, 0.06);
      }, idx * 60);
    });
  }

  // Level Up / Quest Complete Jingle
  public playLevelUp() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "square", 0.12, 0.08);
      }, idx * 100);
    });
  }

  // Mario Flagpole Victory Fanfare
  public playVictory() {
    if (!this.enabled) return;
    const melody = [
      { f: 523, d: 0.1 },  // C5
      { f: 659, d: 0.1 },  // E5
      { f: 784, d: 0.1 },  // G5
      { f: 1046, d: 0.2 }, // C6
      { f: 880, d: 0.15 }, // A5
      { f: 1046, d: 0.35 } // C6
    ];
    let delay = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, "square", note.d, 0.09);
      }, delay);
      delay += note.d * 1000 + 50;
    });
  }

  // Classic 8-bit Mario Death Jingle
  public playDeath() {
    if (!this.enabled) return;
    const deathTones = [
      { f: 587, d: 0.12 }, // D5
      { f: 554, d: 0.12 }, // C#5
      { f: 523, d: 0.14 }, // C5
      { f: 392, d: 0.2 },  // G4
      { f: 330, d: 0.2 },  // E4
      { f: 220, d: 0.4 }   // A3
    ];
    let delay = 0;
    deathTones.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, "triangle", note.d, 0.1);
      }, delay);
      delay += note.d * 1000 + 40;
    });
  }

  // Window Open / Close
  public playWindowOpen() {
    this.playTone(440, "triangle", 0.1, 0.08, 880);
  }

  public playWindowClose() {
    this.playTone(660, "triangle", 0.1, 0.08, 330);
  }

  // Slime bounce
  public playSlimeBounce() {
    this.playTone(300, "sine", 0.15, 0.1, 120);
  }

  // Beep helper
  public playBeep(freq = 440, duration = 0.1) {
    this.playTone(freq, "square", duration, 0.08);
  }
}

export const soundManager = new SoundEffectManager();
