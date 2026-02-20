export type ProjectStatus = 'Atendido' | 'En espera' | 'Entregado';

export interface Material {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface Task {
  id: string;
  name: string;
  hours: number;
  status: 'Completado' | 'Pendiente';
  images: string[];
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  date: string;
  status: ProjectStatus;
  description: string;
  budget: number;
  deliveryDate: string;
  paymentMethod?: string;
  shippingAddress?: string;
  shippingReference?: string;
  materials: Material[];
  tasks: Task[];
  progress: number;
  mainImage: string;
}

export interface Message {
  id: string;
  sender: 'maestro' | 'cliente';
  text: string;
  timestamp: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  fullName: string;
  email: string;
  photo: string;
}

export interface MaterialPrice {
  id: string;
  name: string;
  price: number;
  unit: string;
}
