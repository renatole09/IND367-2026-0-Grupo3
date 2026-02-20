import React from 'react';
import { Plus } from 'lucide-react';
import { Project } from '../types';

interface ProjectsScreenProps {
  projects: Project[];
  onProjectClick: (id: string) => void;
  onAddClick: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ projects, onProjectClick, onAddClick }) => {
  return (
    <div className="p-4 space-y-4 pb-24">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => onProjectClick(project.id)}
          className="bg-white rounded-xl p-5 shadow-md cursor-pointer active:scale-[0.98] transition-transform"
        >
          <h3 className="font-bold text-lg mb-2">{project.name}</h3>
          <div className="space-y-1 text-sm opacity-80">
            <p>Fecha: {project.date}</p>
            <p>Cliente: {project.clientName}</p>
          </div>
        </div>
      ))}

      <button
        onClick={onAddClick}
        className="fixed bottom-8 right-6 w-16 h-16 bg-artesa-brown/60 rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform"
      >
        <Plus size={32} />
      </button>
    </div>
  );
};
