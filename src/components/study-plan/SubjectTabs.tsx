import React from 'react';
import { 
  Calculator, 
  BookOpen, 
  Atom, 
  FlaskConical, 
  Dna, 
  Monitor, 
  Globe, 
  Clock, 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Heart 
} from 'lucide-react';

interface SubjectTabsProps {
  subjects: string[];
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({ subjects, activeSubject, onSubjectChange }) => {
  const getSubjectConfig = (subject: string) => {
    const configs: { [key: string]: { name: string; icon: React.ComponentType<any>; color: string; bgColor: string; hoverColor: string } } = {
      matematica: { 
        name: 'Matematică', 
        icon: Calculator, 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-100', 
        hoverColor: 'hover:bg-blue-50' 
      },
      romana: { 
        name: 'Limba Română', 
        icon: BookOpen, 
        color: 'text-emerald-600', 
        bgColor: 'bg-emerald-100', 
        hoverColor: 'hover:bg-emerald-50' 
      },
      fizica: { 
        name: 'Fizică', 
        icon: Atom, 
        color: 'text-purple-600', 
        bgColor: 'bg-purple-100', 
        hoverColor: 'hover:bg-purple-50' 
      },
      chimie: { 
        name: 'Chimie', 
        icon: FlaskConical, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-100', 
        hoverColor: 'hover:bg-orange-50' 
      },
      biologie: { 
        name: 'Biologie', 
        icon: Dna, 
        color: 'text-green-600', 
        bgColor: 'bg-green-100', 
        hoverColor: 'hover:bg-green-50' 
      },
      informatica: { 
        name: 'Informatică', 
        icon: Monitor, 
        color: 'text-slate-600', 
        bgColor: 'bg-slate-100', 
        hoverColor: 'hover:bg-slate-50' 
      },
      geografie: { 
        name: 'Geografie', 
        icon: Globe, 
        color: 'text-teal-600', 
        bgColor: 'bg-teal-100', 
        hoverColor: 'hover:bg-teal-50' 
      },
      istorie: { 
        name: 'Istorie', 
        icon: Clock, 
        color: 'text-amber-600', 
        bgColor: 'bg-amber-100', 
        hoverColor: 'hover:bg-amber-50' 
      },
      logica: { 
        name: 'Logică', 
        icon: Brain, 
        color: 'text-indigo-600', 
        bgColor: 'bg-indigo-100', 
        hoverColor: 'hover:bg-indigo-50' 
      },
      filosofie: { 
        name: 'Filosofie', 
        icon: Lightbulb, 
        color: 'text-yellow-600', 
        bgColor: 'bg-yellow-100', 
        hoverColor: 'hover:bg-yellow-50' 
      },
      economie: { 
        name: 'Economie', 
        icon: TrendingUp, 
        color: 'text-cyan-600', 
        bgColor: 'bg-cyan-100', 
        hoverColor: 'hover:bg-cyan-50' 
      },
      sociologie: { 
        name: 'Sociologie', 
        icon: Users, 
        color: 'text-pink-600', 
        bgColor: 'bg-pink-100', 
        hoverColor: 'hover:bg-pink-50' 
      },
      psihologie: { 
        name: 'Psihologie', 
        icon: Heart, 
        color: 'text-rose-600', 
        bgColor: 'bg-rose-100', 
        hoverColor: 'hover:bg-rose-50' 
      }
    };
    return configs[subject] || { 
      name: subject, 
      icon: BookOpen, 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-100', 
      hoverColor: 'hover:bg-gray-50' 
    };
  };

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide pb-4 -mb-px" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <nav className="flex space-x-2 min-w-max" aria-label="Materii">
            {subjects.map((subject) => {
              const config = getSubjectConfig(subject);
              const IconComponent = config.icon;
              const isActive = activeSubject === subject;
              
              return (
                <button
                  key={subject}
                  onClick={() => onSubjectChange(subject)}
                  className={`flex items-center whitespace-nowrap px-4 py-3 border-b-2 font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
                    isActive
                      ? `border-current ${config.color} ${config.bgColor} rounded-t-lg shadow-sm`
                      : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ${config.hoverColor} rounded-lg`
                  }`}
                >
                  <div className={`p-1.5 rounded-full mr-2 transition-colors ${
                    isActive ? 'bg-white shadow-sm' : config.bgColor
                  }`}>
                    <IconComponent className={`h-4 w-4 ${
                      isActive ? config.color : 'text-gray-500'
                    }`} />
                  </div>
                  <span className="font-medium">{config.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SubjectTabs;