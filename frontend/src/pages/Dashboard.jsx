import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-white dark:bg-background p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Dashboard</h1>
      <pre className="mt-4 text-sm bg-gray-50 dark:bg-secondary p-4 rounded">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;


