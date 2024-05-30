const mongoose = require('mongoose');
const schema = mongoose.Schema;

const complaintSchema = new schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    body: String,
    categories: [{ type: String }],
    status: { type: String, enum: ['PENDING', 'IN PROGRESS', 'RESOLVED', 'REJECTED'], default: 'PENDING' },
    creationDate: Date
})

module.exports = mongoose.model('Complaint', complaintSchema);