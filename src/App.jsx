import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AddPlantModal from './components/AddPlantModal';
import Dashboard from './pages/Dashboard';
import PlantDetail from './pages/PlantDetail';
import SchedulePage from './pages/Schedule';
import SettingsPage from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';
import { plants as initialPlants } from './data/plants';

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [plants, setPlants] = useState(initialPlants);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSelectPlant = (id) => {
    setSelectedPlantId(id);
    setActivePage('detail');
  };

  const handleBack = () => {
    setSelectedPlantId(null);
    setActivePage('dashboard');
  };

  const handleAddPlant = (newPlant) => {
    setPlants((prev) => [...prev, newPlant]);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page !== 'detail') {
      setSelectedPlantId(null);
    }
  };

  const renderPage = () => {
    if (selectedPlantId) {
      const plant = plants.find((p) => p.id === selectedPlantId);
      if (plant) {
        return <PlantDetail plant={plant} onBack={handleBack} />;
      }
    }

    switch (activePage) {
      case 'schedule':
        return <SchedulePage plants={plants} />;
      case 'settings':
        return <SettingsPage />;
      case 'dashboard':
      default:
        return <Dashboard plants={plants} onSelectPlant={handleSelectPlant} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8faf8] dark:bg-[#0f1210] transition-colors duration-300">
      <Sidebar
        activePage={selectedPlantId ? 'collection' : activePage}
        onNavigate={handleNavigate}
        onAddPlant={() => setShowAddModal(true)}
      />
      <div className="ml-56 flex-1">
        {renderPage()}
      </div>

      {showAddModal && (
        <AddPlantModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddPlant}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
