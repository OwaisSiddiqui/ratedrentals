import { NextApiHandler } from 'next'
import { ddbDocClient } from '@/utils/database/dynamodb'
import { isSubscribed } from '@/utils/subscription'
import { PutCommand } from '@aws-sdk/lib-dynamodb'

const DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME:
  | string
  | undefined =
  process.env.DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME
if (!DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME) {
  throw new Error(
    'Define DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME in .env.local'
  )
}

const apiHandler: NextApiHandler = async (req, res) => {
  try {
    const body = JSON.parse(req.body)
    const email = body.email

    const isSubscribedBool = await isSubscribed(email)
    if (isSubscribedBool) {
      return res.status(200).send({})
    }

    await ddbDocClient.send(new PutCommand({
      TableName: DYNAMODB_RATEDRENTALS_SUBSCRIPTION_LIST_TABLE_NAME,
      Item: {
        email: body.email
      }
    }))

    return res.status(200).send({})
  } catch(error) {
    console.log(error)
    return res.status(500).send({})
  }
}

export default apiHandler
