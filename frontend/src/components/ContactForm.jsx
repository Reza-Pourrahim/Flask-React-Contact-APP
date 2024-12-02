import { useState } from 'react'

function ContactForm({ onAddContact }) {
    // Create state for each form field
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
  
    // Handle form submission
    const handleSubmit = (e) => {
      // Prevent the default form submission behavior
      e.preventDefault();
      
      // Create a new contact object
      const newContact = {
        firstName,
        lastName,
        email
      };
  
      // Send the new contact up to the parent component
      onAddContact(newContact);
  
      // Clear the form
      setFirstName('');
      setLastName('');
      setEmail('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Contact</button>
      </form>
    );
  }


export default ContactForm