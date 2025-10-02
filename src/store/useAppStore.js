import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      // User data
      childInfo: {
        name: '',
        age: 3,
        preferredLanguage: 'english',
        learningLevel: 'beginner'
      },
      parentInfo: {
        name: '',
        email: ''
      },
      
      // App state
      currentSubject: null,
      currentLanguage: 'english',
      isVoiceMode: false,
      isLearning: false,
      isTestMode: false,
      
      // AI context
      aiContext: {
        previousLessons: [],
        strengths: [],
        weaknesses: [],
        progress: {}
      },
      
      // Current session
      currentLesson: null,
      currentQuestion: null,
      sessionProgress: 0,
      
      // Actions
      setChildInfo: (info) => set({ childInfo: { ...get().childInfo, ...info } }),
      setParentInfo: (info) => set({ parentInfo: { ...get().parentInfo, ...info } }),
      setCurrentSubject: (subject) => set({ currentSubject: subject }),
      setCurrentLanguage: (language) => set({ currentLanguage: language }),
      toggleVoiceMode: () => set({ isVoiceMode: !get().isVoiceMode }),
      setLearning: (isLearning) => set({ isLearning }),
      setTestMode: (isTestMode) => set({ isTestMode }),
      
      updateAiContext: (context) => set({ 
        aiContext: { ...get().aiContext, ...context } 
      }),
      
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
      setCurrentQuestion: (question) => set({ currentQuestion: question }),
      updateSessionProgress: (progress) => set({ sessionProgress: progress }),
      
      resetSession: () => set({ 
        currentLesson: null, 
        currentQuestion: null, 
        sessionProgress: 0,
        isLearning: false,
        isTestMode: false
      })
    }),
    {
      name: 'toddler-learning-storage',
      partialize: (state) => ({
        childInfo: state.childInfo,
        parentInfo: state.parentInfo,
        aiContext: state.aiContext
      })
    }
  )
);

export default useAppStore;
