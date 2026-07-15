import { Howl } from 'howler';

type TrackName = 'piano' | 'violin' | 'heartbeat' | 'hopeful';

class MusicManagerService {
  private tracks: Map<TrackName, Howl> = new Map();
  private currentTrack: TrackName | null = null;
  private isMuted: boolean = false;

  public init() {
    // Only load these if not already loaded
    if (this.tracks.size > 0) return;

    this.tracks.set('piano', new Howl({ src: ['/music/piano.mp3'], loop: true, volume: 0 }));
    this.tracks.set('violin', new Howl({ src: ['/music/violin.mp3'], loop: true, volume: 0 }));
    this.tracks.set('heartbeat', new Howl({ src: ['/sounds/heartbeat.mp3'], loop: true, volume: 0 }));
    this.tracks.set('hopeful', new Howl({ src: ['/music/hopeful.mp3'], loop: true, volume: 0 }));
  }

  public playTrack(name: TrackName, fadeDuration: number = 2000) {
    if (this.isMuted) return;
    if (this.currentTrack === name) return;

    // Fade out current track
    if (this.currentTrack) {
      const prevTrack = this.tracks.get(this.currentTrack);
      if (prevTrack) {
        prevTrack.fade(prevTrack.volume(), 0, fadeDuration);
        setTimeout(() => prevTrack.pause(), fadeDuration);
      }
    }

    // Play and fade in new track
    const newTrack = this.tracks.get(name);
    if (newTrack) {
      newTrack.play();
      newTrack.fade(0, 0.5, fadeDuration); // Target volume 0.5
      this.currentTrack = name;
    }
  }

  public playSoundEffect(src: string, volume = 0.7) {
    if (this.isMuted) return;
    const sfx = new Howl({ src: [src], volume });
    sfx.play();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      Howler.mute(true);
    } else {
      Howler.mute(false);
    }
  }
}

export const MusicManager = new MusicManagerService();
