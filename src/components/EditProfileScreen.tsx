import React, { useState } from 'react';
import { Camera, User, Mail, Lock, Trash2, Save, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';

interface EditProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onUpdateUser }) => {
  const [profile, setProfile] = useState<UserProfile>({ ...user });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSave = () => {
    onUpdateUser(profile);
    alert('Perfil actualizado correctamente');
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      {/* Profile Photo Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={profile.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-artesa-brown text-white rounded-full shadow-lg active:scale-90 transition-transform">
            <Camera size={20} />
          </button>
        </div>
        <p className="text-sm opacity-60 font-medium">Toca la cámara para cambiar foto</p>
      </div>

      {/* Basic Info Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg px-2">Información Personal</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <Lock size={20} className="text-artesa-brown opacity-50" />
            <div className="flex-1">
              <label className="text-[10px] uppercase font-bold opacity-40 block">Usuario (Login)</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full bg-transparent focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <BadgeCheck size={20} className="text-artesa-brown opacity-50" />
            <div className="flex-1">
              <label className="text-[10px] uppercase font-bold opacity-40 block">Nombre de preferencia (App)</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                className="w-full bg-transparent focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <User size={20} className="text-artesa-brown opacity-50" />
            <div className="flex-1">
              <label className="text-[10px] uppercase font-bold opacity-40 block">Nombre completo (Registro)</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-transparent focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <Mail size={20} className="text-artesa-brown opacity-50" />
            <div className="flex-1">
              <label className="text-[10px] uppercase font-bold opacity-40 block">Correo electrónico</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-transparent focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg px-2">Seguridad</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <Lock size={20} className="text-artesa-brown opacity-50" />
            <div className="flex-1">
              <label className="text-[10px] uppercase font-bold opacity-40 block">Contraseña actual</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full bg-transparent focus:outline-none font-medium"
              />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <Lock size={20} className="text-artesa-brown opacity-50" />
            <div className="flex-1">
              <label className="text-[10px] uppercase font-bold opacity-40 block">Nueva contraseña</label>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="w-full bg-transparent focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="space-y-4 pt-4">
        <button 
          onClick={handleSave}
          className="w-full py-5 rounded-full bg-artesa-brown text-white font-bold text-lg shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Save size={20} />
          Guardar Cambios
        </button>

        <button className="w-full py-4 rounded-full bg-white text-red-600 font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform border border-red-100">
          <Trash2 size={18} />
          Borrar Cuenta
        </button>
      </div>

      <p className="text-center text-[10px] opacity-40 uppercase tracking-widest font-bold">
        ArtesaTrack v1.0.0
      </p>
    </div>
  );
};
