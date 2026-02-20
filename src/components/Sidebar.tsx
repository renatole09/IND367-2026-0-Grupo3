import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

import { Project, UserProfile } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  currentScreen: string;
  selectedProject: Project | null;
  user: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, currentScreen, selectedProject, user }) => {
  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'account', label: 'Mi cuenta' },
    { id: 'projects', label: 'Proyectos' },
  ];

  const projectItems = [
    { id: 'progress', label: 'Progreso' },
    { id: 'report', label: 'Reporte' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-64 bg-artesa-bg z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photo}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full border-2 border-white/50 object-cover"
                  />
                  <div>
                    <h2 className="font-bold text-lg">{user.displayName}</h2>
                    <button 
                      onClick={() => {
                        onNavigate('edit-profile');
                        onClose();
                      }}
                      className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                    >
                      Editar mi perfil &gt;
                    </button>
                  </div>
                </div>
                <button onClick={onClose} className="p-1">
                  <X size={20} />
                </button>
              </div>
            </div>

            <nav className="flex-1 py-4 overflow-y-auto">
              <div className="px-6 py-2 text-[10px] uppercase tracking-widest opacity-40 font-bold">General</div>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full text-left px-6 py-3 transition-colors ${
                    currentScreen === item.id
                      ? 'bg-white/20 font-bold'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {selectedProject && (
                <>
                  <div className="px-6 py-4 mt-4 border-t border-white/10">
                    <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-2">Proyecto Activo</div>
                    <div className="bg-white/10 p-3 rounded-xl mb-2">
                      <p className="text-xs font-bold truncate">{selectedProject.name}</p>
                      <p className="text-[10px] opacity-60">{selectedProject.clientName}</p>
                    </div>
                    {projectItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          onClose();
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors mb-1 ${
                          currentScreen === item.id
                            ? 'bg-white/30 font-bold'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-auto px-6 py-4 border-t border-white/10">
                <button
                  onClick={() => {
                    onNavigate('logout');
                    onClose();
                  }}
                  className="w-full text-left py-2 text-red-900/60 font-medium hover:text-red-900"
                >
                  Cerrar Sesión
                </button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
