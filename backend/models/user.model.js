const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
   {
      fullName: {
         type: String,
         required: true
      },
      phoneNumber: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      dob: {
         type: Date,
         required: true
      },
      password: {
         type: String,
         required: true
      },
   },
   { timestamps: true },
);


const User = mongoose.model("User", userSchema);

module.exports = User;
