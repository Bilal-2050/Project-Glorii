const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true,
      trim: true

   },
   lastname: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      unique: [true, "email id already present"],
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error('invalid Email')
         }
      }
   },
   ranking: {
      type: Number,
      required: true,
      unique: true
   },
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
