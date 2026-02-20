import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { MOCK_PROJECTS } from '../mockData';
import { ProjectStatus, UserProfile } from '../types';

interface HomeScreenProps {
  onProjectClick: (id: string) => void;
  user: UserProfile;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onProjectClick, user, projects }) => {
  const [activeTab, setActiveTab] = useState('Clientes');

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Atendido': return 'bg-cyan-400';
      case 'En espera': return 'bg-red-500';
      case 'Entregado': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case 'Atendido': return 'Atendido';
      case 'En espera': return 'En espera';
      case 'Entregado': return 'Entregado';
      default: return status;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Hola {user.displayName},</h2>
          <p className="text-white/70 text-lg">aquí estamos listos para la chamba</p>
        </div>
        <img
          src={user.photo}
          alt={user.displayName}
          className="w-16 h-16 rounded-full border-2 border-white/50 object-cover"
        />
      </div>

      <p className="text-center font-cursive text-2xl italic my-4">
        “Detalles que dan forma a la obra..”
      </p>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Busca a tus clientes"
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-md focus:outline-none"
        />
      </div>

      <div className="flex border-b border-white/20">
        {['Clientes', 'Favoritos', 'Historial'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-lg transition-all relative ${
              activeTab === tab ? 'font-bold' : 'opacity-50'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-artesa-brown rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {projects.filter(p => {
          if (activeTab === 'Historial') return p.status === 'Entregado';
          if (activeTab === 'Favoritos') return p.id === '1'; // Mock favorite
          return true;
        }).map((project) => (
          <div
            key={project.id}
            onClick={() => onProjectClick(project.id)}
            className="bg-white rounded-2xl p-3 shadow-lg flex gap-4 relative cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={project.mainImage} alt={project.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="font-bold text-lg leading-tight">{project.clientName}</h3>
                <p className="text-xs opacity-60">Fecha de solicitud: 13 Feb 2026</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={`px-4 py-1 rounded-full text-white text-xs font-bold ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] opacity-60">Detalles</span>
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(project.status)}`} />
                </div>
              </div>
            </div>
            {activeTab === 'Favoritos' && (
              <Star className="absolute top-3 right-3 text-yellow-400 fill-yellow-400" size={18} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
