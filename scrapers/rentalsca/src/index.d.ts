declare module "rentalsca" {
  import { createClient } from "redis";

  export interface Data {
    ecs?: {
      cluster?: {
        ARN?: unknown;
        region?: unknown;
      };
      task?: {
        subnets?: unknown;
        securityGroups?: unknown;
        definition?: unknown;
      };
    };
    browser?: {
      WSEndpointURLQueryParams?: unknown;
      totalConcurrent?: unknown;
    };
    cities: {
      name?: unknown;
    }[];
  }

  export type RedisClient = ReturnType<typeof createClient>;

  export type ListingURL = string;
  export type ListingsURLs = ListingURL[];
}
