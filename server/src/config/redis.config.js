import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

const connectionRedis = async () => {
  await client.connect();
  console.log("Redis connected!");
};

connectionRedis();
module.exports = client;
