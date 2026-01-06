import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { Loader2 } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-smoky-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-yellow-crayola animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-smoky-black">
      <AdminSidebar />
      <div className="ml-64">
        <AdminTopbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
