import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { mongo?: MongoClient };
const client =
  globalForMongo.mongo ?? new MongoClient(process.env.BETTER_AUTH_DB_URL!);
if (process.env.NODE_ENV !== "production") globalForMongo.mongo = client;

export const auth = betterAuth({
  database: mongodbAdapter(client.db("bazar-dor")),
  emailAndPassword: { enabled: true, autoSignIn: false },
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
});