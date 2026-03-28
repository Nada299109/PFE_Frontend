'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useUsers, useCreateUser, useDeleteUser } from '@/modules/users';

/**
 * Demo Page
 * Demonstrates the network layer and React Query integration
 */
export default function DemoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  // Fetch users with search
  const { data, isLoading, error, refetch } = useUsers({
    search: searchTerm,
    page: 1,
    pageSize: 10,
  });

  // Create user mutation
  const createUser = useCreateUser();

  // Delete user mutation
  const deleteUser = useDeleteUser();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUser.mutateAsync({
        name: newUserName,
        email: newUserEmail,
        role: 'user',
      });

      // Clear form
      setNewUserName('');
      setNewUserEmail('');

      alert('User created successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await deleteUser.mutateAsync(userId);
      alert('User deleted successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Network Layer & React Query Demo
      </h1>

      {/* Create User Form */}
      <section className="mb-8 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-xl font-semibold">Create New User</h2>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="john@example.com"
              required
            />
          </div>
          <Button type="submit" disabled={createUser.isPending}>
            {createUser.isPending ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      </section>

      {/* Search Users */}
      <section className="mb-8 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-xl font-semibold">Search Users</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2"
            placeholder="Search by name or email..."
          />
          <Button onClick={() => refetch()}>Search</Button>
        </div>
      </section>

      {/* Users List */}
      <section className="rounded-lg border border-gray-200 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Users List</h2>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-8 text-center text-gray-500">Loading users...</div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-red-600">
            Error: {error.message}
          </div>
        )}

        {/* Users List */}
        {data?.data && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Total: {data.data.length} users
            </div>
            <div className="space-y-2">
              {data.data.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-md border border-gray-200 p-4"
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    <div className="text-xs text-gray-400">
                      Role: {user.role}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={deleteUser.isPending}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && data?.data.length === 0 && (
          <div className="py-8 text-center text-gray-500">No users found</div>
        )}
      </section>

      {/* Network Info */}
      <section className="mt-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-2 font-semibold text-blue-900">
          🎯 What&#39;s Happening Behind the Scenes:
        </h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>✅ Automatic caching with React Query</li>
          <li>✅ Request deduplication</li>
          <li>✅ Automatic retries on failure</li>
          <li>✅ Auth token automatically added to requests</li>
          <li>✅ Token refresh on 401 errors</li>
          <li>✅ All requests logged in console (dev mode)</li>
          <li>✅ Cache invalidation on mutations</li>
        </ul>
      </section>

      {/* Dev Tools Info */}
      <section className="mt-4 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-2 font-semibold text-gray-900">
          🛠️ Development Tools:
        </h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>
            📊 <strong>React Query Devtools</strong> - Check bottom of the
            screen
          </li>
          <li>
            🔍 <strong>Browser Console</strong> - See all request/response logs
          </li>
          <li>
            🌐 <strong>Network Tab</strong> - Inspect actual HTTP calls
          </li>
        </ul>
      </section>
    </main>
  );
}
