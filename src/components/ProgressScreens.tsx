import React from 'react';
import { Send, Plus, Flag, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProgressScreenProps {
  project: Project;
  onTaskClick: () => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ project, onTaskClick }) => {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
        <h2 className="text-3xl font-bold leading-tight">{project.name}</h2>
        <div className="space-y-2">
          <p className="text-sm font-medium">Porcentaje de avance</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-artesa-accent/50 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-artesa-accent/50 rounded-full shadow-md"
                style={{ left: `calc(${project.progress}% - 12px)` }}
              />
            </div>
            <span className="text-xl font-bold text-artesa-accent/70">{project.progress}%</span>
          </div>
        </div>
        <div className="text-sm opacity-70">
          <p>Cliente: {project.clientName}</p>
          <p>Fecha estimada: {project.deliveryDate}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
        <h3 className="text-xl font-bold">Chat con cliente</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Escribe un mensaje"
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
              <Send size={20} className="text-gray-400" />
            </button>
          </div>
          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <Plus size={24} className="text-gray-400" />
            </div>
            <span className="text-[10px] opacity-60">Foto</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Checklist de Tareas</h3>
          <button onClick={onTaskClick} className="p-2 bg-gray-100 rounded-full">
            <ArrowRight size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="space-y-6">
          {project.tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                task.status === 'Completado' ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
              }`}>
                {task.status === 'Completado' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{task.name}</h4>
                <div className="flex items-center gap-2 text-sm opacity-60">
                  <Flag size={16} />
                  <span>{task.status === 'Completado' ? `Completado: ${task.hours} hr` : `Estimado: ${task.hours} hr`}</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {task.images.slice(0, 2).map((img, i) => (
                  <img key={i} src={img} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                ))}
                {task.images.length === 0 && <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TaskDetailScreen: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-white rounded-t-[40px] mt-4 min-h-screen p-8 space-y-8 shadow-2xl">
      <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
      
      <h2 className="text-4xl font-bold">{project.name}</h2>
      
      <div className="space-y-2">
        <p className="opacity-70 text-lg">Agregue notas importantes del detalle del proyecto o cambios a realizar.</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <p className="text-sm font-medium opacity-50 uppercase tracking-wider"># Imágenes enviadas</p>
          <div className="flex -space-x-3">
            {project.tasks.flatMap(t => t.images).slice(0, 4).map((img, i) => (
              <img key={i} src={img} className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm" />
            ))}
            <div className="w-12 h-12 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center shadow-sm">
              <Plus size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
        <div className="space-y-2 text-right">
          <p className="text-sm font-medium opacity-50 uppercase tracking-wider">Fecha de entrega</p>
          <p className="font-bold text-lg">{project.deliveryDate}</p>
        </div>
      </div>

      <div className="space-y-4">
        {project.tasks.map((task) => (
          <div key={task.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-bold">{task.name}</h4>
              <div className="flex items-center gap-2 opacity-50">
                <Flag size={20} />
                <span className="text-lg">{task.hours} hr</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {task.images.map((img, i) => (
                    <img key={i} src={img} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Plus size={20} className="text-gray-400" />
                </button>
                <span className="text-sm opacity-40">Añadir evidencia</span>
              </div>
              <span className={`font-bold ${task.status === 'Completado' ? 'text-gray-600' : 'opacity-40'}`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
