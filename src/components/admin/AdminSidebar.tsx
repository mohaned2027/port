import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Moon,
  Sun,
  GraduationCap,
  Wrench,
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-orange-yellow-crayola/20 to-vegas-gold/10 text-orange-yellow-crayola border-l-4 border-orange-yellow-crayola'
          : 'text-light-gray-70 hover:bg-jet/50 hover:text-white-2'
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

const AdminSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-eerie-black-2 border-r border-jet flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-jet">
        <h1 className="text-xl font-bold text-white-2">
          <span className="text-orange-yellow-crayola">Admin</span> Panel
        </h1>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-jet">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-yellow-crayola to-vegas-gold flex items-center justify-center text-smoky-black font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p className="text-sm font-medium text-white-2">{user?.name || 'Admin'}</p>
            <p className="text-xs text-light-gray-70">{user?.email || 'admin@demo.com'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavItem to="/admin/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
        <NavItem to="/admin/profile" icon={<User className="w-5 h-5" />} label="Profile" />
        <NavItem to="/admin/skills" icon={<Wrench className="w-5 h-5" />} label="Skills" />
        <NavItem to="/admin/education" icon={<GraduationCap className="w-5 h-5" />} label="Education" />
        <NavItem to="/admin/projects" icon={<Briefcase className="w-5 h-5" />} label="Projects" />
        <NavItem to="/admin/blog" icon={<FileText className="w-5 h-5" />} label="Blog Posts" />
        <NavItem to="/admin/messages" icon={<MessageSquare className="w-5 h-5" />} label="Messages" />
        <NavItem to="/admin/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-jet space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-light-gray-70 hover:bg-jet/50 hover:text-white-2 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
