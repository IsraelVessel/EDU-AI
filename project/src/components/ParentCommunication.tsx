import React, { useState } from 'react';
import { MessageSquare, Send, Clock, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { Student, ParentUpdate, Language } from '../types';

interface ParentCommunicationProps {
  student: Student;
  currentLanguage: Language;
}

const ParentCommunication: React.FC<ParentCommunicationProps> = ({ student, currentLanguage }) => {
  const [parentPhone, setParentPhone] = useState('+254712345678');
  const [messageType, setMessageType] = useState<'progress' | 'achievement' | 'reminder'>('progress');
  const [customMessage, setCustomMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentMessages, setSentMessages] = useState<ParentUpdate[]>([
    {
      id: '1',
      studentName: student.name,
      parentPhone: '+254712345678',
      message: `Great news! ${student.name} completed 3 lessons today and scored 95% in reading practice. Keep encouraging them!`,
      type: 'achievement',
      sentAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      studentName: student.name,
      parentPhone: '+254712345678',
      message: `Weekly Progress: ${student.name} has completed ${student.progress.completedLessons} lessons this week. Reading level improved from ${student.progress.readingLevel-1} to ${student.progress.readingLevel}.`,
      type: 'progress',
      sentAt: '2024-01-14T18:00:00Z'
    },
    {
      id: '3',
      studentName: student.name,
      parentPhone: '+254712345678',
      message: `Reminder: ${student.name} has been away from studies for 2 days. Please encourage them to continue their learning journey.`,
      type: 'reminder',
      sentAt: '2024-01-13T16:15:00Z'
    }
  ]);

  const messageTemplates = {
    progress: {
      en: `Progress Update: ${student.name} has completed ${student.progress.completedLessons} lessons with ${Math.round((student.progress.completedLessons / student.progress.totalLessons) * 100)}% overall progress. Reading level: ${student.progress.readingLevel}/10, Math level: ${student.progress.mathLevel}/10.`,
      es: `Actualización de Progreso: ${student.name} ha completado ${student.progress.completedLessons} lecciones con ${Math.round((student.progress.completedLessons / student.progress.totalLessons) * 100)}% de progreso general. Nivel de lectura: ${student.progress.readingLevel}/10, Nivel de matemáticas: ${student.progress.mathLevel}/10.`,
      fr: `Mise à jour des progrès: ${student.name} a terminé ${student.progress.completedLessons} leçons avec ${Math.round((student.progress.completedLessons / student.progress.totalLessons) * 100)}% de progrès global. Niveau de lecture: ${student.progress.readingLevel}/10, Niveau de mathématiques: ${student.progress.mathLevel}/10.`,
      sw: `Masasisho ya Maendeleo: ${student.name} amekamilisha masomo ${student.progress.completedLessons} na anapata ${Math.round((student.progress.completedLessons / student.progress.totalLessons) * 100)}% ya maendeleo kwa ujumla. Kiwango cha kusoma: ${student.progress.readingLevel}/10, Kiwango cha hisabati: ${student.progress.mathLevel}/10.`
    },
    achievement: {
      en: `🎉 Great news! ${student.name} has achieved a ${student.progress.streakDays}-day learning streak and scored excellent marks in recent exercises. They are doing wonderfully!`,
      es: `🎉 ¡Excelente noticia! ${student.name} ha logrado una racha de aprendizaje de ${student.progress.streakDays} días y obtuvo excelentes calificaciones en ejercicios recientes. ¡Lo está haciendo maravillosamente!`,
      fr: `🎉 Excellente nouvelle! ${student.name} a réalisé une série d'apprentissage de ${student.progress.streakDays} jours et a obtenu d'excellentes notes dans les exercices récents. Il/elle fait un travail merveilleux!`,
      sw: `🎉 Habari nzuri! ${student.name} amepata mtiririko wa kujifunza wa siku ${student.progress.streakDays} na amepata alama nzuri katika mazoezi ya hivi karibuni. Anafanya vizuri sana!`
    },
    reminder: {
      en: `Hi! ${student.name} hasn't studied in the past few days. Please encourage them to continue their learning journey. Regular practice helps maintain progress.`,
      es: `¡Hola! ${student.name} no ha estudiado en los últimos días. Por favor, anímalos a continuar su viaje de aprendizaje. La práctica regular ayuda a mantener el progreso.`,
      fr: `Salut! ${student.name} n'a pas étudié ces derniers jours. Veuillez l'encourager à continuer son parcours d'apprentissage. La pratique régulière aide à maintenir les progrès.`,
      sw: `Hujambo! ${student.name} hajafunza katika siku chache zilizopita. Tafadhali mhimize aendelee na safari yake ya kujifunza. Mazoezi ya kila siku yanasaidia kudumisha maendeleo.`
    }
  };

  const sendMessage = async () => {
    if (!parentPhone.trim()) return;
    
    setIsSending(true);
    
    const message = customMessage.trim() || messageTemplates[messageType][currentLanguage];
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newMessage: ParentUpdate = {
      id: Date.now().toString(),
      studentName: student.name,
      parentPhone: parentPhone,
      message,
      type: messageType,
      sentAt: new Date().toISOString()
    };
    
    setSentMessages(prev => [newMessage, ...prev]);
    setCustomMessage('');
    setIsSending(false);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'reminder':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'border-l-green-500 bg-green-50';
      case 'reminder':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Communication</h1>
          <p className="text-gray-600">Keep parents informed about {student.name}'s progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send New Message */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Update</h2>
            
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+254712345678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type
                </label>
                <select
                  value={messageType}
                  onChange={(e) => setMessageType(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="progress">Progress Update</option>
                  <option value="achievement">Achievement/Celebration</option>
                  <option value="reminder">Study Reminder</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Preview
                </label>
                <div className="p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                  {messageTemplates[messageType][currentLanguage]}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message (Optional)
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Type a custom message or use the template above"
                />
              </div>

              <button
                onClick={sendMessage}
                disabled={isSending || !parentPhone.trim()}
                className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send SMS</span>
                  </>
                )}
              </button>
            </div>

            {/* Communication Methods */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">📱 Communication Methods</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• SMS: Works on any mobile phone, no internet required</li>
                <li>• USSD: Interactive messages for feature phones</li>
                <li>• WhatsApp: Rich messages with images and links</li>
                <li>• Voice calls: Automated progress updates</li>
              </ul>
            </div>
          </div>

          {/* Message History */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Messages</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`border-l-4 rounded-lg p-4 ${getMessageTypeColor(message.type)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getMessageTypeIcon(message.type)}
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {message.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(message.sentAt)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{message.message}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>To: {message.parentPhone}</span>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-900">{sentMessages.length}</p>
                <p className="text-sm text-blue-700">Total Messages Sent</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-900">100%</p>
                <p className="text-sm text-green-700">Delivery Rate</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-900">1</p>
                <p className="text-sm text-purple-700">Active Contacts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Best Practices</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Send regular progress updates to keep parents engaged</li>
            <li>• Celebrate achievements to motivate continued learning</li>
            <li>• Use gentle reminders for students who haven't been active</li>
            <li>• Include specific details about what the student accomplished</li>
            <li>• Encourage parents to discuss learning with their children</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParentCommunication;