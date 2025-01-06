import db from "./Databse.js";

const create_Users_Table = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(200) NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await db.query(queryText);
    console.log('Users table created or already exists');
  } catch (err) {
    console.error('Error creating users table:', err.stack);
  }
};

const create_Category_Table = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS categories (
      category_id SERIAL PRIMARY KEY,
      category_name VARCHAR(20) NOT NULL
    )
  `;
  try {
    await db.query(queryText);
    console.log('Categories table created or already exists');
  } catch (err) {
    console.error('Error creating categories table:', err.stack);
  }
};

const create_Transaction_Type_Table = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS transaction_type (
      type_id SERIAL PRIMARY KEY,
      name VARCHAR(20) NOT NULL
    )
  `;
  try {
    await db.query(queryText);
    console.log('Transaction Type table created or already exists');
  } catch (err) {
    console.error('Error creating transaction type table:', err.stack);
  }
};

const create_Transaction_Table = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      category_id INT NOT NULL,
      type_id INT NOT NULL,
      amount DECIMAL NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (category_id) REFERENCES categories(category_id),
      FOREIGN KEY (type_id) REFERENCES transaction_type(type_id)
    )
  `;
  try {
    await db.query(queryText);
    console.log('Transactions table created or already exists');
  } catch (err) {
    console.error('Error creating transactions table:', err.stack);
  }
};

const createTables = async () => {
  await create_Users_Table();
  await create_Category_Table();
  await create_Transaction_Type_Table();
  await create_Transaction_Table();
};

export default createTables;
