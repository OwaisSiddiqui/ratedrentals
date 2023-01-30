import { ddbDocClient } from "./database/dynamodb"
import { GetCommand } from "@aws-sdk/lib-dynamodb"

const DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME:
  | string
  | undefined =
  process.env.DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME
if (!DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME) {
  throw new Error(
    'Define DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME in .env.local'
  )
}

export const isSubscribed = async (email: string) => {
  const item = ddbDocClient.send(new GetCommand({
    TableName: DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME,
    Key: {
      email: email
    }
  }))
  let result = (await item).Item

  return result ? true : false
}
