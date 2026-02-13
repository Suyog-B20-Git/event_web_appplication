import React, { useState, useMemo, useEffect } from 'react';
import { FaAddressBook, FaTrash, FaSearch, FaEye, FaEnvelope, FaUser, FaCalendarAlt, FaTimes, FaCommentAlt } from 'react-icons/fa';

// --- Sample Data ---
const initialContacts = [
    {
        id: 1,
        name: 'Gary Charles',
        email: 'gary.charles@dominatingkeywords.com',
        title: 'Mr',
        createdAt: '2025-05-08 11:31:58'
    },
    {
        id: 2,
        name: 'Gary Charles',
        email: 'gary.charles@dominatingkeywords.com',
        title: 'Mr',
        createdAt: '2025-04-05 21:44:08'
    },
    {
        id: 3,
        name: 'Test Email',
        email: 'zakir@masterblocks.co.in',
        title: 'Test mail by Zakir',
        createdAt: '2024-11-08 08:34:56'
    },
    {
        id: 4,
        name: '', 
        email: '', 
        title: 'hello',
        createdAt: '2024-10-22 08:01:31'
    },
    {
        id: 5,
        name: 'Sandeep Mathew',
        email: 'sohambhole@gmail.com',
        title: 'hi',
        createdAt: '2024-10-16 08:34:17'
    },
    {
        id: 6,
        name: 'Sandeep Mathew',
        email: 'sndpmthw@gmail.com',
        title: '',
        createdAt: ''
    }
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-sm text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-base font-semibold text-gray-800 break-words mt-1">{children || <span className="text-gray-400 font-normal">N/A</span>}</div>
    </div>
);


const ViewContactModal = ({ contact, onClose }) => {
   
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-95 hover:scale-100" onClick={(e) => e.stopPropagation()}>
                <header className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Contact Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                        <FaTimes size={20} />
                    </button>
                </header>
                <main className="p-6 space-y-4">
                    <DetailItem icon={<FaUser size={16} />} label="Name">{contact.name}</DetailItem>
                    <DetailItem icon={<FaEnvelope size={16} />} label="Email">{contact.email}</DetailItem>
                    <DetailItem icon={<FaCommentAlt size={16} />} label="Title / Message">{contact.title}</DetailItem>
                    <DetailItem icon={<FaCalendarAlt size={16} />} label="Submitted On">{contact.createdAt ? new Date(contact.createdAt).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' }) : 'N/A'}</DetailItem>
                </main>
                <footer className="p-4 bg-gray-50 rounded-b-xl text-right">
                     <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors">
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};



const AdminContacts = () => {
    const [contacts, setContacts] = useState(initialContacts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [viewingContact, setViewingContact] = useState(null); 

    const filteredContacts = useMemo(() => {
        if (!searchTerm) return contacts;
        const lowercasedFilter = searchTerm.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(lowercasedFilter) ||
            contact.email.toLowerCase().includes(lowercasedFilter) ||
            contact.title.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm, contacts]);

    const handleSelect = (id) => {
        setSelectedContacts(prev =>
            prev.includes(id) ? prev.filter(contactId => contactId !== id) : [...prev, id]
        );
    };
    
    const handleBulkDelete = () => {
        if (selectedContacts.length === 0) return alert('Please select contacts to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedContacts.length} contact(s)?`)) {
            setContacts(prev => prev.filter(contact => !selectedContacts.includes(contact.id)));
            setSelectedContacts([]);
        }
    };

    const handleDeleteSingle = (contactId) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            setContacts(prev => prev.filter(contact => contact.id !== contactId));
            setSelectedContacts(prev => prev.filter(id => id !== contactId));
        }
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
           
            {viewingContact && <ViewContactModal contact={viewingContact} onClose={() => setViewingContact(null)} />}

            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-cyan-100 p-2 rounded-lg"><FaAddressBook className="text-2xl text-cyan-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Contacts</h1>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {selectedContacts.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedContacts.length})
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                
                <div className="relative w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by name, email, or title..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredContacts.length > 0 ? filteredContacts.map(contact => (
                    <div key={contact.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedContacts.includes(contact.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                        
                        <input type="checkbox" checked={selectedContacts.includes(contact.id)} onChange={() => handleSelect(contact.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{contact.name || 'No Name Provided'}</h3>
                                <p className="text-sm text-gray-500">Contact ID: <span className="font-medium text-gray-600">{contact.id}</span></p>
                            </div>
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaEnvelope size={14} />} label="Email">{contact.email}</DetailItem>
                            <DetailItem icon={<FaCommentAlt size={14} />} label="Title / Message">{contact.title}</DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Created At">{contact.createdAt ? new Date(contact.createdAt).toLocaleString('en-IN') : 'N/A'}</DetailItem>
                        </div>
                        
                        <footer className="p-3 bg-gray-50 rounded-b-lg flex gap-2
                            justify-between
                            md:justify-end">

                            <button
                                onClick={() => setViewingContact(contact)}
                                className="flex-1 md:flex-none
                                        flex items-center justify-center
                                        text-sm font-semibold py-2 px-4
                                        rounded-lg bg-gray-200 hover:bg-gray-300
                                        text-gray-800 transition-colors"
                            >
                                <FaEye className="mr-2" />
                                View
                            </button>

                            <button
                                onClick={() => handleDeleteSingle(contact.id)}
                                className="flex-1 md:flex-none
                                        flex items-center justify-center
                                        text-sm font-semibold py-2 px-4
                                        rounded-lg bg-red-500 hover:bg-red-600
                                        text-white transition-colors"
                            >
                                <FaTrash className="mr-2" />
                                Delete
                            </button>

                        </footer>

                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaAddressBook className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Contacts Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any contacts.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminContacts;
