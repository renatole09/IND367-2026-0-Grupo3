import { useState, useEffect } from 'react';
import { SplashScreen, LoginScreen } from './components/AuthScreens';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './components/HomeScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import { NewProjectScreen, NewBudgetScreen } from './components/BudgetScreens';
import { ProgressScreen, TaskDetailScreen } from './components/ProgressScreens';
import { ReportScreen } from './components/ReportScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { AccountScreen } from './components/AccountScreen';
import { MOCK_PROJECTS } from './mockData';
import { Project, UserProfile, MaterialPrice } from './types';

type Screen = 'splash' | 'login' | 'home' | 'projects' | 'new-project' | 'new-budget' | 'progress' | 'task-detail' | 'report' | 'account' | 'edit-profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProjectDraft, setNewProjectDraft] = useState<Partial<Project>>({});
  const [user, setUser] = useState<UserProfile>({
    username: 'hola',
    displayName: 'Jorge',
    fullName: 'Jorge Maestro',
    email: 'jorge@artesatrack.com',
    photo: 'https://i.pravatar.cc/150?u=jorge'
  });

  const [materials, setMaterials] = useState<MaterialPrice[]>([
    { id: '1', name: 'Madera de Roble', price: 50, unit: 'm' },
    { id: '2', name: 'Madera de Pino', price: 30, unit: 'm' },
    { id: '3', name: 'Madera de Cedro', price: 45, unit: 'm' },
    { id: '4', name: 'Resina Epóxica', price: 60, unit: 'kg' },
    { id: '5', name: 'Tornillos', price: 15, unit: 'und' },
  ]);

  const [laborRate, setLaborRate] = useState(150); // S/ por día

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setSelectedProject(project);
      setScreen('progress');
    }
  };

  const handleCreateProject = (budgetData: { materials: any[], budget: number }) => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProjectDraft.name || 'Nuevo Proyecto',
      clientName: newProjectDraft.clientName || 'Cliente',
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      status: 'Atendido',
      description: newProjectDraft.description || '',
      budget: budgetData.budget,
      deliveryDate: newProjectDraft.deliveryDate || '',
      mainImage: `https://picsum.photos/seed/${Math.random()}/400/300`,
      progress: 0,
      materials: budgetData.materials,
      tasks: [
        { id: 't1', name: 'Preparación', hours: 0, status: 'Pendiente', images: [] },
        { id: 't2', name: 'Corte', hours: 0, status: 'Pendiente', images: [] },
        { id: 't3', name: 'Lijado', hours: 0, status: 'Pendiente', images: [] },
        { id: 't4', name: 'Acabado', hours: 0, status: 'Pendiente', images: [] },
      ]
    };

    setProjects([newProject, ...projects]);
    setNewProjectDraft({});
    setScreen('projects');
  };

  const handleNavigate = (id: string) => {
    switch (id) {
      case 'projects': setScreen('projects'); break;
      case 'progress': 
        if (selectedProject) setScreen('progress');
        else setScreen('projects'); 
        break;
      case 'report': 
        if (selectedProject) setScreen('report');
        else setScreen('projects');
        break;
      case 'home': setScreen('home'); break;
      case 'account': setScreen('account'); break;
      case 'edit-profile': setScreen('edit-profile'); break;
      case 'logout': 
        setSelectedProject(null);
        setScreen('login'); 
        break;
      default: break;
    }
  };

  const getTitle = () => {
    switch (screen) {
      case 'home': return 'Inicio';
      case 'projects': return 'Proyectos';
      case 'new-project': return 'Nuevo Proyecto';
      case 'new-budget': return 'Nuevo Presupuesto';
      case 'progress': return 'Progreso';
      case 'task-detail': return 'Detalle de Tareas';
      case 'report': return 'Reporte';
      case 'account': return 'Mi Cuenta';
      case 'edit-profile': return 'Editar Perfil';
      default: return '';
    }
  };

  if (screen === 'splash') return <SplashScreen />;
  if (screen === 'login') return <LoginScreen onLogin={() => setScreen('home')} validUsername={user.username} />;

  return (
    <div className="min-h-screen bg-artesa-bg max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
      <Header
        title={getTitle()}
        onMenuClick={() => setIsSidebarOpen(true)}
        showBack={screen === 'task-detail' || screen === 'new-budget'}
        onBackClick={() => {
          if (screen === 'task-detail') setScreen('progress');
          if (screen === 'new-budget') setScreen('new-project');
        }}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
        currentScreen={screen}
        selectedProject={selectedProject}
        user={user}
      />

      <main className="flex-1">
        {screen === 'home' && <HomeScreen onProjectClick={handleProjectClick} user={user} projects={projects} />}
        {screen === 'projects' && (
          <ProjectsScreen
            projects={projects}
            onProjectClick={handleProjectClick}
            onAddClick={() => setScreen('new-project')}
          />
        )}
        {screen === 'new-project' && (
          <NewProjectScreen 
            onNext={(draft) => {
              setNewProjectDraft(draft);
              setScreen('new-budget');
            }} 
          />
        )}
        {screen === 'new-budget' && (
          <NewBudgetScreen 
            onConfirm={handleCreateProject} 
            materialPrices={materials}
            laborRate={laborRate}
            projectName={newProjectDraft.name || ''}
          />
        )}
        {screen === 'progress' && selectedProject && (
          <ProgressScreen
            project={selectedProject}
            onTaskClick={() => setScreen('task-detail')}
          />
        )}
        {screen === 'task-detail' && selectedProject && <TaskDetailScreen project={selectedProject} />}
        {screen === 'report' && selectedProject && <ReportScreen project={selectedProject} />}
        {screen === 'account' && (
          <AccountScreen 
            materials={materials} 
            setMaterials={setMaterials} 
            laborRate={laborRate}
            setLaborRate={setLaborRate}
          />
        )}
        {screen === 'edit-profile' && <EditProfileScreen user={user} onUpdateUser={setUser} />}
      </main>
    </div>
  );
}
