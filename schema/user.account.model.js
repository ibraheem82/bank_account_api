const mongoose = require('mongoose');
const validator = require('validator');
const UserAccountSchema = new mongoose.Schema({
  bvn: {
    type: Number,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    },
  birthYear: {
    type: Number,
    required: true,
    validate: {
      validator: function(y) {
        const now = new Date();
        const minAge = 16;
        const minBirthYear = now.getFullYear() - minAge;
        return Number.isInteger(y) && y <= minBirthYear;
      },
      message: props => `${props.value} is not a valid birth year. Must be at least 16 years old.`
    }
  },
  birthMonth: {
    type: Number,
    required: true,
    validate: {
      validator: function(m) {
        return Number.isInteger(m) && m >= 1 && m <= 12;
      },
      message: props => `${props.value} is not a valid birth month. Must be a number between 1 and 12.`
    }
  },
  birthDate: {
    type: Number,
    required: true,
    validate: {
      validator: function(d) {
        return Number.isInteger(d) && d >= 1 && d <= 31;
      },
      message: props => `${props.value} is not a valid birth date. Must be a number between 1 and 31.`
    }
  }
  
});

/*
You can test the endpoint with this
* {
  "bvn": "1234567890",
  "phone": "2345678901",
  "birthYear": "1995",
  "birthMonth": 3,
  "birthDate": 17
}
*/


const UserAccount = mongoose.model('UserAccount', UserAccountSchema);

module.exports = UserAccount;