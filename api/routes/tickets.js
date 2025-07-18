const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const {
  createTicket,
  markTicketComplete,
  webhookCompleteTicket,
  getAllTickets,
  getUserTickets // Import user-specific ticket handler
} = require('../controllers/ticketControllers');

const router = express.Router();

// ✅ Create a new ticket (authenticated users)
router.post('/', auth, createTicket);

// ✅ Mark a ticket as complete (creator or admin)
router.post('/:id/complete', auth, markTicketComplete);

// ✅ Webhook: mark ticket complete (e.g. via n8n)
router.post('/webhook/ticket-done', webhookCompleteTicket);

// ✅ Admin-only: get all tickets
router.get('/all', auth, role, getAllTickets);

// ✅ Regular users: get only their own tickets
router.get('/', auth, getUserTickets);

module.exports = router;
