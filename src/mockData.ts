import { Project } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Mesa de Centro Minimalista',
    clientName: 'Sara Robles',
    date: '23/03',
    status: 'Atendido',
    description: 'Mueble de mesa de centro minimalista de madera de ebano. Se acordo adicional bla bla bla...',
    budget: 100.00,
    deliveryDate: 'Lunes, 23 Marzo 2026',
    mainImage: 'https://picsum.photos/seed/table1/400/300',
    progress: 65,
    materials: [
      { id: 'm1', name: 'Madera de ebano', price: 10.00, unit: 'plancha', quantity: 1 },
      { id: 'm2', name: 'Barniz', price: 10.00, unit: 'litro', quantity: 1 },
      { id: 'm3', name: 'Tornillos', price: 10.00, unit: 'caja', quantity: 1 },
    ],
    tasks: [
      { id: 't1', name: 'Corte y Armado', hours: 25, status: 'Completado', images: ['https://picsum.photos/seed/wood1/200/200', 'https://picsum.photos/seed/wood2/200/200'] },
      { id: 't2', name: 'Lijado', hours: 18, status: 'Completado', images: ['https://picsum.photos/seed/wood3/200/200'] },
      { id: 't3', name: 'Pintado', hours: 8, status: 'Pendiente', images: ['https://picsum.photos/seed/wood4/200/200'] },
      { id: 't4', name: 'Entrega', hours: 2, status: 'Pendiente', images: [] },
    ]
  },
  {
    id: '2',
    name: 'Mueble de Mesa de Sala',
    clientName: 'Mario Gomez',
    date: '15/03',
    status: 'En espera',
    description: 'Mueble de sala elegante.',
    budget: 450.00,
    deliveryDate: 'Viernes, 15 Marzo 2026',
    mainImage: 'https://picsum.photos/seed/table2/400/300',
    progress: 0,
    materials: [],
    tasks: []
  },
  {
    id: '3',
    name: 'Juego de Sala de TV',
    clientName: 'Roberto Quispe',
    date: '30/03',
    status: 'Entregado',
    description: 'Juego de sala completo.',
    budget: 1200.00,
    deliveryDate: 'Lunes, 30 Marzo 2026',
    mainImage: 'https://picsum.photos/seed/tv/400/300',
    progress: 100,
    materials: [],
    tasks: []
  }
];
