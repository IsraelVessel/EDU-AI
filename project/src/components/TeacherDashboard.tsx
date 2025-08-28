import React, { useState } from 'react';
import { Users, BookOpen, TrendingUp, Settings, Download, Plus, Eye, BarChart3 } from 'lucide-react';
import { Language, ProgressData } from '../types';

interface TeacherDashboardProps {
  currentLanguage: Language;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ currentLanguage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const students = [
    {
      id: '1',
      name: 'Maria Santos',
      grade: 'Grade 8',
      readingLevel: 7,
      mathLevel: 6,
      completedLessons: 45,
      totalLessons: 100,
      lastActive: '2 hours ago',
      progress: 75
    },
    {
      id: '2',
      name: 'James Ochieng',
      grade: 'Grade 7',
      readingLevel: 8,
      mathLevel: 9,
      completedLessons: 62,
      totalLessons: 100,
      lastActive: '1 day ago',
      progress: 82
    },
    {
      id: '3',
      name: 'Fatima Al-Rashid',
      grade: 'Grade 9',
      readingLevel: 9,
      mathLevel: 7,
      completedLessons: 38,
      totalLessons: 100,
      lastActive: '3 hours ago',
      progress: 68
    },
    {
      id: '4',
      name: 'Carlos Rodriguez',
      grade: 'Grade 8',
      readingLevel: 6,
      mathLevel: 8,
      completedLessons: 51,
      totalLessons: 100,
      lastActive: '5 minutes ago',
      progress: 71
    }
  ];

  const classStats = {
    totalStudents: students.length,
    averageProgress: Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length),
    lessonsCompleted: students.reduce((acc, s) => acc + s.completedLessons, 0),
    averageReadingLevel: Math.round(students.reduce((acc, s) => acc + s.readingLevel, 0) / students.length),
    averageMathLevel: Math.round(students.reduce((acc, s) => acc + s.mathLevel, 0) / students.length)
  };

  const progressData: ProgressData[] = [
    { date: '2024-01-01', readingScore: 65, mathScore: 60, lessonsCompleted: 120 },
    { date: '2024-01-08', readingScore: 70, mathScore: 65, lessonsCompleted: 145 },
    { date: '2024-01-15', readingScore: 72, mathScore: 70, lessonsCompleted: 168 },
    { date: '2024-01-22', readingScore: 75, mathScore: 72, lessonsCompleted: 196 },
    { date: '2024-01-29', readingScore: 78, mathScore: 75, lessonsCompleted: 220 }
  ];

  const tabs = [
    { id: 'overview', label: 'Class Overview', icon: BarChart3 },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'content', label: 'Content Library', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Class Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{classStats.totalStudents}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{classStats.averageProgress}%</p>
              <p className="text-sm text-gray-600">Avg Progress</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{classStats.lessonsCompleted}</p>
              <p className="text-sm text-gray-600">Lessons Done</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{classStats.averageReadingLevel}/10</p>
              <p className="text-sm text-gray-600">Avg Reading</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{classStats.averageMathLevel}/10</p>
              <p className="text-sm text-gray-600">Avg Math</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Plus className="h-5 w-5" />
            <span>Add New Student</span>
          </button>
          <button className="flex items-center space-x-2 p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <BookOpen className="h-5 w-5" />
            <span>Create Assignment</span>
          </button>
          <button className="flex items-center space-x-2 p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <Download className="h-5 w-5" />
            <span>Export Reports</span>
          </button>
          <button className="flex items-center space-x-2 p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            <Eye className="h-5 w-5" />
            <span>View Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Class Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                M
              </div>
              <div>
                <p className="text-sm font-medium">Maria Santos completed "Healthy Eating Habits"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                J
              </div>
              <div>
                <p className="text-sm font-medium">James Ochieng achieved 95% in reading practice</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                F
              </div>
              <div>
                <p className="text-sm font-medium">Fatima Al-Rashid requested help with math problem</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Student Management</h3>
        <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Student</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reading Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Math Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.readingLevel}/10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.mathLevel}/10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-2">Message</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Content Library</h3>
        <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Create Content</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Reading Exercises</h4>
              <p className="text-sm text-gray-600">45 exercises available</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            Curated reading materials with pronunciation guides and comprehension questions.
          </p>
          <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
            Manage Reading Content
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Math Problems</h4>
              <p className="text-sm text-gray-600">32 problem sets</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            Grade-appropriate math problems with step-by-step solutions and explanations.
          </p>
          <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors">
            Manage Math Content
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-purple-500" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Life Skills</h4>
              <p className="text-sm text-gray-600">28 lesson modules</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            Health, nutrition, and hygiene lessons aligned with SDG goals.
          </p>
          <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors">
            Manage Life Skills
          </button>
        </div>
      </div>

      {/* Content Creation Tools */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Auto-Generated Content</h4>
        <p className="text-gray-600 mb-4">
          Use AI to automatically generate personalized practice exercises for your students.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Generate Reading Exercises</p>
              <p className="text-sm text-gray-600">Create custom reading materials</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Generate Math Problems</p>
              <p className="text-sm text-gray-600">Create practice problems by topic</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Class Analytics</h3>
      
      {/* Progress Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Class Progress Over Time</h4>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Progress chart visualization</p>
            <p className="text-sm text-gray-400">Interactive charts showing student improvement</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h4>
          <div className="space-y-3">
            {students
              .sort((a, b) => b.progress - a.progress)
              .slice(0, 3)
              .map((student, index) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.grade}</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-semibold">{student.progress}%</span>
                </div>
              ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Need Attention</h4>
          <div className="space-y-3">
            {students
              .sort((a, b) => a.progress - b.progress)
              .slice(0, 3)
              .map((student) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-semibold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">Needs support in reading</p>
                    </div>
                  </div>
                  <span className="text-orange-600 font-semibold">{student.progress}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Class Settings</h3>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
            <input
              type="text"
              defaultValue="Grade 8 - Section A"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="sw">Swahili</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Difficulty</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="adaptive">Adaptive (Recommended)</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="ml-2 text-sm text-gray-700">Email notifications for student progress</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="ml-2 text-sm text-gray-700">SMS alerts for students needing help</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="ml-2 text-sm text-gray-700">Daily activity summaries</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'students':
        return renderStudents();
      case 'content':
        return renderContent();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600">Manage your class and track student progress</p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;