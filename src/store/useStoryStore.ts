import { create } from 'zustand';

type Act = 'preloader' | 'login' | 'journey' | 'memories' | 'the-question' | 'forever' | 'scrapbook';

interface StoryState {
  currentAct: Act;
  isMusicEnabled: boolean;
  isAnimationsEnabled: boolean;
  areSecretsUnlocked: boolean;
  activeMemoryIndex: number;
  
  // Actions
  setCurrentAct: (act: Act) => void;
  toggleMusic: () => void;
  toggleAnimations: () => void;
  unlockSecrets: () => void;
  setActiveMemoryIndex: (index: number) => void;
  resetStory: () => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  currentAct: 'preloader',
  isMusicEnabled: false,
  isAnimationsEnabled: true,
  areSecretsUnlocked: false,
  activeMemoryIndex: 0,

  setCurrentAct: (act) => set({ currentAct: act }),
  toggleMusic: () => set((state) => ({ isMusicEnabled: !state.isMusicEnabled })),
  toggleAnimations: () => set((state) => ({ isAnimationsEnabled: !state.isAnimationsEnabled })),
  unlockSecrets: () => set({ areSecretsUnlocked: true }),
  setActiveMemoryIndex: (index) => set({ activeMemoryIndex: index }),
  resetStory: () => set({ 
    currentAct: 'preloader', 
    activeMemoryIndex: 0 
  }),
}));
