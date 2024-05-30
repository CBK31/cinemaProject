const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: String,
    description: String

})

module.exports = mongoose.model('Category', categorySchema)