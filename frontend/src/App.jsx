import React, { useState, useEffect } from 'react'

// [Previous ContactForm component code remains the same]
const ContactForm = ({ onAddContact }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddContact({ firstName, lastName, email })
    setFirstName('')
    setLastName('')
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">
          First Name:
          <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          />
        </label>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">
          Last Name:
          <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          />
        </label>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">
          Email:
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          />
        </label>
      </div>
      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Contact
      </button>
    </form>
  )
}

// [Previous EditContactForm component code remains the same]
const EditContactForm = ({ contact, onSave, onCancel }) => {
  const [firstName, setFirstName] = useState(contact.firstName)
  const [lastName, setLastName] = useState(contact.lastName)
  const [email, setEmail] = useState(contact.email)

  useEffect(() => {
    setFirstName(contact.firstName)
    setLastName(contact.lastName)
    setEmail(contact.email)
  }, [contact])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...contact,
      firstName,
      lastName,
      email
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">
          First Name:
          <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          />
        </label>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">
          Last Name:
          <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          />
        </label>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">
          Email:
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          />
        </label>
      </div>
      <div className="space-x-2">
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

// [Previous ContactList component code remains the same]
const ContactList = ({ contacts, onEdit, onDelete }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Contacts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{contact.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onEdit(contact)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(contact.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Main App Component
const App = () => {
  const [contacts, setContacts] = useState([])
  const [editingContact, setEditingContact] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts")
      const data = await response.json()
      setContacts(data.contacts)
    } catch (error) {
      showNotification('Failed to fetch contacts', 'error')
    }
  }

  const handleAddContact = async (newContact) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/create_contact", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
      })
      const data = await response.json()
      
      if (response.ok) {
        setContacts([...contacts, data.contact])
        showNotification('Contact added successfully', 'success')
      } else {
        showNotification(data.message, 'error')
      }
    } catch (error) {
      showNotification('Failed to add contact', 'error')
    }
  }

  const handleUpdateContact = async (updatedContact) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update_contact/${updatedContact.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact)
      })
      const data = await response.json()

      if (response.ok) {
        setContacts(contacts.map(c => c.id === updatedContact.id ? data.contact : c))
        setEditingContact(null)
        showNotification('Contact updated successfully', 'success')
      } else {
        showNotification(data.message, 'error')
      }
    } catch (error) {
      showNotification('Failed to update contact', 'error')
    }
  }

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${contactId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== contactId))
        showNotification('Contact deleted successfully', 'success')
      } else {
        const data = await response.json()
        showNotification(data.message, 'error')
      }
    } catch (error) {
      showNotification('Failed to delete contact', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Contact Manager</h1>
      
      {notification && (
        <div className={`p-4 mb-4 rounded ${
          notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {notification.message}
        </div>
      )}

      {editingContact ? (
        <EditContactForm
          contact={editingContact}
          onSave={handleUpdateContact}
          onCancel={() => setEditingContact(null)}
        />
      ) : (
        <ContactForm onAddContact={handleAddContact} />
      )}

      <ContactList
        contacts={contacts}
        onEdit={setEditingContact}
        onDelete={handleDeleteContact}
      />
    </div>
  )
}

export default App