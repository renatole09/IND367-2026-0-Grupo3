import React from 'react';
import { Menu, Hammer, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  onBackClick?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick, onBackClick, showBack }) => {
  return (
    <header className="flex items-center justify-between p-4 sticky top-0 bg-artesa-bg z-10">
      <div className="flex items-center gap-4">
        {showBack ? (
          <button onClick={onBackClick} className="p-2 bg-white rounded-full shadow-sm">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <button onClick={onMenuClick} className="p-2">
            <Menu size={24} />
          </button>
        )}
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="p-2">
        <Hammer size={24} className="transform -rotate-45" />
      </div>
    </header>
  );
};
