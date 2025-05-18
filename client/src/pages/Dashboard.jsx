import React, { useState } from 'react';
import { Book, Clock, ChevronDown, ChevronRight, BookOpen, Star, BarChart2, Award, Search } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('grammar');
  const [expandedSections, setExpandedSections] = useState({
    'present-simple': true,
    'present-continuous': false,
    'past-simple': false,
    'future-simple': false,
    'present-perfect': false
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const grammarRules = [
    {
      id: 'present-simple',
      title: 'Present Simple',
      structure: 'Subject + base verb (add "s"/"es" for third person singular)',
      examples: [
        { english: 'She plays tennis every weekend.', vietnamese: 'Cô ấy chơi tennis vào mỗi cuối tuần.' },
        { english: 'I work in a bank.', vietnamese: 'Tôi làm việc trong một ngân hàng.' },
        { english: 'He doesn\'t like coffee.', vietnamese: 'Anh ấy không thích cà phê.' }
      ],
      usageNotes: [
        'Habits and routines: I usually wake up at 7 AM',
        'Permanent situations: She lives in London',
        'General truths: Water boils at 100°C',
        'Timetables and schedules: The train leaves at 9 PM tomorrow'
      ]
    },
    {
      id: 'present-continuous',
      title: 'Present Continuous',
      structure: 'Subject + am/is/are + verb-ing',
      examples: [
        { english: 'They are studying English now.', vietnamese: 'Họ đang học tiếng Anh bây giờ.' },
        { english: 'She is cooking dinner.', vietnamese: 'Cô ấy đang nấu bữa tối.' },
        { english: 'We aren\'t watching TV right now.', vietnamese: 'Chúng tôi không đang xem TV ngay bây giờ.' }
      ],
      usageNotes: [
        'Actions happening now: I am reading a book',
        'Temporary situations: She is staying with her parents for a week',
        'Future arrangements: We are meeting Tom tomorrow',
        'Developing or changing situations: The weather is getting worse'
      ]
    },
    {
      id: 'past-simple',
      title: 'Past Simple',
      structure: 'Subject + past form of verb',
      examples: [
        { english: 'He visited Paris last year.', vietnamese: 'Anh ấy đã thăm Paris năm ngoái.' },
        { english: 'They didn\'t go to the party.', vietnamese: 'Họ đã không đi đến bữa tiệc.' },
        { english: 'Did you finish your homework?', vietnamese: 'Bạn đã hoàn thành bài tập về nhà chưa?' }
      ],
      usageNotes: [
        'Completed actions in the past: I watched a movie yesterday',
        'Habits in the past: She always walked to school',
        'Series of completed actions: I got up, had breakfast and left the house',
        'States in the past: He lived in Japan for two years'
      ]
    },
    {
      id: 'future-simple',
      title: 'Future Simple',
      structure: 'Subject + will + base verb',
      examples: [
        { english: 'I will travel to Japan next month.', vietnamese: 'Tôi sẽ du lịch đến Nhật Bản vào tháng tới.' },
        { english: 'Will you help me with this?', vietnamese: 'Bạn sẽ giúp tôi việc này chứ?' },
        { english: 'She won\'t be home until late.', vietnamese: 'Cô ấy sẽ không về nhà cho đến muộn.' }
      ],
      usageNotes: [
        'Predictions about the future: I think it will rain tomorrow',
        'Spontaneous decisions: I\'ll pay for dinner',
        'Promises: I will always love you',
        'Requests: Will you please help me?'
      ]
    },
    {
      id: 'present-perfect',
      title: 'Present Perfect',
      structure: 'Subject + have/has + past participle',
      examples: [
        { english: 'She has finished her homework.', vietnamese: 'Cô ấy đã hoàn thành bài tập về nhà.' },
        { english: 'I have been to France twice.', vietnamese: 'Tôi đã đến Pháp hai lần.' },
        { english: 'We haven\'t seen that movie yet.', vietnamese: 'Chúng tôi chưa xem bộ phim đó.' }
      ],
      usageNotes: [
        'Experiences: I have visited Paris three times',
        'Changes: She has grown so much this year',
        'Continuing situations: I have lived here for ten years',
        'Recent actions with present importance: I have lost my keys (and still can\'t find them)'
      ]
    }
  ];

  const learningStats = [
    { label: 'Grammar Rules', value: '25/50', icon: <Book className="w-5 h-5 text-blue-500" /> },
    { label: 'Vocabulary', value: '320/1000', icon: <BookOpen className="w-5 h-5 text-green-500" /> },
    { label: 'Practice Time', value: '12h 30m', icon: <Clock className="w-5 h-5 text-orange-500" /> },
    { label: 'Streak', value: '7 days', icon: <Award className="w-5 h-5 text-yellow-500" /> }
  ];

  const recommendedLessons = [
    { title: 'Advanced Past Tenses', level: 'Intermediate', duration: '15 min' },
    { title: 'Modal Verbs Mastery', level: 'Advanced', duration: '20 min' },
    { title: 'Conditionals Practice', level: 'Intermediate', duration: '10 min' }
  ];

  const renderTabs = () => (
    <div className="flex space-x-1 border-b border-gray-200 mb-6">
      <button 
        className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === 'grammar' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setActiveTab('grammar')}
      >
        <div className="flex items-center">
          <Book className="w-4 h-4 mr-2" />
          Grammar
        </div>
      </button>
      <button 
        className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === 'vocabulary' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setActiveTab('vocabulary')}
      >
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          The vocabulary
        </div>
      </button>
      <button 
        className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === 'practice' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setActiveTab('practice')}
      >
      </button>
    </div>
  );

  const renderGrammarContent = () => (
    <div>

      {grammarRules.map((rule) => (
        <div key={rule.id} className="mb-4 bg-white rounded-lg shadow overflow-hidden">
          <div 
            className="flex justify-between items-center p-4 cursor-pointer bg-blue-50 hover:bg-blue-100"
            onClick={() => toggleSection(rule.id)}
          >
            <h2 className="text-xl font-semibold text-blue-800">{rule.title}</h2>
            {expandedSections[rule.id] ? 
              <ChevronDown className="w-5 h-5 text-blue-800" /> : 
              <ChevronRight className="w-5 h-5 text-blue-800" />
            }
          </div>
          
          {expandedSections[rule.id] && (
            <div className="p-4">
              <div className="mb-4 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium">Structure:</p>
                <p className="mt-1 font-mono">{rule.structure}</p>
              </div>
              
              <div className="mb-4">
                <p className="font-medium mb-2">Example:</p>
                <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                  {rule.examples.map((example, index) => (
                    <div key={index} className="p-3">
                      <p className="text-blue-800 font-medium">{example.english}</p>
                      <p className="text-gray-600 text-sm mt-1">{example.vietnamese}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">How to use::</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {rule.usageNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  <span>Bài tập thực hành</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderDashboardSidebar = () => (
    <div className="w-full lg:w-72 space-y-4">    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Hello, My friends!
            </h1>
            <p className="text-gray-600">
              Continue the journey to conquer your English.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="flex-1">
              {renderTabs()}
              {activeTab === 'grammar' && renderGrammarContent()}
              {activeTab === 'vocabulary' && (
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-xl font-medium text-gray-700 mb-2">Vocabulary content</h2>
                  <p className="text-gray-600">The vocabulary is updated. Please come back later.</p>
                </div>
              )}
            </div>
            
            {renderDashboardSidebar()}
          </div>
        </div>
      </div>
    </div>
  );
}