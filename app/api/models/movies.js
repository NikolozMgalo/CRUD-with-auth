const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	name: {
		type: String,
		trim: true,		
		required: true,
	},
	releaseDate: {
		type: Date,
		trim: true,
		required: true
	}
});

module.exports = mongoose.model('Movie', MovieSchema)