import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

mongoose
  .connect(connectionString, { serverSelectionTimeoutMS: 3000 })
  .then(() => {
    console.log('Connected to octofit_db');
  })
  .catch((error) => {
    console.warn('Warning: could not connect to octofit_db:', error.message);
  });

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
