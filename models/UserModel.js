import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: 'user'
  }
}, { timeStamp: true })

const User = mongoose.model('users', UserSchema)
export default User