import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	id: { type: String },
	name: { type: String, unique: true, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
})

export default mongoose.model('User', userSchema)
