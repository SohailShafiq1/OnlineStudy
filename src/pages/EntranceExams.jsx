import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const EntranceExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const querySnapshot = await getDocs(collection(db, 'entranceExams'));
      setExams(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎓 Entrance Exams
          </h1>
          <p className="text-xl text-gray-600">
            Download PDFs for various entrance exams
          </p>
        </div>

        {/* Exams List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition border-l-4 border-primary"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {exam.name}
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={exam.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntranceExams;