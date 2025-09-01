"use client";
import React from 'react';
import { useUserState } from '../use-user-state';
import { RefreshCw, LogOut, Download } from 'lucide-react';

export const UserActions: React.FC = () => {
  const { fetchUser, clearUser, refetchUser, loading } = useUserState();

  const handleFetchUser = () => {
    fetchUser();
  };

  const handleRefresh = () => {
    refetchUser();
  };

  const handleClearUser = () => {
    clearUser();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">User Actions</h3>
      
      <div className="space-y-3">
        <button
          onClick={handleFetchUser}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span>{loading ? 'Fetching...' : 'Fetch User Data'}</span>
        </button>
        
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
        
        <button
          onClick={handleClearUser}
          className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Clear User Data</span>
        </button>
      </div>
    </div>
  );
};