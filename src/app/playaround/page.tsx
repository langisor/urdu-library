"use client";
import React, { useEffect } from 'react';
import { useUserState } from './use-user-state';
import { UserProfile } from './_components/users-profile';
import { UserActions } from "./_components/users-actions"

export default function PlayaroundPage() {
 const { fetchUser } = useUserState();

 useEffect(() => {
  // Automatically fetch user data when app loads
  fetchUser();
 }, []);

 return (
  <div className="min-h-screen bg-gray-100 py-8 px-4">
   <div className="max-w-4xl mx-auto">
    <header className="text-center mb-8">
     <h1 className="text-3xl font-bold text-gray-900 mb-2">
      User State Management Demo
     </h1>
     <p className="text-gray-600">
      Global user state using hookstate/core
     </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <UserProfile />
     <UserActions />
    </div>

    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
     <h3 className="text-sm font-medium text-blue-900 mb-2">
      How to use the useUserState hook:
     </h3>
     <pre className="text-xs text-blue-800 bg-blue-100 rounded p-2 overflow-x-auto">
      {`import { useUserState } from './hooks/useUserState';

function MyComponent() {
  const { user, loading, error, fetchUser } = useUserState();
  
  // Access user data globally
  console.log(user?.name);
  
  return <div>{user?.name}</div>;
}`}
     </pre>
    </div>
   </div>
  </div>
 );
}