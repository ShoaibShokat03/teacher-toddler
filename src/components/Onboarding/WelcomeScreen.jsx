import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Baby, Globe, Settings } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const WelcomeScreen = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childName: '',
    childAge: 3,
    parentName: '',
    parentEmail: '',
    preferredLanguage: 'english'
  });

  const { setChildInfo, setParentInfo, setCurrentLanguage } = useAppStore();

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'urdu', name: 'اردو', flag: '🇵🇰' },
    { code: 'arabic', name: 'العربية', flag: '🇸🇦' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸' }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save data and complete onboarding
      setChildInfo({
        name: formData.childName,
        age: formData.childAge,
        preferredLanguage: formData.preferredLanguage,
        learningLevel: 'beginner'
      });
      
      setParentInfo({
        name: formData.parentName,
        email: formData.parentEmail
      });
      
      setCurrentLanguage(formData.preferredLanguage);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="compact-content bg-primary">
      <motion.div 
        className="card card-fun w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Progress Indicator */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3].map((num) => (
            <motion.div
              key={num}
              className={`w-2 h-2 rounded-full mx-1 ${
                num <= step ? 'bg-primary-red' : 'bg-gray-300'
              }`}
              animate={{ scale: num === step ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Step 1: Child Information */}
        {step === 1 && (
          <motion.div variants={itemVariants}>
            <div className="text-center mb-4">
              <motion.div
                className="mx-auto mb-3"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Baby className="text-primary-red animate-float" size={40} />
              </motion.div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Tell us about your child 👶
              </h2>
              <p className="text-gray-600 text-sm">
                We'll personalize their learning experience ✨
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Child's Name
                </label>
                <input
                  type="text"
                  value={formData.childName}
                  onChange={(e) => updateFormData('childName', e.target.value)}
                  className="form-input"
                  placeholder="Enter your child's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <select
                  value={formData.childAge}
                  onChange={(e) => updateFormData('childAge', parseInt(e.target.value))}
                  className="form-input"
                >
                  {[3, 4, 5, 6, 7, 8].map(age => (
                    <option key={age} value={age}>{age} years old</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Parent Information */}
        {step === 2 && (
          <motion.div variants={itemVariants}>
            <div className="text-center mb-6">
              <motion.div
                className="mx-auto mb-4"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <User className="text-blue-500 pulse" size={48} />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Parent Information 👨‍👩‍👧‍👦
              </h2>
              <p className="text-gray-600">
                Help us track progress and send updates 📊
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => updateFormData('parentName', e.target.value)}
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => updateFormData('parentEmail', e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Language Selection */}
        {step === 3 && (
          <motion.div variants={itemVariants}>
            <div className="text-center mb-6">
              <motion.div
                className="mx-auto mb-4"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Globe className="text-green-500 rainbow" size={48} />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Choose Language 🌍
              </h2>
              <p className="text-gray-600">
                Select the primary language for learning 🗣️
              </p>
            </div>

            <div className="space-y-3">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => updateFormData('preferredLanguage', lang.code)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    formData.preferredLanguage === lang.code
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-lg font-medium">{lang.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            onClick={handleBack}
            disabled={step === 1}
            className={`btn ${step === 1 ? 'btn-disabled' : 'btn-secondary'}`}
            whileHover={step > 1 ? { scale: 1.05 } : {}}
            whileTap={step > 1 ? { scale: 0.95 } : {}}
          >
            ← Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.childName) ||
              (step === 2 && !formData.parentName)
            }
            className={`btn ${(step === 1 && !formData.childName) || (step === 2 && !formData.parentName) ? 'btn-disabled' : 'btn-warning'}`}
            whileHover={
              !((step === 1 && !formData.childName) || (step === 2 && !formData.parentName))
                ? { scale: 1.05, y: -2 }
                : {}
            }
            whileTap={
              !((step === 1 && !formData.childName) || (step === 2 && !formData.parentName))
                ? { scale: 0.95 }
                : {}
            }
          >
            {step === 3 ? '🚀 Start Learning!' : '➡️ Next'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
