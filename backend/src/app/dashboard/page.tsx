import React from 'react';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Backend Editor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <a href="/pages" className="p-6 bg-white rounded-lg shadow hover:bg-gray-100 text-center font-semibold">Manage Pages</a>
        <a href="/blogs" className="p-6 bg-white rounded-lg shadow hover:bg-gray-100 text-center font-semibold">Manage Blogs</a>
        <a href="/images" className="p-6 bg-white rounded-lg shadow hover:bg-gray-100 text-center font-semibold">Manage Images</a>
        <a href="/users" className="p-6 bg-white rounded-lg shadow hover:bg-gray-100 text-center font-semibold">Manage Users</a>
      </div>
    </main>
  );
}
