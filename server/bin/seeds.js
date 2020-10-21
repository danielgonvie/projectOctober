require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    name: "Ductor",
    username: "ductor",
    password: bcrypt.hashSync("ductor", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    name: "Anacletillo",
    username: "anacletillo",
    password: bcrypt.hashSync("anacletillo", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    name: "GrumpyUlmo",
    username: "grumpyulmo",
    password: bcrypt.hashSync("grumpyulmo", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    name: "Azazel",
    username: "azazel",
    password: bcrypt.hashSync("azazel", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    name: "Rick",
    username: "rick",
    password: bcrypt.hashSync("rick", bcrypt.genSaltSync(bcryptSalt))
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
