import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDEciWigJXzgDeCxgWNNXFJfeAdMXQgbq8');

class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.conversationHistory = [];
  }

  async generateLesson(subject, language, childInfo, aiContext) {
    const prompt = this.buildLessonPrompt(subject, language, childInfo, aiContext);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const lesson = JSON.parse(response.text());
      
      this.conversationHistory.push({
        type: 'lesson',
        subject,
        language,
        content: lesson
      });
      
      return lesson;
    } catch (error) {
      console.error('Error generating lesson:', error);
      return this.getFallbackLesson(subject, language);
    }
  }

  async generateQuestion(subject, language, difficulty, previousAnswers = []) {
    const prompt = this.buildQuestionPrompt(subject, language, difficulty, previousAnswers);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const question = JSON.parse(response.text());
      
      this.conversationHistory.push({
        type: 'question',
        subject,
        language,
        content: question
      });
      
      return question;
    } catch (error) {
      console.error('Error generating question:', error);
      return this.getFallbackQuestion(subject, language);
    }
  }

  async evaluateAnswer(question, answer, language) {
    const prompt = this.buildEvaluationPrompt(question, answer, language);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const evaluation = JSON.parse(response.text());
      
      return evaluation;
    } catch (error) {
      console.error('Error evaluating answer:', error);
      return {
        isCorrect: false,
        feedback: "Good try! Let's try again.",
        explanation: "Keep learning!"
      };
    }
  }

  buildLessonPrompt(subject, language, childInfo, aiContext) {
    return `
    You are a friendly AI teacher for a ${childInfo.age}-year-old child named ${childInfo.name}.
    Create an engaging, interactive lesson for ${subject} in ${language}.
    
    Child's learning level: ${childInfo.learningLevel}
    Previous lessons: ${JSON.stringify(aiContext.previousLessons)}
    Strengths: ${JSON.stringify(aiContext.strengths)}
    Weaknesses: ${JSON.stringify(aiContext.weaknesses)}
    
    Return a JSON object with this structure:
    {
      "title": "Lesson title",
      "objective": "What the child will learn",
      "content": [
        {
          "type": "image" | "text" | "interactive",
          "data": "content or image description",
          "interaction": "how child should interact"
        }
      ],
      "activities": [
        {
          "type": "pointing" | "speaking" | "touching",
          "instruction": "what to do",
          "expectedResponse": "expected answer"
        }
      ],
      "duration": "estimated minutes",
      "difficulty": "beginner" | "intermediate" | "advanced"
    }
    
    Make it fun, colorful, and age-appropriate. Use simple words and encourage interaction.
    `;
  }

  buildQuestionPrompt(subject, language, difficulty, previousAnswers) {
    return `
    Create a simple test question for ${subject} in ${language} at ${difficulty} level.
    Previous answers: ${JSON.stringify(previousAnswers)}
    
    Return a JSON object:
    {
      "question": "Question text",
      "type": "multiple_choice" | "pointing" | "speaking" | "true_false",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "correct option",
      "image": "description of image to show",
      "hint": "helpful hint",
      "difficulty": "${difficulty}"
    }
    
    Make it appropriate for a 3-6 year old child.
    `;
  }

  buildEvaluationPrompt(question, answer, language) {
    return `
    Evaluate this answer for a young child learning ${question.subject} in ${language}:
    
    Question: ${question.question}
    Child's Answer: ${answer}
    Correct Answer: ${question.correctAnswer}
    
    Return a JSON object:
    {
      "isCorrect": true/false,
      "feedback": "encouraging feedback message",
      "explanation": "simple explanation",
      "encouragement": "motivational message"
    }
    
    Be positive and encouraging, even for wrong answers.
    `;
  }

  getFallbackLesson(subject, language) {
    const fallbacks = {
      english: {
        title: "Let's Learn English!",
        objective: "Learn basic English words",
        content: [
          {
            type: "text",
            data: "Hello! Let's learn some English words today!",
            interaction: "Listen and repeat"
          }
        ],
        activities: [
          {
            type: "speaking",
            instruction: "Say 'Hello'",
            expectedResponse: "Hello"
          }
        ],
        duration: "5 minutes",
        difficulty: "beginner"
      },
      urdu: {
        title: "اردو سیکھیں!",
        objective: "بنیادی اردو الفاظ سیکھیں",
        content: [
          {
            type: "text",
            data: "السلام علیکم! آج کچھ اردو الفاظ سیکھتے ہیں!",
            interaction: "سن کر دہرائیں"
          }
        ],
        activities: [
          {
            type: "speaking",
            instruction: "السلام علیکم کہیں",
            expectedResponse: "السلام علیکم"
          }
        ],
        duration: "5 minutes",
        difficulty: "beginner"
      },
      math: {
        title: "Let's Count!",
        objective: "Learn to count from 1 to 5",
        content: [
          {
            type: "text",
            data: "Let's count together! 1, 2, 3, 4, 5!",
            interaction: "Count along"
          }
        ],
        activities: [
          {
            type: "speaking",
            instruction: "Count from 1 to 5",
            expectedResponse: "1, 2, 3, 4, 5"
          }
        ],
        duration: "5 minutes",
        difficulty: "beginner"
      },
      arabic: {
        title: "تعلم العربية!",
        objective: "تعلم الكلمات العربية الأساسية",
        content: [
          {
            type: "text",
            data: "مرحبا! دعنا نتعلم بعض الكلمات العربية اليوم!",
            interaction: "استمع وكرر"
          }
        ],
        activities: [
          {
            type: "speaking",
            instruction: "قل مرحبا",
            expectedResponse: "مرحبا"
          }
        ],
        duration: "5 minutes",
        difficulty: "beginner"
      }
    };

    return fallbacks[subject] || fallbacks.english;
  }

  getFallbackQuestion(subject, language) {
    return {
      question: "What color is the sun?",
      type: "multiple_choice",
      options: ["Red", "Yellow", "Blue", "Green"],
      correctAnswer: "Yellow",
      image: "A bright sun in the sky",
      hint: "It's bright and warm!",
      difficulty: "beginner"
    };
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}

export default new GeminiService();
