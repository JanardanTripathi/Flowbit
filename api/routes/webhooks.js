const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// POST /api/webhooks/ticket-done — Secure endpoint to mark ticket as completed
router.post('/ticket-done', async (req, res) => {
  try {
    const secret = req.headers['x-webhook-secret'];
    if (secret !== process.env.WEBHOOK_SECRET) {
      return res.status(403).json({ error: 'Forbidden: Invalid webhook secret' });
    }

    const { ticketId } = req.body;
    if (!ticketId) {
      return res.status(400).json({ error: 'ticketId is required' });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    ticket.status = 'Completed'; // Capitalized for consistency
    await ticket.save();

    res.json({ success: true, message: 'Ticket marked as completed' });
  } catch (err) {
    console.error('Webhook processing error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
