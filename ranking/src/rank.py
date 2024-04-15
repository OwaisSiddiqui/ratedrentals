import os
import json
from dotenv.main import load_dotenv
from src.dynamodb import get_dynamodb_table
from datetime import datetime

load_dotenv()

CITY=None

class EventNotFormattedCorrectly(Exception):
    pass


def is_number(value):
    try:
        float(value)
        return True
    except:
        return False

def get_scan_kwargs():
    global CITY
    return {
        'IndexName': 'city.slug-index',
        'KeyConditionExpression': '#city = :cityChoice',
        'ExpressionAttributeNames': {
            "#city": "city.slug"
        },
        'ExpressionAttributeValues': {
            ':cityChoice': CITY
        }
    }


class Preference:
    def __init__(self, user_preferences, table, keys, valid_values, preference, database_key):
        self.keys = keys
        self.valid_values = valid_values
        self.value = self.get_value(user_preferences)
        self.preference = preference
        self.table = table
        self.database_key = database_key

    @staticmethod
    def get_normal(value, max_value, min_value):
        if max_value - min_value == 0:
            return 0
        else:
            return (value - min_value) / (max_value - min_value)

    def get_score():
        pass

    def get_value(self, user_preferences):
        result = None
        i = 0
        while not result and i < len(self.keys):
            result = user_preferences.get(self.keys[i])
            i += 1
        if not result:
            return "any"
        elif is_number(result):
            number_specific_values = self.valid_values.get(
                'number').get('specific')
            range_max = self.valid_values.get('number').get('range').get('max')
            range_min = self.valid_values.get('number').get('range').get('min')
            result_number = float(result)
            if number_specific_values and result_number not in number_specific_values:
                return "any"
            elif range_max and result_number > range_max:
                return range_max
            elif range_min and result_number < range_min:
                return range_min
            return result_number
        else:
            string_values = self.valid_values.get('string')
            if not result in string_values or result == "Any":
                return "any"
        return result

    def __repr__(self) -> str:
        return f"{self.preference} -> {self.value} | keys: {self.keys} | valid_values: {self.valid_values} | preference: {self.preference}"


class NumberPreference(Preference):
    def __init__(self, user_preferences, table, keys, valid_values, preference, database_key, listings):
        super().__init__(user_preferences, table,
                         keys, valid_values, preference, database_key)
        self.listings = listings
        self.max = self.get_extremity(-1)
        self.min = self.get_extremity(1)
        

    def get_extremity(self, extremity_number):
        data = [json.loads(listing[self.database_key])[0] for listing in self.listings]
        if extremity_number == 1:
            return max(data)
        else:
            return min(data)

    def get_score(self, listing_preferences, priorities):
        value = self.value
        if value == "any":
            return 0
        else:
            if value == "biggest-size" or value == "Biggest size":
                value = self.max
            elif value == "lowest-rent" or value == "Lowest rent":
                value = self.min
            normalized_listing_preference_value = self.get_normal(
                listing_preferences[self.preference], self.max, self.min)
            normalized_user_preference_value = self.get_normal(
                value, self.max, self.min)
            return abs(normalized_user_preference_value - normalized_listing_preference_value) * priorities[self.preference]

    def __repr__(self) -> str:
        return super().__repr__() + f" max: {self.max} | min: {self.min}"


class NoNumberPreference(Preference):
    def __init__(self, user_preferences, table, keys, valid_values, preference, database_key):
        super().__init__(user_preferences, table,
                         keys, valid_values, preference, database_key)

    def get_score(self, listing_preferences, priorities):
        if listing_preferences[self.preference] == self.value:
            return 0
        else:
            return priorities[self.preference]


class BedroomPreference(NumberPreference):
    def __init__(self, user_preferences, table, listings):
        super().__init__(user_preferences, table, ["bedrooms", "beds"], {
            "string": ["any", "Any"],
            "number": {
                "specific": [1, 2, 3, 4],
                "range": {
                    "max": None,
                    "min": None
                }
            }
        }, "beds", "array_beds_range", listings)


class BathroomPreference(NumberPreference):
    def __init__(self, user_preferences, table, listings):
        super().__init__(user_preferences, table, ["bathrooms", "baths"], {
            "string": ["any", "Any"],
            "number": {
                "specific": [1, 1.5, 2, 2.5, 3],
                "range": {
                    "max": None,
                    "min": None
                }
            }
        }, "baths", "array_baths_range", listings)


