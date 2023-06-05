# bangkit-capstone-backend

## **Api Spesification**

## Register

- Method : POST
- Endpoint : `/api/register`
- Header:
  - Content-Type: application/json
  - Accept: application/json
- Body:

```
{
    "fullname": "string",
    "username": "string",
    "email": "string",
    "password": "string",
    "confirmPasssword": "string"
}
```

- Response

```
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

```
{
    "username": "string",
    "password": "string"
}
```

- Response

```
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

```
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
