import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, XCircle } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import geminiService from '../../services/geminiService';
import voiceService from '../../services/voiceService';
import imageService from '../../services/imageService';
import toast from 'react-hot-toast';

const LearningInterface = ({ subject, onBack }) => {
  const { 
    childInfo, 
    currentLanguage, 
    isVoiceMode, 
    currentLesson, 
    currentQuestion,
    setCurrentLesson,
    setCurrentQuestion,
    updateSessionProgress,
    setLearning,
    setTestMode,
    isTestMode,
    aiContext,
    updateAiContext
  } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadLesson();
    return () => {
      voiceService.stopSpeaking();
    };
  }, [subject]);

  const loadLesson = async () => {
    setIsLoading(true);
    try {
      const lesson = await geminiService.generateLesson(
        subject, 
        currentLanguage, 
        childInfo, 
        aiContext
      );
      setCurrentLesson(lesson);
      setCurrentStep(0);
      updateSessionProgress(0);
    } catch (error) {
      toast.error('Failed to load lesson');
      console.error('Error loading lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startTest = async () => {
    setIsLoading(true);
    try {
      const question = await geminiService.generateQuestion(
        subject, 
        currentLanguage, 
        'beginner'
      );
      setCurrentQuestion(question);
      setTestMode(true);
      setCurrentStep(0);
    } catch (error) {
      toast.error('Failed to start test');
      console.error('Error starting test:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = async (text) => {
    if (isVoiceMode) {
      try {
        await voiceService.speakInLanguage(text, currentLanguage);
      } catch (error) {
        console.error('Error speaking:', error);
      }
    }
  };

  const handleNextStep = () => {
    if (currentLesson && currentStep < currentLesson.content.length - 1) {
      setCurrentStep(currentStep + 1);
      updateSessionProgress(((currentStep + 1) / currentLesson.content.length) * 100);
    } else {
      // Lesson completed
      updateAiContext({
        previousLessons: [...(aiContext.previousLessons || []), {
          subject,
          completedAt: new Date().toISOString(),
          progress: 100
        }]
      });
      toast.success('Great job! Lesson completed! 🎉');
      onBack();
    }
  };

  const handleAnswerSubmit = async () => {
    if (!userAnswer.trim()) return;

    setIsLoading(true);
    try {
      const evaluation = await geminiService.evaluateAnswer(
        currentQuestion, 
        userAnswer, 
        currentLanguage
      );
      
      setFeedback(evaluation);
      setShowFeedback(true);
      
      if (evaluation.isCorrect) {
        toast.success(evaluation.feedback);
        updateAiContext({
          strengths: [...(aiContext.strengths || []), subject]
        });
      } else {
        toast.error(evaluation.feedback);
        updateAiContext({
          weaknesses: [...(aiContext.weaknesses || []), subject]
        });
      }
    } catch (error) {
      toast.error('Failed to evaluate answer');
      console.error('Error evaluating answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setUserAnswer('');
    setFeedback(null);
    startTest();
  };

  const renderLessonContent = () => {
    if (!currentLesson) return null;

    const currentContent = currentLesson.content[currentStep];
    
    return (
      <motion.div
        key={currentStep}
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg fun-card"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-2"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(0, 0, 0, 0.1)",
                "0 0 20px rgba(0, 0, 0, 0.2)",
                "0 0 10px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentLesson.title} 🎓
          </motion.h2>
          <p className="text-gray-600">
            Step {currentStep + 1} of {currentLesson.content.length} 📚
          </p>
        </div>

        <div className="space-y-6">
          {currentContent.type === 'text' && (
            <div className="text-center">
              <p className="text-xl text-gray-700 mb-4">{currentContent.data}</p>
              <motion.button
                onClick={() => speakText(currentContent.data)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors fun-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 4px 15px rgba(239, 68, 68, 0.3)",
                    "0 6px 20px rgba(239, 68, 68, 0.5)",
                    "0 4px 15px rgba(239, 68, 68, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Volume2 size={20} className="pulse" />
                <span>🎧 Listen</span>
              </motion.button>
            </div>
          )}

          {currentContent.type === 'image' && (
            <div className="text-center">
              <motion.div 
                className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 mb-4 fun-card"
                whileHover={{ scale: 1.02, y: -5 }}
                animate={{ 
                  boxShadow: [
                    "0 10px 30px rgba(59, 130, 246, 0.2)",
                    "0 15px 40px rgba(59, 130, 246, 0.3)",
                    "0 10px 30px rgba(59, 130, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  🖼️
                </motion.div>
                <p className="text-gray-600">{currentContent.data}</p>
              </motion.div>
              <p className="text-lg text-gray-700">{currentContent.interaction}</p>
            </div>
          )}

          {currentContent.type === 'interactive' && (
            <div className="text-center">
              <motion.div 
                className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 mb-4 fun-card"
                whileHover={{ scale: 1.02, y: -5 }}
                animate={{ 
                  boxShadow: [
                    "0 10px 30px rgba(147, 51, 234, 0.2)",
                    "0 15px 40px rgba(147, 51, 234, 0.3)",
                    "0 10px 30px rgba(147, 51, 234, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div 
                  className="text-4xl mb-4"
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
                  🎮
                </motion.div>
                <p className="text-lg text-gray-700 mb-4">{currentContent.data}</p>
                <motion.button
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors fun-button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    boxShadow: [
                      "0 4px 15px rgba(59, 130, 246, 0.3)",
                      "0 6px 20px rgba(59, 130, 246, 0.5)",
                      "0 4px 15px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯 {currentContent.interaction}
                </motion.button>
              </motion.div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-8">
          <motion.button
            onClick={onBack}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors fun-button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Subjects
          </motion.button>

          <motion.button
            onClick={handleNextStep}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors fun-button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                "0 4px 15px rgba(34, 197, 94, 0.3)",
                "0 6px 20px rgba(34, 197, 94, 0.5)",
                "0 4px 15px rgba(34, 197, 94, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentStep === currentLesson.content.length - 1 ? '🎉 Finish' : '➡️ Next'}
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const renderTestContent = () => {
    if (!currentQuestion) return null;

    return (
      <motion.div
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg fun-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-2"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(0, 0, 0, 0.1)",
                "0 0 20px rgba(0, 0, 0, 0.2)",
                "0 0 10px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Test Time! 🧠
          </motion.h2>
          <p className="text-gray-600">Let's see what you've learned! 🎯</p>
        </div>

        {!showFeedback ? (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div 
                className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-8 mb-4 fun-card"
                whileHover={{ scale: 1.02, y: -5 }}
                animate={{ 
                  boxShadow: [
                    "0 10px 30px rgba(251, 191, 36, 0.2)",
                    "0 15px 40px rgba(251, 191, 36, 0.3)",
                    "0 10px 30px rgba(251, 191, 36, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div 
                  className="text-4xl mb-4"
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
                  ❓
                </motion.div>
                <p className="text-xl text-gray-700">{currentQuestion.question}</p>
              </motion.div>
            </div>

            {currentQuestion.type === 'multiple_choice' && (
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setUserAnswer(option)}
                    className={`p-4 rounded-lg border-2 transition-all fun-button ${
                      userAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={userAnswer === option ? {
                      boxShadow: [
                        "0 4px 15px rgba(59, 130, 246, 0.3)",
                        "0 6px 20px rgba(59, 130, 246, 0.5)",
                        "0 4px 15px rgba(59, 130, 246, 0.3)"
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'speaking' && (
            <div className="text-center">
              <motion.button
                onClick={() => speakText(currentQuestion.question)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4 fun-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 4px 15px rgba(59, 130, 246, 0.3)",
                    "0 6px 20px rgba(59, 130, 246, 0.5)",
                    "0 4px 15px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Volume2 size={20} className="pulse" />
                <span>🎧 Listen to Question</span>
              </motion.button>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here... ✍️"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            )}

            <div className="flex justify-center">
              <motion.button
                onClick={handleAnswerSubmit}
                disabled={!userAnswer.trim() || isLoading}
                className={`px-8 py-3 rounded-lg font-medium transition-all fun-button ${
                  userAnswer.trim() && !isLoading
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={userAnswer.trim() && !isLoading ? { scale: 1.05, y: -2 } : {}}
                whileTap={userAnswer.trim() && !isLoading ? { scale: 0.95 } : {}}
                animate={userAnswer.trim() && !isLoading ? {
                  boxShadow: [
                    "0 4px 15px rgba(34, 197, 94, 0.3)",
                    "0 6px 20px rgba(34, 197, 94, 0.5)",
                    "0 4px 15px rgba(34, 197, 94, 0.3)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isLoading ? '🔍 Checking...' : '✅ Submit Answer'}
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <motion.div 
              className={`text-6xl ${feedback?.isCorrect ? 'text-green-500' : 'text-red-500'}`}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 0.6,
                repeat: 3,
                repeatType: "reverse"
              }}
            >
              {feedback?.isCorrect ? <CheckCircle /> : <XCircle />}
            </motion.div>
            
            <div>
              <h3 className={`text-2xl font-bold ${feedback?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {feedback?.isCorrect ? 'Correct! 🎉' : 'Good Try! 💪'}
              </h3>
              <p className="text-lg text-gray-700 mt-2">{feedback?.feedback}</p>
              <p className="text-gray-600 mt-2">{feedback?.explanation}</p>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors fun-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 4px 15px rgba(59, 130, 246, 0.3)",
                    "0 6px 20px rgba(59, 130, 246, 0.5)",
                    "0 4px 15px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ➡️ Next Question
              </motion.button>
              <motion.button
                onClick={onBack}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors fun-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to Subjects
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-blue-600 via-green-600 to-yellow-500 flex items-center justify-center">
        <motion.div
          className="bg-white rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your lesson...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-blue-600 via-green-600 to-yellow-500 p-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {isTestMode ? renderTestContent() : renderLessonContent()}
        </AnimatePresence>

        {/* Test Button */}
        {!isTestMode && currentLesson && (
          <div className="text-center mt-6">
          <motion.button
            onClick={startTest}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors fun-button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                "0 4px 15px rgba(251, 191, 36, 0.3)",
                "0 6px 20px rgba(251, 191, 36, 0.5)",
                "0 4px 15px rgba(251, 191, 36, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>🧠 Take a Test! 🧠</span>
          </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningInterface;
