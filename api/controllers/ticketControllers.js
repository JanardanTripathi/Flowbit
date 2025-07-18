const Ticket = require('../models/Ticket');
const axios = require('axios');

exports.createTicket = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const ticket = await Ticket.create({
      title,
      createdBy: req.user.id,  // Removed customerId
    });

    // Optional webhook trigger
    try {
      await axios.post('http://localhost:5678/webhook/flowbit-ticket', {
        ticketId: ticket._id,
        title: ticket.title,
        // customerId removed from payload
      });
    } catch (webhookError) {
      console.error('Webhook trigger failed:', webhookError.message);
    }

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Ticket creation error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.markTicketComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (ticket.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    ticket.status = 'Completed';
    await ticket.save();

    return res.status(200).json({ message: 'Ticket marked as complete', ticket });
  } catch (error) {
    console.error('Error completing ticket:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.webhookCompleteTicket = async (req, res) => {
  try {
    const secret = req.headers['x-webhook-secret'];
    if (secret !== process.env.WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Unauthorized webhook access' });
    }

    const { ticketId } = req.body;
    if (!ticketId) {
      return res.status(400).json({ error: 'ticketId is required' });
    }

    const updated = await Ticket.findByIdAndUpdate(
      ticketId,
      { status: 'Completed' },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ message: 'Ticket marked as completed', ticket: updated });
  } catch (error) {
    console.error('Webhook processing error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id });
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching user tickets:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
