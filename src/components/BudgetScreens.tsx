import React, { useState } from 'react';
import { Calendar, Search, Plus, Minus, Trash2 } from 'lucide-react';
import { MaterialPrice } from '../types';

interface NewProjectScreenProps {
  onNext: () => void;
}

export const NewProjectScreen: React.FC<{ onNext: (draft: any) => void }> = ({ onNext }) => {
  const [draft, setDraft] = useState({
    name: '',
    clientName: '',
    paymentMethod: '',
    deliveryDate: '',
    shippingAddress: '',
    shippingReference: '',
    description: ''
  });

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-bold ml-2">Nombre del proyecto</label>
          <input
            type="text"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            placeholder="Ingresa nombre del proyecto"
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold ml-2">Nombre del cliente</label>
          <input
            type="text"
            value={draft.clientName}
            onChange={(e) => setDraft({ ...draft, clientName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold ml-2">Descripción</label>
          <textarea
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="Breve descripción del trabajo..."
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold ml-2">Método de pago</label>
          <input
            type="text"
            value={draft.paymentMethod}
            onChange={(e) => setDraft({ ...draft, paymentMethod: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold ml-2">Fecha de entrega</label>
          <div className="flex gap-2">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Calendar size={24} className="text-artesa-accent" />
            </div>
            <input
              type="date"
              value={draft.deliveryDate}
              onChange={(e) => setDraft({ ...draft, deliveryDate: e.target.value })}
              className="flex-1 px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-bold ml-2">Dirección de envío</label>
          <input
            type="text"
            value={draft.shippingAddress}
            onChange={(e) => setDraft({ ...draft, shippingAddress: e.target.value })}
            placeholder="Ingrese la dirección"
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold ml-2">Referencia de envío</label>
          <input
            type="text"
            value={draft.shippingReference}
            onChange={(e) => setDraft({ ...draft, shippingReference: e.target.value })}
            placeholder="Ingrese una referencia"
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold ml-2">Presupuesto</label>
          <button
            onClick={() => onNext(draft)}
            className="w-full py-4 rounded-full bg-artesa-brown/50 text-white font-medium shadow-md"
          >
            Configurar materiales y tiempos
          </button>
        </div>
      </div>
    </div>
  );
};

interface NewBudgetScreenProps {
  onConfirm: () => void;
  materialPrices: MaterialPrice[];
  laborRate: number;
}

export const NewBudgetScreen: React.FC<NewBudgetScreenProps> = ({ 
  onConfirm, 
  materialPrices, 
  laborRate 
}) => {
  const [selectedMaterials, setSelectedMaterials] = useState<any[]>([]);
  const [laborDays, setLaborDays] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredMaterials = materialPrices.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMaterial = (m: MaterialPrice) => {
    const existing = selectedMaterials.find(item => item.id === m.id);
    if (existing) {
      setSelectedMaterials(selectedMaterials.map(item => 
        item.id === m.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setSelectedMaterials([...selectedMaterials, { ...m, quantity: 1 }]);
    }
    setSearchTerm('');
    setShowResults(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedMaterials(selectedMaterials.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalMaterials = selectedMaterials.reduce((sum, m) => sum + (m.price * m.quantity), 0);
  const totalLabor = laborDays * laborRate;
  const grandTotal = totalMaterials + totalLabor;

  return (
    <div className="p-6 space-y-8 pb-24">
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Materiales y Equipos</h3>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Buscar materiales de tu inventario..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none"
          />
          {showResults && searchTerm && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-xl z-10 overflow-hidden border-t border-gray-100">
              {filteredMaterials.length > 0 ? filteredMaterials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => addMaterial(m)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Plus size={14} className="text-artesa-brown" />
                    <span className="text-sm font-medium">{m.name}</span>
                  </div>
                  <span className="text-xs opacity-60">S/ {m.price}/{m.unit}</span>
                </button>
              )) : (
                <div className="px-4 py-3 text-sm text-gray-400 italic">No se encontraron materiales</div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          {selectedMaterials.length > 0 ? selectedMaterials.map((m) => (
            <div key={m.id} className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between border-l-4 border-artesa-brown/20">
              <div className="flex-1">
                <p className="font-bold text-sm">{m.name}</p>
                <p className="text-[10px] opacity-60">S/ {m.price} x {m.quantity} {m.unit}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                  <button onClick={() => updateQuantity(m.id, -1)} className="p-1">
                    <Minus size={14} className="text-gray-400" />
                  </button>
                  <span className="text-sm font-bold w-6 text-center">{m.quantity}</span>
                  <button onClick={() => updateQuantity(m.id, 1)} className="p-1">
                    <Plus size={14} className="text-gray-400" />
                  </button>
                </div>
                <span className="text-xs font-bold bg-artesa-brown/10 text-artesa-brown px-2 py-1 rounded uppercase min-w-[40px] text-center">
                  S/ {(m.price * m.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 bg-white/30 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-sm text-gray-400">Agrega materiales de tu inventario</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-lg">Mano de obra</h3>
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border-l-4 border-artesa-brown">
          <div>
            <p className="font-bold text-sm">Tiempo de elaboración</p>
            <p className="text-[10px] opacity-60">Tarifa: S/ {laborRate} por día</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
              <button onClick={() => setLaborDays(Math.max(1, laborDays - 1))} className="p-1">
                <Minus size={14} className="text-gray-400" />
              </button>
              <span className="text-sm font-bold w-6 text-center">{laborDays}</span>
              <button onClick={() => setLaborDays(laborDays + 1)} className="p-1">
                <Plus size={14} className="text-gray-400" />
              </button>
            </div>
            <span className="text-xs font-bold bg-artesa-brown text-white px-2 py-1 rounded uppercase min-w-[40px] text-center">
              S/ {(laborDays * laborRate).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2 py-6 bg-white rounded-3xl shadow-xl border border-artesa-brown/10">
        <h3 className="text-sm uppercase tracking-widest font-bold opacity-40">Resumen total</h3>
        <p className="text-5xl font-bold text-artesa-brown">S/ {grandTotal.toFixed(2)}</p>
      </div>

      <button
        onClick={() => onConfirm({ materials: selectedMaterials, budget: grandTotal })}
        className="w-full py-5 rounded-full bg-artesa-brown text-white font-bold text-lg shadow-xl active:scale-95 transition-transform"
      >
        Confirmar y enviar presupuesto
      </button>
    </div>
  );
};
