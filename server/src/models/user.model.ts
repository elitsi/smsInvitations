import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  invitationSent: {
    type: Boolean,
    default: false,
  },
  invitationAnswer: {
    type: Number,
    default: null,
  },
  foodType: {
    type: Number,
    default: null,
  },
  needRide: {
    type: Boolean,
    default: null,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  invited: {
    type: Number,
    required: true,
    default: null
  }
})

const User = mongoose.model('users', userSchema)

export default User
