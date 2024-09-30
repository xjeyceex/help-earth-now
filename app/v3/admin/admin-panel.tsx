'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 10; // Define how many users to show per page
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users?page=${currentPage}&limit=${usersPerPage}`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const { users, total } = await response.json();
        setUsers(users);
        setTotalUsers(total);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [currentPage]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleEditUser = async (user: User) => {
    setIsEditing(true);
    setSelectedUser(user);
    setName(user.firstName);
    setEmail(user.email);
    setIsActive(user.isActive);
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: name, lastName: selectedUser.lastName, email, isActive }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
      setIsEditing(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: name, lastName: '', email, password: 'defaultPassword', isActive }),
      });

      if (!response.ok) throw new Error('Failed to add user');

      const newUser = await response.json();
      setUsers([...users, newUser]);
      setIsAdding(false);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <button
        onClick={() => setIsAdding(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add User
      </button>

      {isAdding && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Add User</h2>
          <form onSubmit={e => e.preventDefault()}>
            <div className="mb-2">
              <label className="block">First Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="mr-2"
                />
                Active
              </label>
            </div>
            <div>
              <button
                type="button"
                onClick={handleAddUser}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
              >
                Add User
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <ul className="mt-4">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center border-b py-2">
            <div>
              <span className="font-semibold">{user.firstName} {user.lastName}</span>
              <span className="ml-4 text-gray-600">{user.email}</span>
            </div>
            <button
              onClick={() => handleEditUser(user)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        {/* Pagination controls */}
        {Array.from({ length: Math.ceil(totalUsers / usersPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-2 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isEditing && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Edit User</h2>
          <form onSubmit={e => e.preventDefault()}>
            <div className="mb-2">
              <label className="block">First Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="mr-2"
                />
                Active
              </label>
            </div>
            <div>
              <button
                type="button"
                onClick={handleSaveUser}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
