require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Room = require("../models/Room");

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
    username: "ductor",
    password: bcrypt.hashSync("ductor", bcrypt.genSaltSync(bcryptSalt)),
    rooms: undefined,
  },
  {
    username: "anacletillo",
    password: bcrypt.hashSync("anacletillo", bcrypt.genSaltSync(bcryptSalt)),
    rooms: undefined,
  },
  {
    username: "grumpyulmo",
    password: bcrypt.hashSync("grumpyulmo", bcrypt.genSaltSync(bcryptSalt)),
    rooms: undefined,
  }
];

let rooms = [
  {
    name: "Public",
    content: [
      {
        message: "Hola buenas, loko",
        owner: "Ductor",
        
      },
      {
        message: "Estamos en la publica, loko",
        owner: "Ductor",

      },
      {
        message: "Increíble, loko",
        owner: "Anacletillo",

      }
    ],
  },
  {
    name: "Public 2",
    content: [
      {
        message: "Hola buenas, loko",
        owner: "Ductor",

      },
      {
        message: "Estamos en la privada1, loko",
        owner: "Ductor",

      },
      {
        message: "Increíble, mano",
        owner: "GrumpyUlmo",

      }
    ],
  },
]

Room.deleteMany()
  .then(() => {
    return Room.create(rooms);
  })
  .then(roomsCreated => {
      console.log(roomsCreated)
      users = users.map((user, idx) => {
      user.rooms = roomsCreated;
      
      return user;
  })

  User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(
      `${usersCreated.length} users created with the following id:`
    );
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });



