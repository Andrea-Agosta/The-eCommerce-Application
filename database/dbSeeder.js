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

  for (let i = 0; i < Store_Mock_data.length; i++) {
    store = Store_Mock_data[i];
    const query = `INSERT INTO storedata (name) VALUES ('${store.name}')`;
    await connectToDB(query);
  }

  for (let i = 0; i < Products_Mock_data.length; i++) {
    store = Products_Mock_data[i];
    const query = `
        INSERT INTO productdata (title, description, imageUrl, storeId, price, quantity, category ) 
        VALUES ('${store.title}','${store.description}', '${store.imageUrl}', '${store.storeId}' ,'${store.price}', '${store.quantity}', '${store.category}')
      `;
    await connectToDB(query);
  }

  for (let i = 0; i < User_Mock_data.length; i++) {
    data = User_Mock_data[i];
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hash = bcrypt.hashSync(data.password, salt);
    const store = Store_Mock_data.find(user => user.uniqueStoreId === user.uniqueStoreId);
    const storeId = store ? data.uniqueStoreId : null;
    const query = `INSERT INTO userdata (email, password, role, storeId) VALUES ('${data.email}','${hash}','${data.role}','${storeId}')`;
    await connectToDB(query);
  }

  console.log('DB Successufully fill with the data.');
};

dbSeeder();