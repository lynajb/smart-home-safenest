const mongoose = require("mongoose");
const User = require("./user/model/user.model");
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI || "mongodb://127.0.0.1:27017/SafeNest_db")
  .then(() => console.log("DB has connected successfully !"))
  .then(() => {
    const admin = new User({
      username: "admin",
      email: "admin@gmail.com",
      password: "Admin*-1",
      role: "admin",
      displayName: "Admin",
    });

    admin
      .save()
      .then(() => console.log("admin created successfully"))
      .catch((error) => console.error(error.message));
  })
  .catch((err) => console.log(err.message))
  .finally(() => {
    // mongoose.disconnect().then('Disconnected from db').catch(error=>console.error(error.message))
  });
