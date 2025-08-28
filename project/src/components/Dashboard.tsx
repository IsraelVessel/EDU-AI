import React from 'react';
import { BookOpen, Calculator, Heart, Download, MessageSquare, TrendingUp, Award, Clock } from 'lucide-react';
import { Student, Language } from '../types';
import { translations } from '../i18n';

interface DashboardProps {
  student: Student;
  greeting: string;
  currentLanguage: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ student, greeting, currentLanguage }) => {
  const t = translations[currentLanguage];

  const quickActions = [
    {
      id: 'reading',
      title: t.startReading,
      description: 'Practice pronunciation and comprehension',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      progress: Math.floor((student.progress.readingLevel / 10) * 100)
    },
    {
      id: 'homework',
      title: t.scanHomework,
      description: 'Get help with math and science problems',
      icon: Calculator,
      color: 'from-green-500 to-green-600',
      progress: Math.floor((student.progress.mathLevel / 10) * 100)
    },
    {
      id: 'health',
      title: t.healthLessons,
      description: 'Learn about health and nutrition',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      progress: 75
    },
    {
      id: 'offline',
      title: t.downloadLessons,
      description: 'Download content for offline study',
      icon: Download,
      color: 'from-purple-500 to-purple-600',
      progress: 60
    }
  ];

  const achievements = [
    {
      title: 'Reading Streak',
      value: `${student.progress.streakDays} days`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Lessons Completed',
      value: `${student.progress.completedLessons}`,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Study Time',
      value: `${Math.floor(student.progress.completedLessons * 15)} mins`,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentActivities = [
    {
      activity: 'Completed "Healthy Eating Habits" lesson',
      time: '2 hours ago',
      type: 'lesson'
    },
    {
      activity: 'Practiced reading with 95% accuracy',
      time: '1 day ago',
      type: 'reading'
    },
    {
      activity: 'Solved 8 math problems correctly',
      time: '2 days ago',
      type: 'homework'
    },
    {
      activity: 'Downloaded offline content pack',
      time: '3 days ago',
      type: 'download'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Greeting Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {greeting}, {student.name}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          Ready to continue your learning journey today?
        </p>
        
        {/* Progress Overview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Reading Level</span>
              <span className="font-bold">{student.progress.readingLevel}/10</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${(student.progress.readingLevel / 10) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Math Level</span>
              <span className="font-bold">{student.progress.mathLevel}/10</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${(student.progress.mathLevel / 10) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Overall Progress</span>
              <span className="font-bold">
                {Math.floor((student.progress.completedLessons / student.progress.totalLessons) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${(student.progress.completedLessons / student.progress.totalLessons) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {action.progress}% complete
                    </span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${action.color} rounded-full h-2 transition-all duration-300`}
                        style={{ width: `${action.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${achievement.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${achievement.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{achievement.value}</p>
                      <p className="text-sm text-gray-600">{achievement.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Recommended Next</h3>
            <p className="text-sm text-gray-700 mb-4">
              Based on your progress, we recommend practicing reading comprehension.
            </p>
            <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all">
              Start Reading Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;