import mongoose from "mongoose";

const db = mongoose.connect(
  process.env.MONGODB_URI as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Set the size of the connection pool
    minPoolSize: 0, // Set the minimum number of connections in the pool
  } as any
);

export default db;
