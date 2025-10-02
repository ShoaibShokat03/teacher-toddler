import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Settings, Home } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const Header = ({ onSettingsClick, onHomeClick }) => {
  const { isVoiceMode, toggleVoiceMode, childInfo } = useAppStore();

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onHomeClick}
            className="btn btn-secondary btn-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Home size={24} />
          </motion.button>
          
          <div>
            <h1 className="text-2xl font-bold">Toddler Learning</h1>
            {childInfo.name && (
              <p className="text-sm opacity-90">Hello, {childInfo.name}! 👋</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleVoiceMode}
            className={`btn btn-sm ${isVoiceMode ? 'btn-success' : 'btn-secondary'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isVoiceMode ? 'Voice Mode ON' : 'Voice Mode OFF'}
          >
            {isVoiceMode ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.button>

          <motion.button
            onClick={onSettingsClick}
            className="btn btn-secondary btn-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Settings"
          >
            <Settings size={24} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
