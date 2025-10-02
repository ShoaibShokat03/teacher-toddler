import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import SubjectCard from './SubjectCard';
import useAppStore from '../../store/useAppStore';

const SubjectSelection = ({ onStartLearning }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { childInfo, setCurrentSubject } = useAppStore();

  const subjects = ['english', 'urdu', 'math', 'arabic'];

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  const handleStartLearning = () => {
    if (selectedSubject) {
      setCurrentSubject(selectedSubject);
      onStartLearning(selectedSubject);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="compact-content bg-primary">
      <div className="container w-full">
        {/* Header */}
        <motion.div 
          className="text-center mb-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="card card-learning mb-3"
            whileHover={{ scale: 1.05, y: -2 }}
            animate={{ 
              boxShadow: [
                "0 10px 30px rgba(255, 107, 107, 0.2)",
                "0 15px 40px rgba(78, 205, 196, 0.3)",
                "0 10px 30px rgba(255, 107, 107, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="text-primary-yellow animate-rainbow" size={20} />
            <span className="text-gray-800 font-bold text-base">✨ Choose What to Learn ✨</span>
          </motion.div>
          
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(255, 107, 107, 0.3)",
                "0 0 20px rgba(78, 205, 196, 0.5)",
                "0 0 10px rgba(255, 107, 107, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Hello, {childInfo.name}! 👋
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pick a subject you'd like to explore today! 🎯 Each one is full of fun activities and games! 🎮
          </p>
        </motion.div>

        {/* Subject Cards */}
        <motion.div 
          className="compact-grid mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {subjects.map((subject) => (
            <motion.div key={subject} variants={itemVariants}>
              <SubjectCard
                subject={subject}
                onSelect={handleSubjectSelect}
                isSelected={selectedSubject === subject}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Start Button */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={handleStartLearning}
            disabled={!selectedSubject}
            className={`btn btn-lg ${selectedSubject ? 'btn-primary' : 'btn-disabled'}`}
            whileHover={selectedSubject ? { scale: 1.05, y: -2 } : {}}
            whileTap={selectedSubject ? { scale: 0.95 } : {}}
            animate={selectedSubject ? {
              boxShadow: [
                "0 8px 25px rgba(255, 107, 107, 0.3)",
                "0 12px 35px rgba(255, 107, 107, 0.5)",
                "0 8px 25px rgba(255, 107, 107, 0.3)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Play size={20} className={selectedSubject ? "animate-pulse" : ""} />
            <span>🚀 Start Learning {selectedSubject ? 'Now!' : ''} 🚀</span>
          </motion.button>

          {!selectedSubject && (
            <p className="text-gray-500 mt-3 text-sm">
              Please select a subject to continue
            </p>
          )}
        </motion.div>

        {/* Fun Facts */}
        <motion.div 
          className="mt-6 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="card card-game"
            whileHover={{ scale: 1.02, y: -5 }}
            animate={{ 
              boxShadow: [
                "0 10px 30px rgba(249, 202, 36, 0.2)",
                "0 15px 40px rgba(108, 92, 231, 0.3)",
                "0 10px 30px rgba(249, 202, 36, 0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h3 className="text-gray-800 font-bold text-base mb-2">Did you know? 🌟</h3>
            <p className="text-gray-600 text-sm">
              Learning new things helps your brain grow stronger every day! 💪 
              Each subject has special games and activities just for you! 🎯
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectSelection;
