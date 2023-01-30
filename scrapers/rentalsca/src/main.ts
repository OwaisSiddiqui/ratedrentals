import { Data } from "rentalsca";
import scraper from "./scraper";
import { clearRatedRentalsCache } from "./utils/clearRatedRentalsCache";

(async () => {
  const input: Data = {
    ecs: {
      cluster: {
        ARN: "arn:aws:ecs:us-east-2:467347433436:cluster/browserless-docker-cluster",
        region: "us-east-2",
      },
      task: {
        subnets: ["subnet-0e69a8fc30c3f06f6", "subnet-099eb61936dbab8ff"],
        securityGroups: ["sg-04001144338a7380d"],
        definition: "browserless-docker-task:46",
      },
    },
    browser: { totalConcurrent: 40 },
    cities: [
      { name: "london" },
      { name: "vaughan" },
      { name: "brampton" },
      { name: "ottawa" },
      { name: "kitchener" },
      { name: "windsor" },
      { name: "markham" },
      { name: "mississauga" },
      { name: "hamilton" }
    ],
  };

  console.log("Scraping listings...");
  await scraper(input);
  console.log("Clearing RatedRentals cache...");
  await clearRatedRentalsCache();
})();
