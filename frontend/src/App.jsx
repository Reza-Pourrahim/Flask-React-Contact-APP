import { useState, useEffect } from 'react'
import './App.css'
import ContactForm from './components/ContactForm'
import EditContactForm from './components/EditContactForm'

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null);

  // Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/contacts');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data.contacts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Start editing a contact
  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  // Save edited contact
  const handleSaveEdit = async (updatedContact) => {
    try {
      const response = await fetch(`http://localhost:5000/update_contact/${updatedContact.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (!response.ok) throw new Error('Failed to update contact');

      // Refresh contacts list and exit edit mode
      await fetchContacts();
      setEditingContact(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading contacts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Contact Management</h1>
      
      <ContactForm onAddContact={handleAddContact} />
      
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            {editingContact?.id === contact.id ? (
              <EditContactForm 
                contact={contact}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <h3>{contact.firstName} {contact.lastName}</h3>
                <p>{contact.email}</p>
                <div className="contact-actions">
                  <button onClick={() => handleEdit(contact)}>Edit</button>
                  <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App