const mongoose = require('mongoose');
const config = require('config');

const db = config.get('MONGO_URI');

const connectDb = async () => {
  // Connect to MongoDB
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('DB connection successfull!! 😝');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
