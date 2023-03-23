const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.set('strictQuery' , true)
   await mongoose.connect(process.env.LINK_MONGOOSE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect fail");
  }
}

module.exports = { connect };
