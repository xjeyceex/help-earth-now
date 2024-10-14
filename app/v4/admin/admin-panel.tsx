'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/Modal';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean; 
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
  const [isAdmin, setIsAdmin] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 10; 
  const router = useRouter();
  
  // State for password change
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');

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
    if (!session?.user?.isAdmin) {
      alert("You don't have the permission to edit users.");
      return;
    }
    setIsEditing(true);
    setSelectedUser(user);
    setName(user.firstName);
    setEmail(user.email);
    setIsActive(user.isActive);
    setIsAdmin(user.isAdmin); 
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName: name, 
          lastName: selectedUser.lastName, 
          email, 
          isActive, 
          isAdmin 
        }),
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
    if (!email) {
      alert('Please fill in the and email field.');
      return;
    }

    if (users.some(user => user.email === email)) {
      alert('Email already exists.');
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName: name, 
          lastName: '', 
          email, 
          password: 'defaultPassword', 
          isActive, 
          isAdmin
        }),
      });
  
      if (!response.ok) throw new Error('Failed to add user');
  
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setIsAdding(false);
      setName('');
      setEmail('');
      setIsAdmin(false); 
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordChangeError('Passwords do not match.');
      return;
    }
  
    try {
      const response = await fetch(`/api/users/${session?.user?.id}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        if (result?.message === 'Incorrect old password') {
          setPasswordChangeError('Old password is incorrect.');
        } else {
          setPasswordChangeError('Failed to change password.');
        }
        return;
      }
  
      alert('Password changed successfully.');
      setIsChangingPassword(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordChangeError('');
  
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordChangeError('Failed to change password.');
    }
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <button
        onClick={() => setIsAdding(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add User
      </button>

      <button
        onClick={() => setIsChangingPassword(!isChangingPassword)}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition ml-4"
      >
        {isChangingPassword ? 'Cancel Password Change' : 'Change My Password'}
      </button>

      <table className="mt-4 w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Active</th>
            <th className="border p-2">Admin</th> 
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.firstName}</td>
              <td className="border p-2">{user.lastName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.isActive ? 'Yes' : 'No'}</td>
              <td className="border p-2">{user.isAdmin ? 'Yes' : 'No'}</td> 
              <td className="border p-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            disabled={currentPage === i + 1}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} hover:bg-blue-400`}
          >
            {i + 1}
          </button>
        ))}
      </div>

            {/* Add User Modal */}
      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add User">
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
          <div className="mb-2">
            <label className="block">Active</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={e => setIsActive(e.target.checked)}
            />
          </div>
          <div className="mb-2">
            <label className="block">Admin</label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            />
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
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={isChangingPassword} onClose={() => setIsChangingPassword(false)} title="Change Password">
        <form onSubmit={e => e.preventDefault()}>
          <div className="mb-2">
            <label className="block">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          {passwordChangeError && <p className="text-red-500">{passwordChangeError}</p>}
          <div>
            <button
              type="button"
              onClick={handleChangePassword}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={() => setIsChangingPassword(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      {selectedUser && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit User">
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
            <div className="mb-2">
              <label className="block">Active</label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={e => setIsActive(e.target.checked)}
              />
            </div>
            <div className="mb-2">
              <label className="block">Admin</label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleSaveUser}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
              >
                Save Changes
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
        </Modal>
      )}

    </div>
  );
}
