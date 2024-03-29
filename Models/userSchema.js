const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		email: {
			type: String,
		},
		userType: {
			type: String,
			default: 'user',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', userSchema);
