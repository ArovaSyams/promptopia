import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exist'],
    required: [true, 'Email is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    // match: [/^(?=.{8,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: String
  // username: {
  //   type: String,
  // },
  // image: {
  //   type: String
  // }
});

// jika model user ada di "Models" maka pakai yang lama, jika tidak, create User Model
const User =  models.User || model('User', userSchema);

export default User;