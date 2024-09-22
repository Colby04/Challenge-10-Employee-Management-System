const { Client } = require('pg');
const inquirer = require('inquirer');

const client = new Client({
  user: 'your_username',
  host: 'localhost',
  database: 'inventory_db',
  password: 'your_password',
  port: 5432,
});

client.connect();

module.exports = client;