
const { MongoClient } = require('mongodb');
require('dotenv').config()
//const MONGO_URL = process.env.MONGO_URL
const MONGO_URL='mongodb://127.0.0.1:27017'
const connectToDB = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URL,{
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('MongoDB connected');
    return client.db('videoStream');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports=connectToDB 
