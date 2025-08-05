import React from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiHeart, 
  FiCalendar, 
  FiDollarSign, 
  FiPackage,
  FiMenu,
  FiBell,
  FiSettings
} from 'react-icons/fi';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'customers', label: 'Customers', icon: FiUsers },
    { id: 'pets', label: 'Pets', icon: FiHeart },
    { id: 'appointments', label: 'Appointments', icon: FiCalendar },
    { id: 'sales', label: 'Sales', icon: FiDollarSign },
    { id: 'inventory', label: 'Inventory', icon: FiPackage },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FiHeart className="mr-2 text-pink-500" />
            PetShop CRM
          </h1>
        </div>
        
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-gray-700 lg:hidden">
                <FiMenu className="h-6 w-6" />
              </button>
              <h2 className="ml-2 text-xl font-semibold text-gray-800 capitalize">
                {activeTab}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <FiBell className="h-6 w-6" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <FiSettings className="h-6 w-6" />
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;