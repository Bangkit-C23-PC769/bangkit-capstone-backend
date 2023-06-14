# bangkit-capstone-backend
This is REST API for Commute Ease Capstone Project Bangkit 2023
## **Api Spesification**
Server : https://commuteease-backend-hia523z72a-et.a.run.app
## Register

- Method : POST
- Endpoint : `/api/register`
- Header:
  - Content-Type: application/json
  - Accept: application/json
- Body:

```json
{
    "fullname": "string",
    "username": "string",
    "email": "string",
    "password": "string",
    "confirmPasssword": "string"
}
```

- Response

```json
{
    "success": "bool",
    "message": "string",
}
```

## Login

- Method : POST
- Endpoint : `/api/login`
- Header:
  - Content-Type: application/json
  - Accept: application/json
- Body:

```json
{
    "username": "string",
    "password": "string"
}
```

- Response

```json
{
    "success": "bool",
    "message": "string",
    "data" : {
        "access_token": "string"
    }
}
```

## Current User

- Method : GET
- Endpoint : `/api/users/me`
- Header:
  - Content-Type: application/json
  - Accept: application/json
  - Authorization: Bearer \*jwt
- Response

```json
{
    "success": "bool",
    "message": "string",
    "data" : {
        "id": "number",
        "firstName": "string",
        "lastName": "string",
        "email": "string"
    }
}
```


## List Stations

- Method : GET
- Endpoint : `/api/stations`
- Header:
  - Content-Type: application/json
  - Accept: application/json
- Response

```json
{
    "success": "bool",
    "data": [
        {
            "id": "int",
            "name": "string",
            "city": "string",
            "address": "string",
            "latitude": "float",
            "longitude": "float",
            "createdAt": "timestamps",
            "updatedAt": "timestamps"
        },
        ...
    ]
}
```

## Get Station By Id

- Method : GET
- Endpoint : `/api/stations/:id`
- Header:
  - Content-Type: application/json
  - Accept: application/json
- Response

```json
{
    "success": true,
    "message": "Create data successfully",
    "data": {
        "id": "int",
        "name": "string",
        "city": "string",
        "address": "string",
        "latitude": "float",
        "longitude": "float",
        "createdAt": "timestamps",
        "updatedAt": "timestamps"
    }
}
```

## Delete Station

- Method : DELETE
- Endpoint : `/api/stations/:id`
- Header:
  - Content-Type: application/json
  - Accept: application/json
- Response

```json
{
    "success": true,
    "message": "Delete Station Successfully"
}
```