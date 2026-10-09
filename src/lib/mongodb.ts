
import dns from "node:dns";
import { MongoClient, ServerApiVersion } from "mongodb";


dns.setServers(["8.8.8.8"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo._mongoClientPromise ?? client.connect();

if (process.env.NODE_ENV === "development") {
  globalForMongo._mongoClientPromise = clientPromise;
}

export default clientPromise;
