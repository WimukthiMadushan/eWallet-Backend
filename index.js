import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from "./Routes/Auth.js";
import transactionRoutes from "./Routes/Transaction.js";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://e-wallet-b9lhci3g4-wimukthimadushans-projects.vercel.app',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Placeholder for routes
app.use("/api/auth", authRoutes);
app.use('/api/transaction', transactionRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
