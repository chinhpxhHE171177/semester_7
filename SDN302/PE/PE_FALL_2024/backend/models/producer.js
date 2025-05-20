const mogoose = require('mongoose');

const producerSchema = new mogoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true, collection: 'producers' });
const Producers = mogoose.model('producer', producerSchema);
module.exports = Producers;