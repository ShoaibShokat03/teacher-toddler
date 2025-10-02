import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Trophy } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const Footer = () => {
  const { sessionProgress, aiContext } = useAppStore();

  return (
    <motion.footer 
      className="footer"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="text-red-400" size={20} />
              <span className="text-sm">Learning Progress</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={20} />
              <span className="text-sm">
                {aiContext.strengths?.length || 0} Strengths
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Trophy className="text-orange-400" size={20} />
              <span className="text-sm">
                {Math.round(sessionProgress)}% Complete
              </span>
            </div>
          </div>

          <div className="text-sm opacity-90">
            Made with ❤️ for little learners
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${sessionProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
