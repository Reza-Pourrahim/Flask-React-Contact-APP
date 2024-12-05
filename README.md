# Contact Management System

This project demonstrates a full-stack web application built with Flask and React. It implements a contact management system where users can create, read, update, and delete contacts through a modern web interface.

## Project Structure

The application is divided into two main parts:

### Backend (Flask)

```
backend/
├── config.py          # Flask configuration and database setup
├── models.py          # Database models using SQLAlchemy
└── main.py           # API routes and application logic
```

### Frontend (React)

```
frontend/
├── src/
│   ├── App.jsx       # Main React component with all UI components
│   ├── App.css       # Styling (using Tailwind CSS)
│   ├── index.css     # Global styles and Tailwind imports
│   └── main.jsx      # React entry point
```

## Features

- Create new contacts with first name, last name, and email
- View all contacts in a responsive table
- Update existing contact information
- Delete contacts
- Form validation and error handling
- Real-time notifications for user actions
- SQLite database for data persistence
- RESTful API endpoints
- Modern UI with Tailwind CSS

## Technologies Used

Backend:
- Flask: Python web framework
- SQLAlchemy: SQL toolkit and ORM
- SQLite: Database
- Flask-CORS: Handle Cross-Origin Resource Sharing

Frontend:
- React: UI library
- Tailwind CSS: Utility-first CSS framework
- Vite: Build tool and development server

## API Endpoints

- GET `/contacts`: Retrieve all contacts
- POST `/create_contact`: Create a new contact
- PATCH `/update_contact/<id>`: Update an existing contact
- DELETE `/delete_contact/<id>`: Delete a contact

## Installation and Setup

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:
```bash
pip install flask flask-sqlalchemy flask-cors
```

3. Start the Flask server:
```bash
python main.py
```

The backend server will run on http://127.0.0.1:5000

### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## Database Management

To view and manage the SQLite database:

1. Install SQLite browser:
```bash
sudo apt install sqlitebrowser
```

2. Open the database:
```bash
sqlitebrowser instance/mydatabase.db
```

## Project Features and Code Examples

### Backend Models (models.py)

The Contact model defines the structure for contact data:
```python
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
```

### Frontend Components (App.jsx)

The React application uses functional components with hooks for state management:
```javascript
const App = () => {
  const [contacts, setContacts] = useState([])
  const [editingContact, setEditingContact] = useState(null)
  // ... state management and API calls
}
```

## Contributing

Feel free to fork this repository and submit pull requests. You can also open issues for bugs or feature requests.

## Learning Resources

To understand this project better, you might want to explore:
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

## License

This project is open source and available under the MIT License.