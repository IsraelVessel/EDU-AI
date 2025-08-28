import React, { useState, useRef } from 'react';
import { Camera, Upload, RotateCcw, CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import { Student, HomeworkProblem, Language } from '../types';

interface HomeworkHelperProps {
  student: Student;
  currentLanguage: Language;
}

const HomeworkHelper: React.FC<HomeworkHelperProps> = ({ student, currentLanguage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [solution, setSolution] = useState<HomeworkProblem | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Sample problems for demonstration
  const sampleProblems: HomeworkProblem[] = [
    {
      id: '1',
      subject: 'math',
      problem: 'Solve for x: 2x + 5 = 13',
      solution: 'x = 4',
      steps: [
        'Start with the equation: 2x + 5 = 13',
        'Subtract 5 from both sides: 2x = 13 - 5',
        'Simplify: 2x = 8',
        'Divide both sides by 2: x = 8 ÷ 2',
        'Final answer: x = 4'
      ]
    },
    {
      id: '2',
      subject: 'math',
      problem: 'Calculate the area of a circle with radius 5cm',
      solution: 'Area = 78.5 cm²',
      steps: [
        'Formula for circle area: A = πr²',
        'Given radius r = 5 cm',
        'Substitute: A = π × 5²',
        'Calculate: A = π × 25',
        'A = 3.14159 × 25 = 78.5 cm²'
      ]
    },
    {
      id: '3',
      subject: 'science',
      problem: 'What is photosynthesis?',
      solution: 'Photosynthesis is the process by which plants make food using sunlight.',
      steps: [
        'Plants absorb sunlight through their leaves',
        'They take in carbon dioxide from the air',
        'Water is absorbed through their roots',
        'Chlorophyll helps convert these into glucose (sugar)',
        'Oxygen is released as a by-product',
        'This process provides food for the plant and oxygen for us'
      ]
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        processProblem();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event);
  };

  const processProblem = () => {
    setIsProcessing(true);
    setSolution(null);
    setShowSteps(false);

    // Simulate OCR and AI processing
    setTimeout(() => {
      const randomProblem = sampleProblems[Math.floor(Math.random() * sampleProblems.length)];
      setSolution(randomProblem);
      setIsProcessing(false);
    }, 3000);
  };

  const resetHelper = () => {
    setSelectedImage(null);
    setSolution(null);
    setShowSteps(false);
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const tryDemoProblem = (problemId: string) => {
    const problem = sampleProblems.find(p => p.id === problemId);
    if (problem) {
      setSolution(problem);
      setSelectedImage(null);
      setShowSteps(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Homework Helper</h1>
            <p className="text-gray-600 mt-1">Scan your homework problems and get step-by-step solutions</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Math Level</p>
            <p className="text-lg font-semibold text-green-600">{student.progress.mathLevel}/10</p>
          </div>
        </div>

        {/* Upload Section */}
        {!selectedImage && !solution && (
          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    <Camera className="h-5 w-5" />
                    <span>Take Photo</span>
                  </button>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload Image</span>
                  </button>
                </div>
                
                <p className="text-gray-500 text-sm max-w-md">
                  Take a photo of your homework problem or upload an image. Our AI will analyze it and provide step-by-step solutions.
                </p>
              </div>
            </div>

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
            />
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Demo Problems */}
        {!selectedImage && !solution && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Try Demo Problems</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleProblems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => tryDemoProblem(problem.id)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      problem.subject === 'math' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {problem.subject}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">
                    {problem.problem.substring(0, 50)}...
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Processing */}
        {isProcessing && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div>
                <p className="text-lg font-medium text-gray-900">Analyzing your problem...</p>
                <p className="text-sm text-gray-600">Using AI to recognize and solve</p>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded Image Preview */}
        {selectedImage && !isProcessing && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Uploaded Problem</h3>
            <div className="border rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Homework problem"
                className="w-full max-h-64 object-contain bg-gray-50"
              />
            </div>
          </div>
        )}

        {/* Solution */}
        {solution && !isProcessing && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Solution Found!</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  solution.subject === 'math' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {solution.subject.toUpperCase()}
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Problem:</h4>
                <p className="text-gray-700 bg-white p-3 rounded-lg border">
                  {solution.problem}
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Answer:</h4>
                <p className="text-xl font-bold text-green-600 bg-white p-3 rounded-lg border">
                  {solution.solution}
                </p>
              </div>
              
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <Eye className="h-4 w-4" />
                <span>{showSteps ? 'Hide' : 'Show'} Step-by-Step Solution</span>
              </button>
            </div>

            {/* Step-by-Step Solution */}
            {showSteps && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span>Step-by-Step Solution</span>
                </h4>
                
                <div className="space-y-3">
                  {solution.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                <Upload className="h-5 w-5" />
                <span>Solve Another Problem</span>
              </button>
              
              <button
                onClick={resetHelper}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Start Over</span>
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Tips for Best Results</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Make sure the problem is clearly visible and well-lit</li>
            <li>• Avoid shadows or glare on the paper</li>
            <li>• Include the full problem statement in the image</li>
            <li>• For handwritten work, write as clearly as possible</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeworkHelper;