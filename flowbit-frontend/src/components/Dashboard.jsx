import React, { useEffect, useState } from 'react';
import { fetchUserTickets, markTicketComplete, createTicket } from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchUserTickets(token);
        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [token]);

  const handleComplete = async (id) => {
  try {
    await markTicketComplete(id, token);
    setTickets((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: 'Completed' } : t))
    );
  } catch {
    alert('Failed to mark ticket complete');
  }
};

const handleCreate = async () => {
  if (!newTitle.trim()) return;

  try {
    const ticket = await createTicket(newTitle, token);
    setTickets((prev) => [...prev, ticket]);
    setNewTitle('');
  } catch {
    alert('Failed to create ticket');
  }
};

  return (
    <div className="dashboard">
      <h2>My Tickets</h2>

      <div className="create-ticket">
        <input
          type="text"
          placeholder="Enter ticket title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleCreate}>Create Ticket</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="ticket">
              <strong>{ticket.title}</strong> -{' '}
              <span>{ticket.status}</span>
              {ticket.status !== 'Completed' && (
                <button onClick={() => handleComplete(ticket._id)}>
                  Mark Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
