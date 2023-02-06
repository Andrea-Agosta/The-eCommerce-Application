const dotenv = require("dotenv");
dotenv.config();
const Store_Mock_data = require('../mockData/Store_Mock_data.json');
const Products_Mock_data = require('../mockData/Products_Mock_data.json');
const User_Mock_data = require('../mockData/User_Mock_data.json');
const { Pool } = require("pg");

const pool = new Pool({
  host: 'localhost',
  database: 'postgres',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const connectionDB = async query => {
  const client = await pool.connect();
  const product = await client.query(query);
  return await product.rows;
};

const populateDbWithData = async () => {
  await User_Mock_data.forEach(async user => {
    const query = `INSERT INTO UserData (id, email, password, role, uniqueStoreId) VALUES ('${user.id}','${user.email}','${user.password}','${user.role}','${user.uniqueStoreId}')`;
    return await connectionDB(query);
  });

  await Store_Mock_data.forEach(async store => {
    const query = `INSERT INTO UserData (id, name, uniqueStoreId) VALUES ('${store.id}','${store.name}','${store.uniqueStoreId}')`;
    return await connectionDB(query);
  });

  await Products_Mock_data.forEach(async product => {
    const query = `
      INSERT INTO UserData (id, title, description, imageUrl, storeId, price, quantity, category ) 
      VALUES ('${product.id}','${product.title}','${product.description}', '${product.imageUrl}', '${product.storeId}' ,'${product.price}', '${product.quantity}', '${product.category}')
    `;
    return await connectionDB(query);
  });
};

populateDbWithData();