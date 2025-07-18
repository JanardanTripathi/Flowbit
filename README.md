# Flowbit

A full-stack ticket management system with role-based access, JWT authentication, and webhook integration. Users can log in, create support tickets, and view their own tickets. Admins can view and manage all tickets.

## 🔧 Tech Stack

- **Frontend:** ReactJS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Webhook:** n8n integration

---

## 📁 Project Structure

Flowbit/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── api.js
│ │ ├── auth.js
│ │ ├── App.js
│ │ └── ...
│ └── public/
│
├── .env
├── .gitignore
├── README.md
└── package.json

yaml
Copy
Edit

---

## 🚀 Setup Instructions

### 🖥 Backend

1. Navigate to the backend:
   ```bash
   cd backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
WEBHOOK_SECRET=your_webhook_secret
Run the backend server:

bash
Copy
Edit
npm start
🌐 Frontend
Navigate to the frontend:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in /frontend:

ini
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000
Run the development server:

bash
Copy
Edit
npm run dev
🧪 Features
🔐 JWT-based authentication

👥 Role-based access (user, admin)

📩 Ticket creation with webhook trigger

✅ Mark ticket as completed via backend or webhook

🌍 Webhook endpoint for external integrations (e.g., n8n)

🧾 Dashboard showing "My Tickets"

✨ Frontend built with clean UI and protected routes

📡 Webhook (n8n)
Trigger ticket completion via POST:

bash
Copy
Edit
POST http://localhost:5678/webhook/flowbit-ticket

Headers:
  x-webhook-secret: your_webhook_secret

Body:
  {
    "ticketId": "TICKET_ID"
  }
👤 Admin Access
To test admin functionality, manually set the user’s role field to "admin" in MongoDB.

📄 License
MIT

💡 Author
Made by Janardan Tripathi