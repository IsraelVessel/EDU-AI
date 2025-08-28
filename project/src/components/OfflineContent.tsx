import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Clock, Wifi, WifiOff, Play, Pause } from 'lucide-react';
import { Student, ContentPack, Language } from '../types';

interface OfflineContentProps {
  student: Student;
  currentLanguage: Language;
}

const OfflineContent: React.FC<OfflineContentProps> = ({ student, currentLanguage }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadingPacks, setDownloadingPacks] = useState<Set<string>>(new Set());
  const [contentPacks, setContentPacks] = useState<ContentPack[]>([
    {
      id: 'pack-1',
      name: 'Basic Reading Skills',
      description: 'Foundation reading exercises with pronunciation guides',
      size: '15 MB',
      lessons: 12,
      language: 'en',
      isDownloaded: true,
      downloadProgress: 100
    },
    {
      id: 'pack-2',
      name: 'Elementary Math',
      description: 'Grade 1-5 math problems and step-by-step solutions',
      size: '22 MB',
      lessons: 18,
      language: 'en',
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: 'pack-3',
      name: 'Health & Nutrition',
      description: 'Essential health lessons and nutrition guides',
      size: '18 MB',
      lessons: 15,
      language: 'en',
      isDownloaded: true,
      downloadProgress: 100
    },
    {
      id: 'pack-4',
      name: 'Spanish Reading Pack',
      description: 'Reading exercises in Spanish for bilingual learning',
      size: '20 MB',
      lessons: 14,
      language: 'es',
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: 'pack-5',
      name: 'Advanced Science',
      description: 'Grade 6-8 science concepts and experiments',
      size: '35 MB',
      lessons: 25,
      language: 'en',
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: 'pack-6',
      name: 'French Language Basics',
      description: 'Introduction to French language and pronunciation',
      size: '28 MB',
      lessons: 20,
      language: 'fr',
      isDownloaded: false,
      downloadProgress: 0
    }
  ]);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const downloadPack = (packId: string) => {
    if (!isOnline) return;
    
    setDownloadingPacks(prev => new Set([...prev, packId]));
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      setContentPacks(prev => prev.map(pack => 
        pack.id === packId 
          ? { ...pack, downloadProgress: Math.min(progress, 100) }
          : pack
      ));
      
      if (progress >= 100) {
        clearInterval(interval);
        setContentPacks(prev => prev.map(pack => 
          pack.id === packId 
            ? { ...pack, isDownloaded: true, downloadProgress: 100 }
            : pack
        ));
        setDownloadingPacks(prev => {
          const newSet = new Set(prev);
          newSet.delete(packId);
          return newSet;
        });
      }
    }, 500);
  };

  const deletePack = (packId: string) => {
    setContentPacks(prev => prev.map(pack => 
      pack.id === packId 
        ? { ...pack, isDownloaded: false, downloadProgress: 0 }
        : pack
    ));
  };

  const getLanguageName = (lang: Language) => {
    const languages = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      sw: 'Swahili'
    };
    return languages[lang];
  };

  const downloadedPacks = contentPacks.filter(pack => pack.isDownloaded);
  const availablePacks = contentPacks.filter(pack => !pack.isDownloaded);
  const totalStorage = downloadedPacks.reduce((acc, pack) => acc + parseInt(pack.size), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Offline Content</h1>
            <p className="text-gray-600 mt-1">Download lessons for offline study</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <>
                <Wifi className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-red-500" />
                <span className="text-red-600 font-medium">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Download className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{downloadedPacks.length}</p>
              <p className="text-sm text-gray-600">Downloaded Packs</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {downloadedPacks.reduce((acc, pack) => acc + pack.lessons, 0)}
              </p>
              <p className="text-sm text-gray-600">Available Lessons</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalStorage} MB</p>
              <p className="text-sm text-gray-600">Storage Used</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Wifi className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {isOnline ? 'Yes' : 'No'}
              </p>
              <p className="text-sm text-gray-600">Internet Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Downloaded Content */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <span>Downloaded Content ({downloadedPacks.length})</span>
        </h2>
        
        {downloadedPacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloadedPacks.map((pack) => (
              <div key={pack.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{pack.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pack.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{pack.lessons} lessons</span>
                      <span>{pack.size}</span>
                      <span>{getLanguageName(pack.language)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    <Play className="h-4 w-4" />
                    <span>Study Now</span>
                  </button>
                  
                  <button
                    onClick={() => deletePack(pack.id)}
                    className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <Download className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No content downloaded yet</p>
            <p className="text-sm text-gray-500">Download content packs below to study offline</p>
          </div>
        )}
      </div>

      {/* Available for Download */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Download className="h-6 w-6 text-blue-500" />
          <span>Available for Download ({availablePacks.length})</span>
        </h2>
        
        {!isOnline && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2">
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="text-red-700 font-medium">No internet connection</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              Connect to the internet to download new content packs
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availablePacks.map((pack) => {
            const isDownloading = downloadingPacks.has(pack.id);
            
            return (
              <div key={pack.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{pack.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pack.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{pack.lessons} lessons</span>
                      <span>{pack.size}</span>
                      <span>{getLanguageName(pack.language)}</span>
                    </div>
                  </div>
                </div>
                
                {isDownloading ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600">Downloading...</span>
                      <span className="text-blue-600">{Math.round(pack.downloadProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${pack.downloadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => downloadPack(pack.id)}
                    disabled={!isOnline}
                    className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                      isOnline
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Pack</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Storage Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Storage Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Download content when you have a good WiFi connection</li>
          <li>• Start with smaller packs if you have limited storage</li>
          <li>• Delete unused packs to free up space</li>
          <li>• Downloaded content works completely offline</li>
          <li>• Progress is automatically synced when you reconnect</li>
        </ul>
      </div>
    </div>
  );
};

export default OfflineContent;