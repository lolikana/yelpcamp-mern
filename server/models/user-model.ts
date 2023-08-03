import { IUser } from 'libs/types';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username cannot be blank'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email cannot be blank'],

    unique: true
  },
  password: {
    type: String,
    required: [true, 'You should enter a password']
  }
});

const User = model('User', UserSchema);

export default User;
