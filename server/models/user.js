import client from '../db.js';

const database = client.db('db1');
database.createCollection('users');
database.createCollection('goals');