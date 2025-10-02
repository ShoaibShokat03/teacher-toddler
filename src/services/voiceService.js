class VoiceService {
  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.onResult(transcript);
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.onError(event.error);
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
        this.onEnd();
      };
    }
  }

  speak(text, language = 'en-US', rate = 0.8, pitch = 1.2) {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        resolve();
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        reject(event.error);
      };

      this.speechSynthesis.speak(utterance);
    });
  }

  startListening(language = 'en-US') {
    if (!this.recognition) {
      throw new Error('Speech recognition not supported');
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.recognition.lang = language;
    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  stopSpeaking() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  // Language-specific configurations
  getLanguageConfig(language) {
    const configs = {
      'en-US': { lang: 'en-US', rate: 0.8, pitch: 1.2 },
      'ur-PK': { lang: 'ur-PK', rate: 0.7, pitch: 1.1 },
      'ar-SA': { lang: 'ar-SA', rate: 0.7, pitch: 1.0 },
      'es-ES': { lang: 'es-ES', rate: 0.8, pitch: 1.1 }
    };
    
    return configs[language] || configs['en-US'];
  }

  // Speak with language-specific settings
  async speakInLanguage(text, language) {
    const config = this.getLanguageConfig(language);
    return this.speak(text, config.lang, config.rate, config.pitch);
  }

  // Get available voices
  getVoices() {
    if (!this.speechSynthesis) return [];
    
    return this.speechSynthesis.getVoices().filter(voice => 
      voice.lang.startsWith('en') || 
      voice.lang.startsWith('ur') || 
      voice.lang.startsWith('ar')
    );
  }

  // Set up event handlers (to be overridden by components)
  onResult(transcript) {
    console.log('Speech result:', transcript);
  }

  onError(error) {
    console.error('Speech recognition error:', error);
  }

  onEnd() {
    console.log('Speech recognition ended');
  }

  // Set custom event handlers
  setEventHandlers({ onResult, onError, onEnd }) {
    if (onResult) this.onResult = onResult;
    if (onError) this.onError = onError;
    if (onEnd) this.onEnd = onEnd;
  }

  // Check if speech services are available
  isSupported() {
    return {
      synthesis: !!this.speechSynthesis,
      recognition: !!this.recognition
    };
  }

  // Get supported languages
  getSupportedLanguages() {
    return {
      'en-US': 'English',
      'ur-PK': 'Urdu',
      'ar-SA': 'Arabic',
      'es-ES': 'Spanish'
    };
  }
}

export default new VoiceService();
