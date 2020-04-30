# I&R  API

Project structure derived from:
https://github.com/EusebiuAndrei/trial

## Response structure  
The structure of the API responses' body is as follows:
- for successful responses, a JSON object containing the properties:
    - `success`: `true`
    - `data`: An object, structure detailed for each route below.
- for unsuccessful responses, a JSON object containing the properties:
    - `success`: `false`
    - `error`: An object containing a `message` property, and sometimes additional helpful properties.

## /api/reviews
### GET 
Get the reviews for a provider, optionally filtering them.

**Query parameters**: 
- providerId (required) - 24-character hexadecimal string
- orderBy - `score`, `helpfulness`, `timeCreated`, prepended by a `-` for a descending order, otherwise ascending
- skip - number of reviews to skip
- limit - number of reviews to fetch

**Return codes**:
- 200 - OK
- 404 - no reviews found for the given provider ID (or provider does not exist)

**Usage example**:  
 `localhost:3000/api/reviews/?providerId=5ea42ffa9d79ef49f76669f2&orderBy=-score&skip=2&limit=2`
 
**Returned data example**:
```JSON
{
    "success": true,
    "data": {
        "score": 5.5,
        "reviews": [
            {
                "_id": "5eaad4b646eaba38437e1f18",
                "reviewer": "Danny",
                "score": 6,
                "description": "I am not a robot.",
                "timeCreated": "2020-04-30T13:37:58.552Z",
                "timeModified": "2020-04-30T13:37:58.552Z",
                "helpfulness": 0,
                "__v": 0
            },
            {
                "_id": "5ea431720596f84b44be104f",
                "reviewer": "John Doe",
                "score": 5,
                "description": "Thanks, I hate it.",
                "timeCreated": "2020-04-25T12:47:46.601Z",
                "timeModified": "2020-04-25T12:47:46.601Z",
                "__v": 0,
                "helpfulness": -1
            }
        ]
    }
}
```