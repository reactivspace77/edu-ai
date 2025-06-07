import React from 'react';

interface SubjectTabsProps {
  subjects: string[];
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({ subjects, activeSubject, onSubjectChange }) => {
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
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Materii">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => onSubjectChange(subject)}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSubject === subject
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {getSubjectName(subject)}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SubjectTabs;