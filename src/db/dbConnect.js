import mongoose from 'mongoose';
import config from '../config/index.js';

// Define an asynchronous function for connecting to a MongoDB database
const dbConnect = async () => {
  try {
    // connect to the MongoDB database using the 'mongoose' library
    await mongoose.connect(config.databaseUrl);
    console.log('database connect successfully');
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
