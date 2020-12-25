const connectDB = require('./utills/db');
const app = require('./app');

const PORT = process.env.PORT || 8000;

// @desc Connect to database
connectDB();

// @desc Create and listen to server
app.listen(PORT, () =>
  console.log(`Server started successfull at port ${PORT}!`)
);
