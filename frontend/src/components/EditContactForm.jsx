import { useState, useEffect } from 'react'

function EditContactForm({ contact, onSave, onCancel }) {
  // Initialize form state with contact data
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [email, setEmail] = useState(contact.email);

  // Update form when contact prop changes
  useEffect(() => {
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setEmail(contact.email);
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create updated contact object
    const updatedContact = {
      ...contact,
      firstName,
      lastName,
      email
    };

    // Send the updated contact to parent component
    onSave(updatedContact);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div>
        <label>
          First Name:
          <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="form-buttons">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditContactForm;