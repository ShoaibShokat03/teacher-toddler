# Toddler Learning App 🎓

An AI-powered learning application designed specifically for toddlers and young children (ages 3-8) to learn English, Urdu, Math, and Arabic through interactive, voice-enabled, and touch-friendly experiences.

## 🌟 Features

### 🎨 **Toddler-Friendly Design**
- **Dark Theme**: Beautiful dark gradient backgrounds with red, blue, green, and yellow accents
- **Large Touch Targets**: Optimized for small fingers and touch interactions
- **Colorful Visuals**: Engaging emojis and bright colors that appeal to children
- **Responsive Design**: Works perfectly on tablets, phones, and desktop

### 🤖 **AI-Powered Learning**
- **Gemini AI Integration**: Automated lesson generation and personalized teaching
- **Adaptive Learning**: AI remembers child's progress and adjusts difficulty
- **Real-time Testing**: Interactive quizzes and assessments
- **Contextual Teaching**: AI acts like a real teacher with personalized feedback

### 🗣️ **Voice Features**
- **Text-to-Speech**: AI speaks lessons aloud in multiple languages
- **Voice Recognition**: Children can answer questions by speaking
- **Multi-language Support**: English, Urdu, Arabic, and Spanish
- **Child-friendly Voice Settings**: Optimized pitch and speed for young learners

### 📚 **Learning Subjects**
- **English**: Letters, words, reading, and vocabulary
- **اردو (Urdu)**: حروف، الفاظ اور پڑھنا سیکھیں
- **Math**: Counting, addition, problem-solving
- **العربية (Arabic)**: تعلم الحروف والكلمات والقراءة

### 💾 **Smart Storage**
- **Local Storage**: Saves child and parent information securely
- **Progress Tracking**: Remembers learning achievements and weaknesses
- **AI Context**: Maintains conversation history for personalized learning
- **Session Management**: Tracks learning sessions and progress

### 🎮 **Interactive Features**
- **Touch Interactions**: Pointing, tapping, and gesture-based learning
- **Visual Learning**: Image-based content with educational pictures
- **Gamification**: Fun activities and rewards for learning
- **Parent Dashboard**: Settings and progress monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with Web Speech API support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd toddler-learning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Gemini AI Setup
The app uses Google's Gemini AI for automated teaching. The API key is already configured:
```
API Key: AIzaSyDEciWigJXzgDeCxgWNNXFJfeAdMXQgbq8
```

### Image API Setup
For enhanced visual learning, you can configure image APIs:
- **Unsplash**: Get your access key from [Unsplash Developers](https://unsplash.com/developers)
- **Pixabay**: Get your API key from [Pixabay API](https://pixabay.com/api/docs/)

Update the keys in `src/services/imageService.js`:
```javascript
this.unsplashAccessKey = 'your-unsplash-access-key';
this.pixabayApiKey = 'your-pixabay-api-key';
```

## 📱 Usage

### For Parents
1. **Setup**: Enter your child's information during onboarding
2. **Language Selection**: Choose the primary learning language
3. **Voice Mode**: Enable/disable voice features in settings
4. **Monitor Progress**: Check learning progress and achievements
5. **Customize**: Adjust settings based on your child's needs

### For Children
1. **Choose Subject**: Select what they want to learn (English, Urdu, Math, Arabic)
2. **Interactive Learning**: Follow along with AI-generated lessons
3. **Voice Interaction**: Speak answers or listen to instructions
4. **Touch Learning**: Point, tap, and interact with visual elements
5. **Take Tests**: Complete quizzes to test their knowledge

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19 with Vite
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **AI Integration**: Google Gemini API
- **Voice**: Web Speech API (native browser support)
- **Storage**: LocalStorage with Zustand persistence

### Project Structure
```
src/
├── components/
│   ├── Layout/           # Header, Footer
│   ├── Onboarding/      # Welcome screen
│   ├── SubjectSelection/ # Subject cards and selection
│   ├── Learning/        # Main learning interface
│   └── Settings/        # Settings modal
├── services/
│   ├── geminiService.js # AI integration
│   ├── voiceService.js  # Speech recognition/synthesis
│   └── imageService.js  # Image API integration
├── store/
│   └── useAppStore.js   # Global state management
└── App.jsx             # Main application component
```

## 🎯 Key Features Explained

### AI-Powered Teaching
- **Dynamic Lesson Generation**: Creates age-appropriate content
- **Personalized Learning**: Adapts to child's learning style and pace
- **Real-time Assessment**: Provides immediate feedback and encouragement
- **Contextual Memory**: Remembers previous lessons and progress

### Voice Integration
- **Multi-language Support**: Supports English, Urdu, Arabic, Spanish
- **Child-optimized Settings**: Appropriate pitch and speed for young learners
- **Interactive Voice**: Children can speak answers and receive voice feedback
- **Accessibility**: Helps children with reading difficulties

### Touch-Friendly Design
- **Large Buttons**: Minimum 44px touch targets
- **Gesture Support**: Swipe, tap, and point interactions
- **Visual Feedback**: Immediate response to touch interactions
- **Accessibility**: Works with assistive technologies

## 🔒 Privacy & Security

- **Local Storage Only**: All data stored locally on device
- **No External Tracking**: No analytics or tracking scripts
- **Parental Control**: Parents can reset all data anytime
- **Secure API Keys**: API keys are client-side only (consider server-side for production)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
The app is ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Tailwind CSS** for responsive design
- **Web Speech API** for voice features

## 📞 Support

For support or questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Made with ❤️ for little learners around the world! 🌍**"# teacher-toddler" 
