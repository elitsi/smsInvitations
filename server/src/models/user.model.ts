import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  invitationSent: {type: Boolean, default: false},
  invitationAnswer: {type: Number},
  foodType: {type: Number},
  needRide: {type: Boolean}
});

const User = mongoose.model('users', userSchema);

export default User;