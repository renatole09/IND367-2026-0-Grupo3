import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Hammer, Scissors, AlertCircle } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-artesa-bg flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <Hammer size={64} className="text-artesa-brown transform -rotate-45 absolute" />
          <Scissors size={48} className="text-artesa-brown absolute translate-x-4 -translate-y-2" />
        </div>
        <h1 className="text-3xl font-serif text-artesa-brown mt-4 font-bold tracking-tight">ArtesaTrack</h1>
      </motion.div>
    </div>
  );
};

interface LoginScreenProps {
  onLogin: () => void;
  validUsername: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, validUsername }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === validUsername && password === '1234') {
      onLogin();
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-artesa-bg flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center mb-12">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Hammer size={48} className="text-artesa-brown transform -rotate-45 absolute" />
          <Scissors size={32} className="text-artesa-brown absolute translate-x-3 -translate-y-1" />
        </div>
        <h1 className="text-2xl font-serif text-artesa-brown mt-2 font-bold">ArtesaTrack</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm"
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            className="w-full px-6 py-4 rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-artesa-brown/20"
          />
        </div>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="w-full px-6 py-4 rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-artesa-brown/20"
          />
        </div>
        
        <button type="button" className="w-full text-center text-sm italic opacity-60">
          ¿Olvidaste tu contraseña?
        </button>

        <button
          type="submit"
          className="w-full py-5 rounded-full bg-artesa-brown text-white font-bold text-xl shadow-xl active:scale-95 transition-transform mt-8"
        >
          Iniciar Sesión
        </button>

        <p className="text-center text-sm mt-4">
          ¿No tienes una cuenta? <button type="button" className="font-bold opacity-60">Regístrate</button>
        </p>
      </form>
    </div>
  );
};
