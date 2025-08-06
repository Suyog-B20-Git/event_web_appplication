import React, { useState, useMemo } from 'react';
import { FaUsers, FaPlus, FaTrash, FaSearch, FaEye, FaPencilAlt, FaEnvelope, FaUserTag, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

// Sample data for users, based on the details from your image.
const initialUsers = [
    {
        id: 153,
        name: 'Demo Event',
        email: '12765@ghvh.com',
        createdAt: '2025-07-15 05:39:41',
        role: 'POS (Sub-organiser)',
        businessType: 'Wedding Planner',
        status: 'Enabled'
    },
    {
        id: 151,
        name: 'Test User 003',
        email: 'test001@gmail.com',
        createdAt: '2025-07-07 17:01:37',
        role: 'Organiser (Semi-admin)',
        businessType: 'Wedding Planner',
        status: 'Enabled'
    },
    {
        id: 152,
        name: 'Rehan Khan',
        email: 'khannrehan4690@gmail.com',
        createdAt: '2025-07-08 12:48:45',
        role: 'Customer (non-admin)',
        businessType: '',
        status: 'Enabled'
    },
    {
        id: 150,
        name: 'Test User 02',
        email: 'abcd@gmail.com',
        createdAt: '2025-06-28 08:03:17',
        role: 'Organiser (Semi-admin)',
        businessType: 'Wedding Planner',
        status: 'Enabled'
    }
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);


const AdminUsers = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);


    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, users]);


    const handleSelect = (id) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
        );
    };


    const handleBulkDelete = () => {
        if (selectedUsers.length === 0) return alert('Please select users to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) {
            setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
            setSelectedUsers([]);
        }
    };


    const handleDeleteSingle = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => prev.filter(user => user.id !== userId));
            setSelectedUsers(prev => prev.filter(id => id !== userId));
        }
    };


    const StatusBadge = ({ status }) => {
        const styles = {
            Enabled: 'bg-green-100 text-green-800',
            Disabled: 'bg-red-100 text-red-800'
        };
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{status}</span>;
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg"><FaUsers className="text-2xl text-green-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaPlus className="mr-2" /> Add New
                        </button>
                        {selectedUsers.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedUsers.length})
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by name or email..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                    <div key={user.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedUsers.includes(user.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>

                        <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelect(user.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8">
                                <h3 className="font-bold text-lg text-indigo-700">{user.name}</h3>
                                <p className="text-sm text-gray-500">User ID: <span className="font-medium text-gray-600">{user.id}</span></p>
                            </div>
                            <StatusBadge status={user.status} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaEnvelope size={14} />} label="Email">{user.email}</DetailItem>
                            <DetailItem icon={<FaUserTag size={14} />} label="Role">{user.role}</DetailItem>
                            <DetailItem icon={<FaBriefcase size={14} />} label="Business Type">{user.businessType || 'N/A'}</DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Created At">{new Date(user.createdAt).toLocaleDateString()}</DetailItem>
                        </div>

                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                            <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"><FaEye className="mr-2" />View</button>
                            <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"><FaPencilAlt className="mr-2" />Edit</button>
                            <button onClick={() => handleDeleteSingle(user.id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"><FaTrash className="mr-2" />Delete</button>
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaUsers className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Users Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any users.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
