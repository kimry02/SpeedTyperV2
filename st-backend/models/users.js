import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password : { type: String, required: true },
    wpm : Number,
    raceCount: Number
})

const User = mongoose.model("User", userSchema);

export default User;