import { createClient } from "redis";

interface ConnectToRedisDatabaseParameters {
  password: string;
  socket: {
    tls: boolean;
    host: string;
    port: number;
  };
}

export async function connectToRedisDatabase({
  password,
  socket,
}: ConnectToRedisDatabaseParameters) {
  const redisDb = createClient({
    password: password,
    socket: socket,
  });

  redisDb.on("error", (error) => {
    console.log("Redis Error:", error);
  });
  redisDb.on("connect", () => {
    console.log("Connected to Redis!");
  });
  redisDb.on("ready", () => {
    console.log("Redis is ready!");
  });

  await redisDb.connect();

  return redisDb;
}
