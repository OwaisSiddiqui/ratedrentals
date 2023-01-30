import { RedisClient } from "rentalsca";

export const getCities = async (cache: RedisClient) => {
  const cities: any[] = [];
  await cache.keys("*").then(async (reply: string[]) => {
    for (let i = 0; i < reply.length; i++) {
      const key = reply[i];
      await cache
        .get(key)
        .then((value: any) => {
          cities.push(JSON.parse(value));
        })
    }
  });
  return cities;
};

export const isCity = (value: string, cities: any[]) => {
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    if (value === city["name"].toLowerCase()) {
      return true;
    }
  }
  return false;
};
