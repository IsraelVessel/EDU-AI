import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { Student, ReadingExercise, Language } from '../types';

interface ReadingCoachProps {
  student: Student;
  currentLanguage: Language;
}

const ReadingCoach: React.FC<ReadingCoachProps> = ({ student, currentLanguage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<ReadingExercise>({
    id: '1',
    title: 'Healthy Eating Habits',
    text: `Eating healthy foods is very important for our bodies. Fresh fruits and vegetables give us vitamins and minerals that help us grow strong. When we eat colorful foods like red tomatoes, green spinach, and orange carrots, we get different nutrients that our bodies need. 

It's also important to drink plenty of water every day. Water helps our bodies work properly and keeps us hydrated. Try to eat three meals a day and choose foods that will give you energy to play and learn.

Remember, a balanced diet includes fruits, vegetables, grains, and proteins. When we take care of our bodies by eating well, we feel better and can focus better in school.`,
    difficulty: 'Intermediate',
    targetWords: ['healthy', 'vitamins', 'nutrients', 'balanced', 'hydrated'],
    completed: false
  });
  
  const [feedback, setFeedback] = useState<{
    accuracy: number;
    wordsCorrect: number;
    totalWords: number;
    pronunciationTips: string[];
    overallScore: number;
  } | null>(null);
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const exercises: ReadingExercise[] = [
    currentExercise,
    {
      id: '2',
      title: 'Clean Water Importance',
      text: `Clean water is essential for life. Every person needs access to safe drinking water to stay healthy. Dirty water can contain harmful germs that make people sick. That's why it's important to always drink water that has been properly cleaned or boiled.

In many communities, people work together to protect their water sources. They keep rivers and wells clean by not throwing garbage near them. When we all do our part, everyone can have access to clean, safe water.

If you're not sure if water is safe to drink, it's better to boil it first or use water purification tablets. Taking care of our water helps take care of our health.`,
      difficulty: 'Beginner',
      targetWords: ['essential', 'access', 'harmful', 'communities', 'purification'],
      completed: false
    },
    {
      id: '3',
      title: 'Exercise and Movement',
      text: `Regular exercise helps keep our bodies strong and healthy. When we move our bodies through activities like walking, running, dancing, or playing sports, our muscles get stronger and our hearts get healthier.

Exercise doesn't have to be difficult or boring. You can exercise by playing games with friends, helping with chores around the house, or even dancing to your favorite music. The important thing is to move your body every day.

When we exercise regularly, we sleep better at night, feel more energetic during the day, and can concentrate better on our studies. Movement is medicine for our bodies and minds.`,
      difficulty: 'Advanced',
      targetWords: ['regular', 'activities', 'muscles', 'concentrate', 'energetic'],
      completed: false
    }
  ];

  const words = currentExercise.text.split(/\s+/);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev < words.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return -1;
          }
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isPlaying, words.length]);

  const startRecording = () => {
    setIsRecording(true);
    setFeedback(null);
    // Simulate speech recognition
    setTimeout(() => {
      setIsRecording(false);
      provideFeedback();
    }, 5000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    provideFeedback();
  };

  const provideFeedback = () => {
    // Simulate AI feedback generation
    const accuracy = Math.floor(Math.random() * 20) + 80; // 80-100%
    const totalWords = words.length;
    const wordsCorrect = Math.floor((accuracy / 100) * totalWords);
    
    const tips = [
      "Great job with pronunciation of 'healthy'!",
      "Try to slow down when reading complex words like 'nutrients'.",
      "Your intonation improved significantly during this session.",
      "Focus on the 'th' sound in words like 'the' and 'that'."
    ];
    
    const selectedTips = tips.slice(0, Math.floor(Math.random() * 3) + 1);
    
    setFeedback({
      accuracy,
      wordsCorrect,
      totalWords,
      pronunciationTips: selectedTips,
      overallScore: Math.floor(accuracy * 0.8 + Math.random() * 20)
    });
    
    setReadingProgress(prev => Math.min(prev + 10, 100));
  };

  const playAudioGuide = () => {
    setIsPlaying(!isPlaying);
    setCurrentWordIndex(isPlaying ? -1 : 0);
  };

  const resetExercise = () => {
    setFeedback(null);
    setReadingProgress(0);
    setCurrentWordIndex(-1);
    setIsPlaying(false);
    setIsRecording(false);
  };

  const renderText = () => {
    return words.map((word, index) => (
      <span
        key={index}
        className={`${
          index === currentWordIndex
            ? 'bg-blue-200 text-blue-900'
            : currentExercise.targetWords.some(target => 
                word.toLowerCase().replace(/[.,!?]/g, '') === target.toLowerCase()
              )
            ? 'bg-yellow-100 text-yellow-900 font-semibold'
            : ''
        } transition-colors duration-300`}
      >
        {word}{' '}
      </span>
    ));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reading Coach</h1>
            <p className="text-gray-600 mt-1">Practice your pronunciation and reading skills</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Level</p>
            <p className="text-lg font-semibold text-blue-600">{student.progress.readingLevel}/10</p>
          </div>
        </div>

        {/* Exercise Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Reading Exercise
          </label>
          <select
            value={currentExercise.id}
            onChange={(e) => {
              const selected = exercises.find(ex => ex.id === e.target.value);
              if (selected) {
                setCurrentExercise(selected);
                resetExercise();
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.title} ({exercise.difficulty})
              </option>
            ))}
          </select>
        </div>

        {/* Reading Text */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{currentExercise.title}</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {currentExercise.difficulty}
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 leading-relaxed text-lg">
            {renderText()}
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <strong>Target words to focus on:</strong> {currentExercise.targetWords.join(', ')}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button
            onClick={playAudioGuide}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span>{isPlaying ? 'Stop Guide' : 'Start Audio Guide'}</span>
          </button>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isPlaying}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            <span>{isRecording ? 'Stop Recording' : 'Start Reading Practice'}</span>
          </button>

          <button
            onClick={resetExercise}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Reading Progress</span>
            <span className="text-sm text-gray-500">{readingProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Great Job!</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{feedback.accuracy}%</p>
                <p className="text-sm text-gray-600">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{feedback.wordsCorrect}/{feedback.totalWords}</p>
                <p className="text-sm text-gray-600">Words Correct</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{feedback.overallScore}</p>
                <p className="text-sm text-gray-600">Overall Score</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📝 Pronunciation Tips:</h4>
              <ul className="space-y-1">
                {feedback.pronunciationTips.map((tip, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Recording Status */}
        {isRecording && (
          <div className="fixed bottom-6 right-6 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-ping" />
              <span className="font-medium">Listening...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingCoach;