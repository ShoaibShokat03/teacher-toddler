import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Baby, Globe, Volume2, VolumeX, Trash2 } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import toast from 'react-hot-toast';

const SettingsModal = ({ isOpen, onClose }) => {
  const { 
    childInfo, 
    parentInfo, 
    currentLanguage,
    isVoiceMode,
    setChildInfo, 
    setParentInfo, 
    setCurrentLanguage,
    toggleVoiceMode,
    resetSession
  } = useAppStore();

  const [activeTab, setActiveTab] = useState('child');
  const [formData, setFormData] = useState({
    childName: childInfo.name,
    childAge: childInfo.age,
    parentName: parentInfo.name,
    parentEmail: parentInfo.email,
    preferredLanguage: currentLanguage
  });

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'urdu', name: 'اردو', flag: '🇵🇰' },
    { code: 'arabic', name: 'العربية', flag: '🇸🇦' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸' }
  ];

  const tabs = [
    { id: 'child', label: 'Child Info', icon: Baby },
    { id: 'parent', label: 'Parent Info', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'data', label: 'Data', icon: Trash2 }
  ];

  const handleSave = () => {
    setChildInfo({
      name: formData.childName,
      age: formData.childAge,
      preferredLanguage: formData.preferredLanguage,
      learningLevel: childInfo.learningLevel
    });
    
    setParentInfo({
      name: formData.parentName,
      email: formData.parentEmail
    });
    
    setCurrentLanguage(formData.preferredLanguage);
    
    toast.success('Settings saved successfully!');
    onClose();
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all learning data? This cannot be undone.')) {
      localStorage.removeItem('toddler-learning-storage');
      window.location.reload();
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'child' && (
                <motion.div
                  key="child"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Child's Name
                    </label>
                    <input
                      type="text"
                      value={formData.childName}
                      onChange={(e) => updateFormData('childName', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <select
                      value={formData.childAge}
                      onChange={(e) => updateFormData('childAge', parseInt(e.target.value))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                    >
                      {[3, 4, 5, 6, 7, 8].map(age => (
                        <option key={age} value={age}>{age} years old</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {activeTab === 'parent' && (
                <motion.div
                  key="parent"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => updateFormData('parentName', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => updateFormData('parentEmail', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Language
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {languages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          onClick={() => updateFormData('preferredLanguage', lang.code)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.preferredLanguage === lang.code
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{lang.flag}</span>
                            <span className="font-medium">{lang.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Mode
                    </label>
                    <motion.button
                      onClick={toggleVoiceMode}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                        isVoiceMode
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isVoiceMode ? <Volume2 size={24} /> : <VolumeX size={24} />}
                      <span className="font-medium">
                        {isVoiceMode ? 'Voice Mode ON' : 'Voice Mode OFF'}
                      </span>
                    </motion.button>
                    <p className="text-sm text-gray-600 mt-2">
                      When enabled, the app will speak text aloud to help with learning.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'data' && (
                <motion.div
                  key="data"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-medium text-red-800 mb-2">Reset Learning Data</h3>
                    <p className="text-sm text-red-600 mb-4">
                      This will delete all learning progress, settings, and start fresh.
                    </p>
                    <motion.button
                      onClick={handleResetData}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reset All Data
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleSave}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;
