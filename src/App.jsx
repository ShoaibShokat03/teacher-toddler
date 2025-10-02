import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import WelcomeScreen from './components/Onboarding/WelcomeScreen';
import SubjectSelection from './components/SubjectSelection/SubjectSelection';
import LearningInterface from './components/Learning/LearningInterface';
import SettingsModal from './components/Settings/SettingsModal';
import useAppStore from './store/useAppStore';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const { childInfo, resetSession } = useAppStore();

  useEffect(() => {
    // Check if user has completed onboarding
    if (childInfo.name) {
      setCurrentScreen('subjects');
    }
  }, [childInfo.name]);

  const handleOnboardingComplete = () => {
    setCurrentScreen('subjects');
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentScreen('learning');
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setCurrentScreen('subjects');
    resetSession();
  };

  const handleHomeClick = () => {
    setCurrentScreen('subjects');
    setSelectedSubject(null);
    resetSession();
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onComplete={handleOnboardingComplete} />;
      case 'subjects':
        return <SubjectSelection onStartLearning={handleSubjectSelect} />;
      case 'learning':
        return (
          <LearningInterface 
            subject={selectedSubject} 
            onBack={handleBackToSubjects} 
          />
        );
      default:
        return <WelcomeScreen onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="compact-layout bg-primary">
      <AnimatePresence mode="wait">
        {currentScreen !== 'welcome' && (
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Header 
              onSettingsClick={handleSettingsClick}
              onHomeClick={handleHomeClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderCurrentScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence mode="wait">
        {currentScreen !== 'welcome' && (
          <motion.div
            key="footer"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '16px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
