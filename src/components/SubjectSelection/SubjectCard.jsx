import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Globe, Star } from 'lucide-react';

const SubjectCard = ({ subject, onSelect, isSelected }) => {
  const subjectConfig = {
    english: {
      icon: BookOpen,
      title: 'English',
      description: 'Learn letters, words, and reading',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      emoji: '📚'
    },
    urdu: {
      icon: Globe,
      title: 'اردو',
      description: 'حروف، الفاظ اور پڑھنا سیکھیں',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      emoji: '📖'
    },
    math: {
      icon: Calculator,
      title: 'Math',
      description: 'Count, add, and solve problems',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      emoji: '🔢'
    },
    arabic: {
      icon: Star,
      title: 'العربية',
      description: 'تعلم الحروف والكلمات والقراءة',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      emoji: '⭐'
    }
  };

  const config = subjectConfig[subject] || subjectConfig.english;
  const IconComponent = config.icon;

  return (
    <motion.div
      className={`subject-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(subject)}
      whileHover={{ scale: 1.05, y: -8, rotate: [0, 2, -2, 0] }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        boxShadow: isSelected ? [
          "0 10px 30px rgba(255, 107, 107, 0.3)",
          "0 15px 40px rgba(255, 107, 107, 0.5)",
          "0 10px 30px rgba(255, 107, 107, 0.3)"
        ] : "0 10px 30px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ 
        duration: 0.3,
        boxShadow: { duration: 2, repeat: Infinity }
      }}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-red flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <span className="text-white text-sm">✓</span>
        </motion.div>
      )}

      {/* Emoji */}
      <motion.div 
        className="text-3xl mb-3 text-center"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {config.emoji}
      </motion.div>

      {/* Icon */}
      <motion.div 
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
        style={{ backgroundColor: config.color.split(' ')[1] }}
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
        animate={{ 
          boxShadow: [
            `0 0 20px ${config.color.split(' ')[1]}`,
            `0 0 30px ${config.color.split(' ')[1]}`,
            `0 0 20px ${config.color.split(' ')[1]}`
          ]
        }}
      >
        <IconComponent className="text-white" size={24} />
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-bold text-center text-gray-800 mb-2">
        {config.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 text-center leading-relaxed">
        {config.description}
      </p>

      {/* Hover Effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${config.color} opacity-0`}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default SubjectCard;
