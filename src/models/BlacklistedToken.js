// src/models/BlacklistedToken.js
const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true }
});

blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // se autoelimina

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
