import React from 'react';
import { Check } from 'lucide-react';

interface SubjectSelectorProps {
  selectedSubjects: string[];
  onToggle: (subject: string) => void;
  examType?: 'evaluareNationala' | 'bacalaureat';
  grade?: number;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ selectedSubjects, onToggle, examType }) => {
  const getSubjects = () => {
    if (examType === 'evaluareNationala') {
      return [
        { id: 'matematica', name: 'Matematică' },
        { id: 'romana', name: 'Limba Română' },
      ];
    } else if (examType === 'bacalaureat') {
      const commonSubjects = [
        { id: 'matematica', name: 'Matematică' },
        { id: 'romana', name: 'Limba Română' },
      ];

      const profileSubjects = {
        'real': [
          { id: 'fizica', name: 'Fizică' },
          { id: 'chimie', name: 'Chimie' },
          { id: 'biologie', name: 'Biologie' },
          { id: 'informatica', name: 'Informatică' },
        ],
        'uman': [
          { id: 'istorie', name: 'Istorie' },
          { id: 'geografie', name: 'Geografie' },
          { id: 'logica', name: 'Logică' },
          { id: 'filosofie', name: 'Filosofie' },
          { id: 'economie', name: 'Economie' },
          { id: 'sociologie', name: 'Sociologie' },
          { id: 'psihologie', name: 'Psihologie' },
        ],
        'tehnologic': [
          { id: 'fizica', name: 'Fizică' },
          { id: 'chimie', name: 'Chimie' },
          { id: 'biologie', name: 'Biologie' },
        ],
      };

      return [...commonSubjects, ...profileSubjects['real'], ...profileSubjects['uman'], ...profileSubjects['tehnologic']];
    }

    return [];
  };

  const subjects = getSubjects();

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Alege materiile pentru examen</h3>
      <p className="text-sm text-gray-500 mb-6">
        {examType === 'evaluareNationala' 
          ? 'Selectează materia la care dorești să te pregătești.'
          : 'Selectează materiile obligatorii și materiile de profil pentru Bacalaureat.'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <div 
            key={subject.id}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all
              ${selectedSubjects.includes(subject.id)
                ? 'bg-indigo-50 border-indigo-600'
                : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => onToggle(subject.id)}
          >
            <div className="flex items-center">
              {selectedSubjects.includes(subject.id) && (
                <div className="absolute top-2 right-2">
                  <div className="bg-indigo-600 rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
              
              <div className="ml-2">
                <h4 className="text-sm font-medium text-gray-900">{subject.name}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {examType === 'evaluareNationala' && selectedSubjects.length === 0 && (
        <div className="mt-4 text-sm text-amber-600">
          Te rugăm să selectezi o materie pentru a continua.
        </div>
      )}
      
      {examType === 'bacalaureat' && selectedSubjects.length < 2 && (
        <div className="mt-4 text-sm text-amber-600">
          Te rugăm să selectezi cel puțin materiile obligatorii (Matematică și Limba Română).
        </div>
      )}
    </div>
  );
};

export default SubjectSelector;