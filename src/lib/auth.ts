import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

dns.setServers(["8.8.8.8"]);

const uri = process.env.BETTER_AUTH_MONGODB_URI;

if (!uri) {
  throw new Error("BETTER_AUTH_MONGODB_URI is missing");
}

const client = new MongoClient(uri);
const db = client.db("bazar_dor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

     github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google", "github"],
      },
  },

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
