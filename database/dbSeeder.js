const dotenv = require("dotenv");
dotenv.config();
const Store_Mock_data = require('../mockData/Store_Mock_data.json');
const Products_Mock_data = require('../mockData/Products_Mock_data.json');
const User_Mock_data = require('../mockData/User_Mock_data.json');
const { Pool } = require("pg");
const bcrypt = require("bcrypt");


const pool = new Pool({
  host: 'localhost',
  database: 'postgres',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 5000,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const connectToDB = async (query) => {
  try {
    const client = await pool.connect();
    const product = await client.query(query);
    client.release();
    return product.rows;
  } catch (err) {
    console.error('Error connecting to the database: ', err.stack);
  };
}

const dbSeeder = async () => {
  await Store_Mock_data.forEach(async store => {
    const query = `INSERT INTO storedata (name) VALUES ('${store.name}')`;
    return await connectToDB(query);
  });

  await Products_Mock_data.forEach(async product => {
    const query = `
        INSERT INTO productdata (title, description, imageUrl, storeId, price, quantity, category ) 
        VALUES ('${product.title}','${product.description}', '${product.imageUrl}', ${product.storeId} ,'${product.price}', ${product.quantity}, '${product.category}')
      `;
    return await connectToDB(query);
  });

  await User_Mock_data.forEach(async user => {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hash = bcrypt.hashSync(user.password, salt);
    const store = Store_Mock_data.find(store => store.uniqueStoreId === user.uniqueStoreId);
    const storeId = store ? store.uniqueStoreId : null;
    const query = `INSERT INTO userdata (email, password, role, storeId) VALUES ('${user.email}','${hash}','${user.role}',${storeId})`;
    return await connectToDB(query);
  });
};

dbSeeder();