class HomePreference(NoNumberPreference):
    def __init__(self, user_preferences, table):
        super().__init__(user_preferences, table, ["home"], {
            "string": ["any", "house", "condo", "apartment", "town-house", "private-room", "basement", "multi-unit", "duplex", "bachelor", "studio", "shared-room"],
            "number": {
                "specific": None,
                "range": {
                    "max": None,
                    "min": None
                }
            }
        }, "home", "raw_property_type")


class SizePreference(NumberPreference):
    def __init__(self, user_preferences, table, listings):
        super().__init__(user_preferences, table, ["size (in square feet)", "size"], {
            "string": ["any", "Any", "biggest-size", "Biggest size"],
            "number": {
                "range": {
                    "max": float('inf'),
                    "min": 0
                }
            }
        }, "size", "array_dimensions_range", listings)


class RentPreference(NumberPreference):
    def __init__(self, user_preferences, table, listings):
        super().__init__(user_preferences, table, ["rent", "rent price (per month)"], {
            "string": ["any", "Any", "lowest-rent", "Lowest rent"],
            "number": {
                "range": {
                    "max": float('inf'),
                    "min": 0
                }
            }
        }, "rent", "array_rent_range", listings)


def get_listing_preferences(listing):
    return {
        "beds": json.loads(listing["array_beds_range"])[0],
        "baths": json.loads(listing["array_baths_range"])[0],
        "home": listing["raw_property_type"],
        "size": json.loads(listing["array_dimensions_range"])[0],
        "rent": json.loads(listing["array_rent_range"])[0]
    }


def get_priority(user_preferences, preferences):
    max_result_number = 10
    min_result_number = 1
    values = ["-priority", "Priority"]
    result = None
    i = 0
    while not result and i < len(values):
        j = 0
        while not result and j < len(preferences):
            result = user_preferences.get(preferences[j] + values[i])
            j += 1
        i += 1
    if not result:
        return 1
    else:
        result_number = None
        try:
            result_number = int(result)
            if result_number < min_result_number:
                result_number = 1
            elif result_number > max_result_number:
                result_number = 10
        except:
            result_number = 1
        return result_number


def get_priorities(input_user_preferences):
    current = {
        "beds": get_priority(input_user_preferences, ["beds"]),
        "baths": get_priority(input_user_preferences, ["baths"]),
        "home": get_priority(input_user_preferences, ["home"]),
        "size": get_priority(input_user_preferences, ["size"]),
        "rent": get_priority(input_user_preferences, ["price", "rent"])
    }
    total = sum(current.values())
    return {
        "beds": current["beds"] / total,
        "baths": current["baths"] / total,
        "home": current["home"] / total,
        "size": current["size"] / total,
        "rent": current["rent"] / total
    }


def get_score(user_preferences, listing_preferences, priorites):
    score = 0
    for preference in user_preferences.values():
        preference_score = preference.get_score(listing_preferences, priorites)
        score += preference_score

    return score


def handler(event, context):
    input_user_preferences = event.get("rentalPreferences")
    if not input_user_preferences or not type(input_user_preferences.get("city")) is str:
        raise EventNotFormattedCorrectly("No city was given")
    # TODO: Have to check for a valid city through Redis cache database!
    global CITY
    CITY = input_user_preferences["city"]

    table = get_dynamodb_table()
    listings = []
    response = table.query(**get_scan_kwargs())
    total_scanned = 0
    while 'LastEvaluatedKey' in response and total_scanned < 50:
        response = table.query(
            ExclusiveStartKey=response['LastEvaluatedKey'], **get_scan_kwargs())
        listings.extend(response['Items'])
        total_scanned += response['ScannedCount']

    user_preferences = {
        "beds": BedroomPreference(input_user_preferences, table, listings),
        "baths": BathroomPreference(input_user_preferences, table, listings),
        "home": HomePreference(input_user_preferences, table),
        "size": SizePreference(input_user_preferences, table, listings),
        "rent": RentPreference(input_user_preferences, table, listings)
    }
    priorities = get_priorities(input_user_preferences)

    ranked_listings = []
    for listing in listings:
        listing_preferences = get_listing_preferences(listing)
        score = get_score(user_preferences,
                          listing_preferences, priorities)
        ranked_listings.append(
            {"_id": str(listing["oid__id"]), "score": score, "updated": listing["updated"]})
    ranked_listings.sort(key=lambda listing: (listing["score"], datetime.fromisoformat(
        listing['updated'].replace('Z', '+00:00'))), reverse=True)
    return ranked_listings
