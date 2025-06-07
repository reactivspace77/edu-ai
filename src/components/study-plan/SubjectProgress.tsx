import React from 'react';
import { BookOpen } from 'lucide-react';

interface ProgressItem {
  subject: string;
  progress: number;
}

interface SubjectProgressProps {
  progressData: ProgressItem[];
}

const SubjectProgress: React.FC<SubjectProgressProps> = ({ progressData }) => {
  const getSubjectName = (subject: string) => {
    const names: { [key: string]: string } = {
      matematica: 'Matematică',
      romana: 'Limba Română',
      fizica: 'Fizică',
      chimie: 'Chimie',
      biologie: 'Biologie',
      istorie: 'Istorie',
      geografie: 'Geografie'
    };
    return names[subject] || subject;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Progres pe materii</h3>
      
      <div className="space-y-4 border border-gray-200 rounded-lg p-4">
        {progressData.length > 0 ? (
          progressData.map((item) => (
            <div key={item.subject}>
              <div className="flex items-center mb-2">
                <div className="p-1.5 bg-indigo-100 rounded-full mr-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="flex justify-between w-full">
                  <h4 className="text-sm font-medium text-gray-700">{getSubjectName(item.subject)}</h4>
                  <span className="text-sm text-gray-500">{item.progress}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 text-center py-4">
            Nu există date despre progres. Începe să rezolvi lecții pentru a vedea progresul.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectProgress;