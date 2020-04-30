# I&R API

Project structure derived from: https://github.com/EusebiuAndrei/trial

## Response structure

The structure of the API responses' body is as follows:

-   for successful responses, a JSON object containing the properties:
    -   `success`: `true`
    -   `data`: An object, structure detailed for each route below.
-   for unsuccessful responses, a JSON object containing the
    properties:
    -   `success`: `false`
    -   `error`: An object containing a `message` property, and
        sometimes additional helpful properties.

## /api/reviews

### GET

Get the reviews for a provider, optionally filtering them.

**Query parameters**:

-   providerId (required) - 24-character hexadecimal string
-   orderBy - `score`, `helpfulness`, `timeCreated`, prepended by a
    `-` for a descending order, otherwise ascending
-   skip - number of reviews to skip
-   limit - number of reviews to fetch

**Return codes**:

-   200 - OK
-   404 - no reviews found for the given provider ID (or provider does
    not exist)

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

### POST

Create a new review.

**Body**:  
A JSON object containing the following fields:

-   providerId (required) - 24-character hexadecimal string
-   reviewerId (required) - 24-character hexadecimal string
-   score (required) - an integer, 1 to 10 (each point represents half
    a star)
-   description - a string, 1 to 1000 characters

Additionally, no more than a single review for the same (provider,
reviewer) pair is allowed to exist at the same time.

**Body example**:

```JSON
{
	"providerId": "5ea42ffa9d79ef49f76669f2",
	"reviewerId": "5eaaaf54a0ae0d65376de99d",
	"score": "6",
	"description": "They have decent eats."
}
```

The back-end will add equal `timeCreated` and `timeModified` to these
properties, as well as a `helpfulness` score of `0`.

**Response codes**:

-   201 - review succesfully created
-   400 - review body malformed, or duplicate review attempted

**Returned data**:

The `data` field in a successful response will contain a an `id`
property with the string for the new review's `_id`.

### PUT

Replace the score and description of a given review, as well as update
its `timeModified` property to the current time.

**URL parameter**:

The ID of the modified review should be specified in the URL:  
`.../api/reviews/5ea431720596f84b44be104f`  
This ID should be the 24-character hex-string corresponding to the
review's `_id`.

**Body**:

A JSON object containing the following fields:

-   score (required) - an integer, 1 to 10
-   description - string, 1 to 1000 characters

**Response codes**:

-   200 - the review body was succesfully replaced
-   404 - the review was not found

**Returned data**: The `data` field in a successful response is an
empty object.

### PATCH

Update a review's helpfulness score by -1 or +1.

**URL parameter**:  

The ID of the review should be specified in the URL:  
`.../api/reviews/5ea431720596f84b44be104f`  
This ID should be the 24-character hex-string corresponding to the review's
`_id`.

**Body**:  
A JSON object object containing the following field:
- delta (required) - either `-1`, or `1`

**Response codes**:

-   200 - the review's helpfulness was successfully modified
-   404 - the review was not found

## /api/providers
###This API route is deprecated. It will be removed when another module's API can take its role.

**Usage examples**:
- `GET .../api/providers/tag=cafe&tag=pizza` - returns a list of all providers with both "cafe" and "pizza" in their tag list.
- `GET .../api/providers/some_id` - returns the provider with the given `_id`