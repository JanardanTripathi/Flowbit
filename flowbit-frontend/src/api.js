const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login user
export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

// Fetch tickets for the logged-in user
export const fetchUserTickets = async (token) => {
  const res = await fetch(`${BASE_URL}/api/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Failed to fetch tickets');
  return res.json();
};

// Create a new ticket
export const createTicket = async (title, token) => {
  const res = await fetch(`${BASE_URL}/api/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error('Failed to create ticket');
  return res.json();
};

// Mark a ticket as complete
export const markTicketComplete = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/tickets/${id}/complete`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to complete ticket');
  return res.json();
};
