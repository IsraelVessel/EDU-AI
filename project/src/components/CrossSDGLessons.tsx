import React, { useState } from 'react';
import { Heart, Utensils, Droplets, BookOpen, PlayCircle, CheckCircle, Clock, Star } from 'lucide-react';
import { Student, Lesson, Language } from '../types';

interface CrossSDGLessonsProps {
  student: Student;
  currentLanguage: Language;
}

const CrossSDGLessons: React.FC<CrossSDGLessonsProps> = ({ student, currentLanguage }) => {
  const [activeCategory, setActiveCategory] = useState('health');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const categories = [
    {
      id: 'health',
      title: 'Health & Wellness',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      description: 'Learn about staying healthy and taking care of your body'
    },
    {
      id: 'nutrition',
      title: 'Nutrition & Food',
      icon: Utensils,
      color: 'from-green-500 to-emerald-500',
      description: 'Understand proper nutrition and healthy eating habits'
    },
    {
      id: 'water',
      title: 'Clean Water & Sanitation',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
      description: 'Importance of clean water and good hygiene practices'
    }
  ];

  const lessons: Record<string, Lesson[]> = {
    health: [
      {
        id: 'h1',
        title: 'Personal Hygiene Basics',
        description: 'Learn the fundamentals of keeping yourself clean and healthy',
        type: 'health',
        difficulty: 'beginner',
        duration: 10,
        content: `Personal hygiene is one of the most important things you can do to stay healthy. When we keep our bodies clean, we prevent harmful germs from making us sick.

**Daily Hygiene Habits:**

1. **Hand Washing**: Wash your hands with soap for at least 20 seconds, especially:
   - Before eating
   - After using the bathroom
   - After touching animals
   - When you come home from outside

2. **Dental Care**: Brush your teeth twice a day and try to floss once a day. This prevents tooth decay and gum disease.

3. **Bathing**: Take a bath or shower regularly to remove dirt, sweat, and germs from your skin.

4. **Clean Clothes**: Wear clean clothes and change your underwear daily.

**Why Hygiene Matters:**
- Prevents the spread of diseases
- Helps you feel confident and comfortable
- Shows respect for yourself and others
- Keeps your community healthy

Remember: Good hygiene habits started young will benefit you for your entire life!`,
        isCompleted: false,
        isDownloaded: true
      },
      {
        id: 'h2',
        title: 'Exercise and Physical Activity',
        description: 'Discover fun ways to stay active and strengthen your body',
        type: 'health',
        difficulty: 'intermediate',
        duration: 15,
        content: `Regular physical activity is essential for a healthy body and mind. You don't need expensive equipment or gym memberships to stay fit!

**Benefits of Exercise:**
- Strengthens your muscles and bones
- Improves your heart health
- Helps you sleep better
- Boosts your mood and energy
- Helps you concentrate better in school

**Easy Ways to Exercise:**

1. **At Home**: 
   - Dancing to music
   - Jumping jacks
   - Push-ups against the wall
   - Stretching exercises

2. **Outdoors**:
   - Walking or running
   - Playing soccer or other sports
   - Climbing trees (safely!)
   - Swimming if available

3. **With Friends**:
   - Group games like tag
   - Team sports
   - Walking to school together

**Getting Started:**
- Start with 10-15 minutes daily
- Choose activities you enjoy
- Gradually increase duration
- Make it a habit, not a chore

Remember: Any movement is better than no movement. Find what you love and stick with it!`,
        isCompleted: false,
        isDownloaded: true
      },
      {
        id: 'h3',
        title: 'Mental Health and Well-being',
        description: 'Understanding emotions and managing stress in healthy ways',
        type: 'health',
        difficulty: 'advanced',
        duration: 20,
        content: `Mental health is just as important as physical health. Learning to understand and manage your emotions is a life skill that will help you succeed.

**Understanding Your Emotions:**
- All emotions are normal and valid
- It's okay to feel sad, angry, or worried sometimes
- Emotions give us information about what we need
- Learning to name your feelings helps you manage them

**Healthy Ways to Handle Difficult Emotions:**

1. **When You're Stressed:**
   - Take deep, slow breaths
   - Talk to someone you trust
   - Write in a journal
   - Do physical activity

2. **When You're Angry:**
   - Count to 10 before reacting
   - Go for a walk
   - Express your feelings with words, not actions
   - Find a creative outlet

3. **When You're Sad:**
   - Allow yourself to feel sad
   - Reach out to friends or family
   - Do something kind for someone else
   - Remember that sad feelings will pass

**Building Resilience:**
- Practice gratitude daily
- Set realistic goals
- Celebrate small victories
- Learn from mistakes without being too hard on yourself

**When to Get Help:**
If you feel overwhelmed, can't sleep, or have thoughts of hurting yourself or others, talk to a trusted adult immediately.

Remember: Taking care of your mental health makes you stronger, not weaker!`,
        isCompleted: false,
        isDownloaded: true
      }
    ],
    nutrition: [
      {
        id: 'n1',
        title: 'Understanding Balanced Nutrition',
        description: 'Learn what your body needs to grow strong and healthy',
        type: 'nutrition',
        difficulty: 'beginner',
        duration: 12,
        content: `Good nutrition gives your body the fuel it needs to grow, learn, and stay healthy. Think of food as fuel for your body's engine!

**The Five Food Groups:**

1. **Fruits and Vegetables** (Half your plate)
   - Provide vitamins, minerals, and fiber
   - Examples: apples, bananas, spinach, carrots
   - Eat a rainbow of colors!

2. **Grains** (Quarter of your plate)
   - Give you energy
   - Choose whole grains when possible
   - Examples: rice, bread, oats, quinoa

3. **Proteins** (Quarter of your plate)
   - Help build strong muscles
   - Examples: beans, fish, eggs, chicken, nuts

4. **Dairy or Alternatives**
   - Strengthen bones and teeth
   - Examples: milk, yogurt, cheese, fortified plant milks

5. **Healthy Fats** (Small amounts)
   - Help your brain and body function
   - Examples: avocados, olive oil, nuts, seeds

**Creating Balanced Meals:**
- Fill half your plate with fruits and vegetables
- Include a protein source
- Add whole grains
- Include healthy fats
- Drink plenty of water

**Smart Snacking:**
- Choose fruits over candy
- Try nuts or yogurt instead of chips
- Drink water instead of sugary drinks

Remember: It's okay to enjoy treats sometimes, but make nutritious foods your everyday choice!`,
        isCompleted: false,
        isDownloaded: true
      },
      {
        id: 'n2',
        title: 'Food Safety and Hygiene',
        description: 'Keep yourself and others safe by handling food properly',
        type: 'nutrition',
        difficulty: 'intermediate',
        duration: 15,
        content: `Food safety protects you and your family from getting sick from harmful bacteria and germs that can grow in food.

**Basic Food Safety Rules:**

1. **Clean**:
   - Wash hands for 20 seconds before handling food
   - Clean all surfaces and utensils
   - Rinse fruits and vegetables under running water
   - Keep kitchen areas tidy

2. **Separate**:
   - Don't let raw meat touch other foods
   - Use different cutting boards for meat and vegetables
   - Store raw meat on the bottom shelf of refrigerator
   - Never reuse plates that held raw meat

3. **Cook**:
   - Cook food to proper temperatures
   - Make sure meat is not pink inside
   - Reheat leftovers until steaming hot
   - Don't eat raw eggs or undercooked meat

4. **Chill**:
   - Refrigerate perishable food within 2 hours
   - Keep refrigerator below 40°F (4°C)
   - Don't leave food out at room temperature too long
   - When in doubt, throw it out!

**Recognizing Spoiled Food:**
- Bad smells
- Unusual colors or textures
- Mold growth
- Past expiration dates
- Food that tastes "off"

**Safe Water:**
- Drink from clean, safe water sources
- If unsure, boil water for 1 minute before drinking
- Use clean containers for water storage
- Avoid drinking from unknown sources

Remember: When in doubt about food safety, it's better to be safe than sorry!`,
        isCompleted: false,
        isDownloaded: true
      }
    ],
    water: [
      {
        id: 'w1',
        title: 'Importance of Clean Water',
        description: 'Understand why access to clean water is essential for health',
        type: 'health',
        difficulty: 'beginner',
        duration: 10,
        content: `Clean water is one of the most important things for human life. Our bodies are about 60% water, and we need it for almost everything our bodies do.

**Why We Need Water:**
- Helps transport nutrients throughout our body
- Regulates body temperature through sweating
- Helps remove waste products
- Keeps our joints lubricated
- Aids in digestion
- Maintains healthy skin

**How Much Water Do You Need?**
- Children should drink about 6-8 glasses per day
- More if you're active or in hot weather
- Listen to your body - drink when thirsty
- Urine should be light yellow, not dark

**Sources of Clean Water:**
- Municipal water systems (tap water in many cities)
- Properly maintained wells
- Bottled water from reliable sources
- Boiled water (when other sources aren't available)
- Water treated with purification tablets

**Dangers of Unclean Water:**
- Waterborne diseases like cholera, dysentery
- Stomach problems and diarrhea
- Parasites that can make you very sick
- Long-term health problems

**What Makes Water Unsafe:**
- Animal waste contamination
- Human sewage
- Industrial pollution
- Stagnant water with bacteria growth
- Water stored in dirty containers

**Protecting Water Sources:**
- Don't throw trash near water sources
- Use proper sanitation facilities
- Report pollution to authorities
- Treat water before drinking if you're unsure of its safety

Remember: Access to clean water is a basic human right, and we all have a responsibility to protect our water sources!`,
        isCompleted: false,
        isDownloaded: true
      },
      {
        id: 'w2',
        title: 'Water Purification Methods',
        description: 'Learn simple ways to make water safe for drinking',
        type: 'health',
        difficulty: 'intermediate',
        duration: 18,
        content: `When clean water isn't available from a tap, there are several methods you can use to make water safe to drink.

**Boiling Water:**
- Most effective method for killing germs
- Bring water to a rolling boil for at least 1 minute
- Let it cool before drinking
- Store in clean containers
- Works against bacteria, viruses, and parasites

**Water Purification Tablets:**
- Easy to use and portable
- Follow package instructions carefully
- Usually need to wait 30 minutes after adding tablet
- Effective against most harmful organisms
- Good for emergency situations

**Solar Disinfection (SODIS):**
- Fill clear plastic bottles with water
- Lay bottles on their side in direct sunlight for 6 hours
- UV rays from sun kill harmful organisms
- Free method using natural resources
- Works best on sunny days

**Simple Filtration:**
- Use clean cloth to filter out visible particles
- Layer sand, gravel, and charcoal in a container
- Pour water through slowly
- This removes dirt but NOT germs
- Must still boil or treat filtered water

**Proper Storage:**
- Use clean containers with tight lids
- Store in cool, dark places
- Don't touch the inside of containers
- Use stored water within a few days
- Clean storage containers regularly

**Signs Your Water is Safe:**
- No visible particles or cloudiness
- No strange smell
- No unusual taste
- Comes from a trusted, treated source

**Emergency Water Sources:**
- Rainwater (collect in clean containers)
- Dew (collect with clean cloth in early morning)
- Ice and snow (melt first, then purify)
- Never drink from puddles, ponds, or streams without treatment

Remember: When in doubt, treat the water! It's better to be safe than get sick from contaminated water.`,
        isCompleted: false,
        isDownloaded: true
      }
    ]
  };

  const completeLesson = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const renderLessonCard = (lesson: Lesson) => {
    const isCompleted = completedLessons.has(lesson.id);
    
    return (
      <div
        key={lesson.id}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
        onClick={() => setSelectedLesson(lesson)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {lesson.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{lesson.description}</p>
          </div>
          
          {isCompleted && (
            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 ml-2" />
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration} min</span>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              lesson.difficulty === 'beginner' 
                ? 'bg-green-100 text-green-700'
                : lesson.difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {lesson.difficulty}
            </span>
          </div>
          
          <PlayCircle className="h-5 w-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    );
  };

  if (selectedLesson) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Lessons
            </button>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{selectedLesson.duration} minutes</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedLesson.title}</h1>
            <p className="text-gray-600">{selectedLesson.description}</p>
          </div>
          
          {/* Content */}
          <div className="prose max-w-none mb-8">
            <div className="bg-gray-50 rounded-xl p-6 leading-relaxed">
              {selectedLesson.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                } else if (paragraph.trim() === '') {
                  return <br key={index} />;
                } else if (paragraph.startsWith('- ') || paragraph.startsWith('• ')) {
                  return (
                    <li key={index} className="text-gray-700 ml-4">
                      {paragraph.substring(2)}
                    </li>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  return (
                    <div key={index} className="text-gray-700 font-medium mt-2">
                      {paragraph}
                    </div>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </div>
          
          {/* Complete Button */}
          <div className="text-center">
            <button
              onClick={() => completeLesson(selectedLesson.id)}
              disabled={completedLessons.has(selectedLesson.id)}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                completedLessons.has(selectedLesson.id)
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
              }`}
            >
              {completedLessons.has(selectedLesson.id) ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Lesson Completed!</span>
                </div>
              ) : (
                'Mark as Complete'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Life Skills Lessons</h1>
        <p className="text-gray-600">
          Learn essential health and nutrition skills that support UN Sustainable Development Goals
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{category.title}</span>
            </button>
          );
        })}
      </div>

      {/* Category Description */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <p className="text-gray-700">
            {categories.find(cat => cat.id === activeCategory)?.description}
          </p>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-medium text-gray-900">Completed Lessons</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {completedLessons.size}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-green-500" />
            <span className="font-medium text-gray-900">Available Lessons</span>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {Object.values(lessons).reduce((acc, curr) => acc + curr.length, 0)}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <span className="font-medium text-gray-900">Total Study Time</span>
          </div>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {Object.values(lessons).reduce((acc, curr) => 
              acc + curr.reduce((lessonAcc, lesson) => 
                lessonAcc + (completedLessons.has(lesson.id) ? lesson.duration : 0), 0
              ), 0
            )} min
          </p>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons[activeCategory]?.map(renderLessonCard)}
      </div>

      {/* SDG Information */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🌍 Supporting UN Sustainable Development Goals
        </h2>
        <p className="text-gray-700 mb-4">
          These lessons directly contribute to several UN SDGs:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-green-600">SDG 3: Good Health</h3>
            <p className="text-sm text-gray-600">Ensure healthy lives and promote well-being</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-blue-600">SDG 6: Clean Water</h3>
            <p className="text-sm text-gray-600">Ensure water and sanitation for all</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-purple-600">SDG 4: Quality Education</h3>
            <p className="text-sm text-gray-600">Ensure inclusive and equitable education</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossSDGLessons;