import { connectToRedisDatabase } from '@/utils/database/redis'

export const getRedisRankedListingsCacheClient = () => {
  const password = process.env.REDIS_RATEDRENTALS_RANKED_LISTINGS_CACHE_PASSWORD
  const host = process.env.REDIS_RATEDRENTALS_RANKED_LISTINGS_CACHE_HOST
  let port: string | number | undefined =
    process.env.REDIS_RATEDRENTALS_RANKED_LISTINGS_CACHE_PORT
  if (!(port && !isNaN(Number(port)))) {
    throw new Error(
      'Either REDIS_RATEDRENTALS_RANKED_LISTINGS_CACHE_PORT is not defined in .env or is not a number (as a string)'
    )
  }
  port = parseInt(port)
  if (!(password && host)) {
    throw new Error(
      'Either REDIS_RATEDRENTALS_RANKED_LISTINGS_CACHE_PASSWORD, REDIS_RATEDRENTALS_RANKED_LISTINGS_CACHE_HOST, or REDIS_RATEDRENTALS_RANKED_LISTINGS_CACHE_PORT not defined environment variables in .env'
    )
  }
  const cacheData = {
    password: password,
    socket: {
      tls: true,
      host: host,
      port: port,
    },
  }

  return connectToRedisDatabase(cacheData)
}
