import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, Save, X, Clock } from 'lucide-react';
import { MaterialPrice } from '../types';

interface AccountScreenProps {
  materials: MaterialPrice[];
  setMaterials: React.Dispatch<React.SetStateAction<MaterialPrice[]>>;
  laborRate: number;
  setLaborRate: React.Dispatch<React.SetStateAction<number>>;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ 
  materials, 
  setMaterials, 
  laborRate, 
  setLaborRate 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<MaterialPrice | null>(null);
  const [isEditingLabor, setIsEditingLabor] = useState(false);
  const [tempLabor, setTempLabor] = useState(laborRate);

  const handleEdit = (m: MaterialPrice) => {
    setEditingId(m.id);
    setEditForm({ ...m });
  };

  const handleSave = () => {
    if (editForm) {
      setMaterials(materials.map(m => m.id === editForm.id ? editForm : m));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleSaveLabor = () => {
    setLaborRate(tempLabor);
    setIsEditingLabor(false);
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Gestión de Precios</h2>
        <p className="text-sm opacity-60">Define los costos base de tus materiales y mano de obra para los presupuestos.</p>
      </div>

      {/* Labor Rate Section */}
      <div className="bg-white rounded-2xl p-5 shadow-md border-l-4 border-artesa-brown">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-artesa-brown/10 rounded-lg text-artesa-brown">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Mano de Obra</h3>
              <p className="text-xs opacity-60">Costo por día de trabajo</p>
            </div>
          </div>
          {isEditingLabor ? (
            <div className="flex gap-2">
              <button onClick={handleSaveLabor} className="p-2 bg-green-100 text-green-600 rounded-full">
                <Save size={18} />
              </button>
              <button onClick={() => setIsEditingLabor(false)} className="p-2 bg-red-100 text-red-600 rounded-full">
                <X size={18} />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditingLabor(true)} className="p-2 bg-gray-100 text-gray-600 rounded-full">
              <Edit2 size={18} />
            </button>
          )}
        </div>
        
        {isEditingLabor ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">S/</span>
            <input
              type="number"
              value={tempLabor}
              onChange={(e) => setTempLabor(Number(e.target.value))}
              className="w-full text-3xl font-bold border-b-2 border-artesa-brown focus:outline-none"
            />
            <span className="text-lg opacity-60">/ día</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-artesa-brown">S/ {laborRate}</span>
            <span className="text-sm opacity-60 font-medium">por día de elaboración</span>
          </div>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar material..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {materials.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl p-4 shadow-md flex items-center justify-between gap-4">
            {editingId === m.id ? (
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="text"
                  value={editForm?.name}
                  onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })}
                  className="font-bold border-b border-gray-200 focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-60">S/</span>
                  <input
                    type="number"
                    value={editForm?.price}
                    onChange={(e) => setEditForm({ ...editForm!, price: Number(e.target.value) })}
                    className="w-20 border-b border-gray-200 focus:outline-none text-sm"
                  />
                  <span className="text-sm opacity-60">/</span>
                  <input
                    type="text"
                    value={editForm?.unit}
                    onChange={(e) => setEditForm({ ...editForm!, unit: e.target.value })}
                    className="w-12 border-b border-gray-200 focus:outline-none text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <h4 className="font-bold text-lg">{m.name}</h4>
                <p className="text-sm opacity-60">S/ {m.price.toFixed(2)} por {m.unit}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              {editingId === m.id ? (
                <>
                  <button onClick={handleSave} className="p-2 bg-green-100 text-green-600 rounded-full">
                    <Save size={18} />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-2 bg-red-100 text-red-600 rounded-full">
                    <X size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(m)} className="p-2 bg-gray-100 text-gray-600 rounded-full">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 bg-gray-100 text-red-400 rounded-full">
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-4 rounded-xl border-2 border-dashed border-artesa-brown/30 text-artesa-brown font-bold flex items-center justify-center gap-2 hover:bg-white/50 transition-colors">
        <Plus size={20} />
        Agregar Nuevo Material
      </button>
    </div>
  );
};
/*EL ZAPATO */
