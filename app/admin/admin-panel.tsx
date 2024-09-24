import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddUser = (user: User) => {
    setUsers([...users, user]);
  };

  const handleEditUser = (user: User) => {
    setUsers(users.map(u => (u.id === user.id ? user : u)));
  };

  const handleDeactivateUser = (userId: number) => {
    setUsers(users.map(u => (u.id === userId ? { ...u, isActive: false } : u)));
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* User management forms */}
      {/* {isEditing ? (
        <UserEditForm user={selectedUser} onSave={handleEditUser} />
      ) : (
        <UserAddForm onAdd={handleAddUser} />
      )}
      <UserList
        users={users}
        onEdit={user => {
          setSelectedUser(user);
          setIsEditing(true);
        }}
        onDeactivate={handleDeactivateUser}
        onDelete={handleDeleteUser}
      /> */}
    </div>
  );
}
