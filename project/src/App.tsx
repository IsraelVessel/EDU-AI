import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Settings, LogOut, User } from 'lucide-react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ReadingCoach from './components/ReadingCoach';
import HomeworkHelper from './components/HomeworkHelper';
import CrossSDGLessons from './components/CrossSDGLessons';
import TeacherDashboard from './components/TeacherDashboard';
import OfflineContent from './components/OfflineContent';
import ParentCommunication from './components/ParentCommunication';
import LanguageSelector from './components/LanguageSelector';
import { Student, Language } from './types';
import './i18n';

function App() {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isTeacherMode, setIsTeacherMode] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const savedStudent = localStorage.getItem('currentStudent');
    const savedLanguage = localStorage.getItem('currentLanguage');
    const savedTeacherMode = localStorage.getItem('isTeacherMode');
    
    if (savedStudent) {
      setCurrentStudent(JSON.parse(savedStudent));
    }
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage as Language);
    }
    if (savedTeacherMode) {
      setIsTeacherMode(JSON.parse(savedTeacherMode));
    }
  }, []);

  const handleLogin = (student: Student) => {
    setCurrentStudent(student);
    localStorage.setItem('currentStudent', JSON.stringify(student));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    localStorage.removeItem('currentStudent');
    localStorage.removeItem('isTeacherMode');
    setActiveTab('dashboard');
    setIsTeacherMode(false);
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('currentLanguage', language);
  };

  const toggleTeacherMode = () => {
    const newMode = !isTeacherMode;
    setIsTeacherMode(newMode);
    localStorage.setItem('isTeacherMode', JSON.stringify(newMode));
    setActiveTab(newMode ? 'teacher' : 'dashboard');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    const greetings = {
      en: {
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening'
      },
      es: {
        morning: 'Buenos días',
        afternoon: 'Buenas tardes',
        evening: 'Buenas noches'
      },
      fr: {
        morning: 'Bonjour',
        afternoon: 'Bon après-midi',
        evening: 'Bonsoir'
      },
      sw: {
        morning: 'Habari za asubuhi',
        afternoon: 'Habari za mchana',
        evening: 'Habari za jioni'
      }
    };

    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
    else if (hour >= 18) timeOfDay = 'evening';

    return greetings[currentLanguage][timeOfDay as keyof typeof greetings['en']];
  };

  if (!currentStudent) {
    return <LoginPage onLogin={handleLogin} currentLanguage={currentLanguage} />;
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'reading', label: 'Reading Coach', icon: BookOpen },
    { id: 'homework', label: 'Homework Helper', icon: Users },
    { id: 'lessons', label: 'Life Skills', icon: BookOpen },
    { id: 'offline', label: 'Offline Content', icon: Settings },
    { id: 'parent', label: 'Parent Updates', icon: Users },
  ];

  const renderContent = () => {
    if (isTeacherMode && activeTab === 'teacher') {
      return <TeacherDashboard currentLanguage={currentLanguage} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard student={currentStudent} greeting={getGreeting()} currentLanguage={currentLanguage} />;
      case 'reading':
        return <ReadingCoach student={currentStudent} currentLanguage={currentLanguage} />;
      case 'homework':
        return <HomeworkHelper student={currentStudent} currentLanguage={currentLanguage} />;
      case 'lessons':
        return <CrossSDGLessons student={currentStudent} currentLanguage={currentLanguage} />;
      case 'offline':
        return <OfflineContent student={currentStudent} currentLanguage={currentLanguage} />;
      case 'parent':
        return <ParentCommunication student={currentStudent} currentLanguage={currentLanguage} />;
      default:
        return <Dashboard student={currentStudent} greeting={getGreeting()} currentLanguage={currentLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EduAI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                currentLanguage={currentLanguage} 
                onLanguageChange={handleLanguageChange} 
              />
              
              <button
                onClick={toggleTeacherMode}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isTeacherMode 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isTeacherMode ? 'Teacher Mode' : 'Student Mode'}
              </button>
              
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{currentStudent.name}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        {(!isTeacherMode || activeTab !== 'teacher') && (
          <nav className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
            <div className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${(!isTeacherMode || activeTab !== 'teacher') ? 'ml-0' : 'ml-0'}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;