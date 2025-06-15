
import React from 'react';
import { BarChart3, MessageCircle, Settings } from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3
    },
    {
      id: 'reviews',
      label: 'Recensioni',
      icon: MessageCircle
    },
    {
      id: 'settings',
      label: 'Impostazioni',
      icon: Settings
    },
    {
      id: 'profile',
      label: 'Profilo Attività',
      icon: Settings // meglio sostituirla con qualcosa tipo "User" se desideri!
    }
  ];

  return (
    <aside className="bg-gray-100 w-64 min-h-screen border-r border-gray-200 py-6 px-3">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors ${
                  activeTab === item.id ? 'bg-gray-200 font-semibold' : 'text-gray-700'
                }`}
              >
                <item.icon className="h-4 w-4 inline-block mr-2" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
