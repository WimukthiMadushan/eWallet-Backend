import express from 'express';
import dotenv from 'dotenv';
import db from './Database/Databse.js';
import createTables from './Database/Tables.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Check database connection
db.query('SELECT NOW()', async (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);

    await createTables();
  }
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
