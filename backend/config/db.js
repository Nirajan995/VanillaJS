const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://nirajankunwor604:wl4hZsSw48od5HOI@cluster0.b2jya8e.mongodb.net/?retryWrites=true&w=majority";

const connDB = async () => {
   try {
      const conn = await mongoose.connect(MONGO_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
   } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
   }
};

module.exports = connDB;
