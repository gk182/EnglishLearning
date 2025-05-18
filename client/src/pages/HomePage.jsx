import React, { useState, useEffect } from 'react';
import { BookOpen, Globe, Award, Play, Users, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      icon: <BookOpen className="text-indigo-500" size={48} />,
      title: "Practical listening exercises",
      description: "Practice listening to English through realistic conversations and articles divided from A1 to C2"
    },
    {
      icon: <Globe className="text-indigo-500" size={48} />,
      title: "Grammar check",
      description: "Improving grammar with AI can support you 24/24."
    },
    {
      icon: <Award className="text-indigo-500" size={48} />,
      title: "Look up dictionary",
      description: "Can help you find the meaning of the fastest words and full information."
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const testimonials = [
    {
      name: "Nguyễn Thanh Việt",
      role: "FrontEnd",
      content: "After a few months of using English vocabulary, it has been greatly increased"
    },
    {
      name: "Nguyễn Công Hậu",
      role: "Nhân viên văn phòng",
      content: "I was confident to communicate with foreign partners thanks to practical lessons."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Master English with modern learning methods</h1>
              <p className="text-xl mb-8 text-blue-100">Comprehensive English learning platform with interactive lessons, language games and personalization support.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 text-lg shadow-lg">Start free</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">100+</div>
              <div className="text-gray-600">Interactive lesson</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10.000+</div>
              <div className="text-gray-600">Customer satisfied</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">Skill improvement rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Outstanding features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience learning English is completely different from advanced tools and methods</p>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
              {features[currentFeature].icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{features[currentFeature].title}</h3>
              <p className="text-gray-600">{features[currentFeature].description}</p>
              
              <div className="flex justify-center mt-6 space-x-2">
                {features.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full ${index === currentFeature ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Study with the community</h3>
              <p className="text-gray-600">Joining the community of thousands of English learners, sharing experiences and encouraging each other every day.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Globe className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diverse content</h3>
              <p className="text-gray-600">The lesson is suitable for many topics: communication, business, tourism, academic and many other fields.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <CheckCircle className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Monitor the progress</h3>
              <p className="text-gray-600">Smart analysis tool helps you track progress and determine improvement points.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What do customers say about us</h2>
            <p className="text-xl text-gray-600">Discover the experience of those who have succeeded in learning English</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="bg-indigo-100 text-indigo-600 font-bold rounded-full h-12 w-12 flex items-center justify-center mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to improve English skills?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Start your English learning journey today to experience the website completely free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 text-lg">Free registration</button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 text-lg">Further</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}