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

interface ProgressItem {
  subject: string;
  progress: number;
}

interface SubjectProgressProps {
  progressData: ProgressItem[];
}

const SubjectProgress: React.FC<SubjectProgressProps> = ({ progressData }) => {
  const getSubjectConfig = (subject: string) => {
    const configs: { [key: string]: { name: string; icon: React.ComponentType<any>; color: string; bgColor: string } } = {
      matematica: { 
        name: 'Matematică', 
        icon: Calculator, 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-100' 
      },
      romana: { 
        name: 'Limba Română', 
        icon: BookOpen, 
        color: 'text-emerald-600', 
        bgColor: 'bg-emerald-100' 
      },
      fizica: { 
        name: 'Fizică', 
        icon: Atom, 
        color: 'text-purple-600', 
        bgColor: 'bg-purple-100' 
      },
      chimie: { 
        name: 'Chimie', 
        icon: FlaskConical, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-100' 
      },
      biologie: { 
        name: 'Biologie', 
        icon: Dna, 
        color: 'text-green-600', 
        bgColor: 'bg-green-100' 
      },
      informatica: { 
        name: 'Informatică', 
        icon: Monitor, 
        color: 'text-slate-600', 
        bgColor: 'bg-slate-100' 
      },
      geografie: { 
        name: 'Geografie', 
        icon: Globe, 
        color: 'text-teal-600', 
        bgColor: 'bg-teal-100' 
      },
      istorie: { 
        name: 'Istorie', 
        icon: Clock, 
        color: 'text-amber-600', 
        bgColor: 'bg-amber-100' 
      },
      logica: { 
        name: 'Logică', 
        icon: Brain, 
        color: 'text-indigo-600', 
        bgColor: 'bg-indigo-100' 
      },
      filosofie: { 
        name: 'Filosofie', 
        icon: Lightbulb, 
        color: 'text-yellow-600', 
        bgColor: 'bg-yellow-100' 
      },
      economie: { 
        name: 'Economie', 
        icon: TrendingUp, 
        color: 'text-cyan-600', 
        bgColor: 'bg-cyan-100' 
      },
      sociologie: { 
        name: 'Sociologie', 
        icon: Users, 
        color: 'text-pink-600', 
        bgColor: 'bg-pink-100' 
      },
      psihologie: { 
        name: 'Psihologie', 
        icon: Heart, 
        color: 'text-rose-600', 
        bgColor: 'bg-rose-100' 
      }
    };
    return configs[subject] || { 
      name: subject, 
      icon: BookOpen, 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-100' 
    };
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Progres pe materii</h3>
      
      <div className="space-y-4 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
        {progressData.length > 0 ? (
          progressData.map((item) => {
            const config = getSubjectConfig(item.subject);
            const IconComponent = config.icon;
            
            return (
              <div key={item.subject}>
                <div className="flex items-center mb-2">
                  <div className={`p-1.5 rounded-full mr-3 ${config.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex justify-between w-full">
                    <h4 className="text-sm font-medium text-gray-700">{config.name}</h4>
                    <span className="text-sm text-gray-500">{item.progress}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.subject === 'matematica' ? 'bg-blue-600' :
                      item.subject === 'romana' ? 'bg-emerald-600' :
                      item.subject === 'fizica' ? 'bg-purple-600' :
                      item.subject === 'chimie' ? 'bg-orange-600' :
                      item.subject === 'biologie' ? 'bg-green-600' :
                      item.subject === 'informatica' ? 'bg-slate-600' :
                      item.subject === 'geografie' ? 'bg-teal-600' :
                      item.subject === 'istorie' ? 'bg-amber-600' :
                      item.subject === 'logica' ? 'bg-indigo-600' :
                      item.subject === 'filosofie' ? 'bg-yellow-600' :
                      item.subject === 'economie' ? 'bg-cyan-600' :
                      item.subject === 'sociologie' ? 'bg-pink-600' :
                      item.subject === 'psihologie' ? 'bg-rose-600' :
                      'bg-gray-600'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })
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