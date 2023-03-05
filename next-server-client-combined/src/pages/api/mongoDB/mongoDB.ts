import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  maxPoolSize: 10, // Set the size of the connection pool
  minPoolSize: 0, // Set the minimum number of connections in the pool
};

const client = new MongoClient(uri as string, options as any);

async function connect() {
  await client.connect();
  return client;
}

export default connect;
