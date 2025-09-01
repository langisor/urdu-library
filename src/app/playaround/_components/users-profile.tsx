"use client";

import React from 'react';
import { useUserState } from '../use-user-state';
import { User, Mail, Calendar, Star } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user, loading, error } = useUserState();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600">No user data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-100 rounded-full p-3">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{user.email}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">Role: {user.role}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Star className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">Score: {user.score}</span>
        </div>
        
        <div className="mt-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {user.status}
          </span>
        </div>
      </div>
    </div>
  );
};