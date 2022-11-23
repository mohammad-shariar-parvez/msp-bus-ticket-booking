const mongoose = require('mongoose');
// console.log("WHAT IS MONGOOSE", mongoose);

const userScema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

console.log("MONGOOSE TEST", mongoose.model('users', userScema));
module.exports = mongoose.model('users', userScema);
