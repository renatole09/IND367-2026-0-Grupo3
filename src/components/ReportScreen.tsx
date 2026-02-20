import React, { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { Project } from '../types';

interface ReportScreenProps {
  project: Project;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState('Resumen');

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex gap-4">
        {['Resumen', 'Imagenes', 'PDF'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-full text-lg transition-all ${
              activeTab === tab ? 'bg-black text-white font-bold' : 'bg-white text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Resumen' && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 bg-white rounded-xl p-5 shadow-md">
              <p className="font-bold text-sm mb-2">Presupuesto</p>
              <p className="text-4xl font-bold">S/. {project.budget.toFixed(2)}</p>
              <p className="text-[10px] opacity-40 mt-1">*Precio variable</p>
            </div>
            <div className="flex-1 bg-white rounded-xl p-5 shadow-md">
              <p className="font-bold text-sm mb-2">Fecha de entrega</p>
              <p className="text-4xl font-bold">{project.date}</p>
              <p className="text-[10px] opacity-40 mt-1">*Fecha variable</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <h3 className="font-bold text-lg">Detalles</h3>
            <div className="overflow-hidden rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-400 text-white">
                  <tr>
                    <th className="py-2 px-3 text-left">#</th>
                    <th className="py-2 px-3 text-left">Nombre</th>
                    <th className="py-2 px-3 text-left">Cantidad</th>
                    <th className="py-2 px-3 text-right">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {project.materials.map((m, i) => (
                    <tr key={m.id}>
                      <td className="py-3 px-3">{i + 1}</td>
                      <td className="py-3 px-3">{m.name}</td>
                      <td className="py-3 px-3">{m.quantity} {m.unit}</td>
                      <td className="py-3 px-3 text-right">S/ {m.price.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td colSpan={3} className="py-4 px-3 text-right">Total</td>
                    <td className="py-4 px-3 text-right">S/ {project.materials.reduce((acc, m) => acc + m.price, 0).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md space-y-2">
            <h3 className="font-bold text-lg">Descripcion</h3>
            <p className="text-sm opacity-80 leading-relaxed">{project.description}</p>
          </div>
        </div>
      )}

      {activeTab === 'Imagenes' && (
        <div className="space-y-4">
          {project.tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl p-6 shadow-md space-y-4">
              <h3 className="font-bold text-xl">{task.name}</h3>
              <div className="flex gap-4">
                {task.images.map((img, i) => (
                  <div key={i} className="w-32 h-32 rounded-xl overflow-hidden shadow-sm">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
                <button className="w-32 h-32 rounded-xl border-2 border-gray-200 flex items-center justify-center">
                  <Plus size={32} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'PDF' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-xl">Descarga Maestro</h3>
              <p className="text-sm opacity-60">Reporte_mueble_de_sobremesa.pdf</p>
              <button className="mt-2">
                <Download size={32} />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-xl">Descarga Cliente</h3>
              <p className="text-sm opacity-60">Reporte_cliente_mueble_de_sobremesa.pdf</p>
              <button className="mt-2">
                <Download size={32} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
