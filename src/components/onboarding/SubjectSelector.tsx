import React from 'react';
import { Check, Calculator, BookOpen, Atom, FlaskConical, Dna, Monitor, Globe, Clock, Brain, Lightbulb, TrendingUp, Users, Heart } from 'lucide-react';

interface SubjectSelectorProps {
  selectedSubjects: string[];
  onToggle: (subject: string) => void;
  examType?: 'evaluareNationala' | 'bacalaureat';
  grade?: number;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ selectedSubjects, onToggle, examType }) => {
  const getSubjectConfig = (subjectId: string, name: string) => {
    const configs: { [key: string]: { icon: React.ComponentType<any>; color: string; bgColor: string } } = {
      matematica: { icon: Calculator, color: 'text-blue-600', bgColor: 'bg-blue-100' },
      romana: { icon: BookOpen, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
      fizica: { icon: Atom, color: 'text-purple-600', bgColor: 'bg-purple-100' },
      chimie: { icon: FlaskConical, color: 'text-orange-600', bgColor: 'bg-orange-100' },
      biologie: { icon: Dna, color: 'text-green-600', bgColor: 'bg-green-100' },
      informatica: { icon: Monitor, color: 'text-slate-600', bgColor: 'bg-slate-100' },
      geografie: { icon: Globe, color: 'text-teal-600', bgColor: 'bg-teal-100' },
      istorie: { icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-100' },
      logica: { icon: Brain, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
      filosofie: { icon: Lightbulb, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
      economie: { icon: TrendingUp, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
      sociologie: { icon: Users, color: 'text-pink-600', bgColor: 'bg-pink-100' },
      psihologie: { icon: Heart, color: 'text-rose-600', bgColor: 'bg-rose-100' }
    };
    return configs[subjectId] || { icon: BookOpen, color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
        {subjects.map((subject) => {
          const config = getSubjectConfig(subject.id, subject.name);
          const IconComponent = config.icon;
          const isSelected = selectedSubjects.includes(subject.id);
          
          return (
            <div 
              key={subject.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                isSelected
                  ? `${config.bgColor} border-current shadow-md`
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => onToggle(subject.id)}
            >
              <div className="flex items-center">
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className={`rounded-full p-1 ${
                      subject.id === 'matematica' ? 'bg-blue-600' :
                      subject.id === 'romana' ? 'bg-emerald-600' :
                      subject.id === 'fizica' ? 'bg-purple-600' :
                      subject.id === 'chimie' ? 'bg-orange-600' :
                      subject.id === 'biologie' ? 'bg-green-600' :
                      subject.id === 'informatica' ? 'bg-slate-600' :
                      subject.id === 'geografie' ? 'bg-teal-600' :
                      subject.id === 'istorie' ? 'bg-amber-600' :
                      subject.id === 'logica' ? 'bg-indigo-600' :
                      subject.id === 'filosofie' ? 'bg-yellow-600' :
                      subject.id === 'economie' ? 'bg-cyan-600' :
                      subject.id === 'sociologie' ? 'bg-pink-600' :
                      subject.id === 'psihologie' ? 'bg-rose-600' :
                      'bg-gray-600'
                    }`}>
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </div>
                )}
                
                <div className={`p-2 rounded-full mr-3 ${
                  isSelected ? 'bg-white shadow-sm' : config.bgColor
                }`}>
                  <IconComponent className={`h-5 w-5 ${config.color}`} />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{subject.name}</h4>
                </div>
              </div>
            </div>
          );
        })}
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