const mongoose = require("mongoose");
module.exports.conect = async  () => {
   try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect is completed!");
   } catch (error) {
    console.log("Connect isn't completed!");
    console.log(error);
   }
}