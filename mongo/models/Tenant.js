const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  plan: { type: String, required: true, enum: ['free', 'pro', 'enterprise'] },
}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);
