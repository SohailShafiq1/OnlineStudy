import React from 'react';
import Card from '../components/Card';

/**
 * Past Papers Page - Archive of past examination papers
 */
const PastPapers = () => {
  const paperCategories = [
    { title: '9th Class Past Papers', icon: '📝', description: '2019-2024 solved papers', link: '/past-papers/9th' },
    { title: '10th Class Past Papers', icon: '📝', description: 'Matric board papers', link: '/past-papers/10th' },
    { title: '11th Class Past Papers', icon: '📝', description: 'FSc Part 1 papers', link: '/past-papers/11th' },
    { title: '12th Class Past Papers', icon: '📝', description: 'FSc Part 2 papers', link: '/past-papers/12th' },
    { title: 'MDCAT Past Papers', icon: '🎓', description: '5+ years MDCAT papers', link: '/past-papers/mdcat' },
    { title: 'NUMS Past Papers', icon: '⚕️', description: 'NUMS test papers', link: '/past-papers/nums' },
    { title: 'NUST Past Papers', icon: '🏛️', description: 'NUST NET papers', link: '/past-papers/nust' },
    { title: 'AKU Past Papers', icon: '🏥', description: 'AKU entrance papers', link: '/past-papers/aku' },
  ];

  // Sample years for demonstration
  const years = ['2024', '2023', '2022', '2021', '2020', '2019'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📄 Past Papers Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download and practice with past examination papers from previous years. 
            All papers include solutions and marking schemes.
          </p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {paperCategories.map((category, index) => (
            <Card
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              link={category.link}
            />
          ))}
        </div>

        {/* Sample Papers Section */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Years
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {years.map((year) => (
              <div
                key={year}
                className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 text-center border-2 border-blue-200 hover:border-primary transition cursor-pointer"
              >
                <div className="text-2xl font-bold text-primary">{year}</div>
                <div className="text-xs text-gray-600 mt-1">Available</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg mb-2">Solved Papers</h3>
            <p className="text-gray-600 text-sm">Complete solutions with explanations</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">📥</div>
            <h3 className="font-bold text-lg mb-2">Downloadable PDFs</h3>
            <p className="text-gray-600 text-sm">Download and study offline</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2">Board Specific</h3>
            <p className="text-gray-600 text-sm">Papers from all major boards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastPapers;
