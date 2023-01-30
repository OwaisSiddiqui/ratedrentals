import boto3
from dotenv import load_dotenv
import os

load_dotenv()

table_name = os.getenv("DYNAMODB_RATEDRENTALS_TABLE_NAME")

class EnvironmentVariableNotDefined(Exception):
    pass

def get_dynamodb_table():
    if not table_name:
        raise EnvironmentVariableNotDefined("Please define the DYNAMODB_RATEDRENTALS_TABLE_NAME environment variable inside .env")
    client = boto3.resource('dynamodb')
    table = client.Table(table_name)

    return table