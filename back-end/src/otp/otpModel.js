const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    otpCode: String,
    expirationTime: Date,
    life: Number,
    isUsed: { type: Boolean, default: false }
});

module.exports = mongoose.model('OTP', otpSchema);
