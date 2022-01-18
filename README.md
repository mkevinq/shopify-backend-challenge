# Shopify Backend Challenge Submission

This is my submission for the Summer 2022 Shopify Backend Intern Challenge!

## About

Some of the notable technologies this submission uses:

- Nest.js
- TypeScript
- MongoDB
- Docker

Please read the instructions below on how to install and use the app. This
submission does NOT have any UI component. This is purely a REST API.

## Table of contents

1. [Installation / Running the app](#intro)
2. [Testing](#testing)
   - [Item Creation](#item-create)
   - [Finding an item](#item-find)
   - [Fetching a list of items](#items-list)
   - [Updating an item](#item-update)
   - [Deleting an item](#item-delete)
   - [Extra feature: Creating a warehouse with item inventory](#warehouse-create)
   - [Continuing the extra feature: Checking total inventory for an item](#warehouse-inventory)
   - [Continuing the extra feature: other endpoints](#warehouse-other)

<a name="intro"></a>

## Installation / Running the app

For ease of getting started, this app can be started using Docker-Compose.

Make sure to install [Docker Compose](https://docs.docker.com/compose/install/),
following the instructions for your respective OS.

Then in a command line:

- Navigate to the root of this repository
- Run `docker-compose up --build`

Now the app should be running at `localhost:3000`, and the database should
be running at `localhost:27017`.

<a name="testing"></a>

## Testing

For testing the API, I personally use [Postman](https://www.postman.com/downloads/).

For viewing data in the database, you can use any MongoDB GUI, like Atlas or
[Robo 3T](https://robomongo.org/download).

The following screenshots show how to connect using Robo 3T (File > Connect > Create):

![image](https://user-images.githubusercontent.com/33074023/150006062-8eb26459-f927-4811-ad2e-084b3d96d8c4.png)
![image](https://user-images.githubusercontent.com/33074023/150006096-e2ef2ab6-793b-4fa5-8836-647c34447a91.png)
![image](https://user-images.githubusercontent.com/33074023/150006126-2eaca38f-854e-4fbd-92e6-50ea0a7f6998.png)
![image](https://user-images.githubusercontent.com/33074023/150006140-f0f00e0a-d64a-40b6-b003-6a79e78e9b7a.png)
![image](https://user-images.githubusercontent.com/33074023/150006161-7655f4e0-dd64-4ff8-b170-3cbf63852248.png)

<a name="item-create"></a>

### Item Creation

Creates a new item in the items collection.

To create an item, make the following request in Postman:

`POST http://localhost:3000/items`

Body params:

- `name` (string): The name of the product
- `description` (string): Product's description

Sample response:

```json
{
  "description": "this is a test product",
  "name": "test",
  "_id": "61e717cdcc9e7d4776fec19c",
  "__v": 0
}
```

**Example:**

Request and response in Postman:

![image](https://user-images.githubusercontent.com/33074023/150007313-ff270df8-2813-4151-b8bc-945bbf7f8512.png)

You should also be able to see the product in the database:

![image](https://user-images.githubusercontent.com/33074023/150007486-5f8ff95b-3baf-4835-8799-4b48ed63a53f.png)

<a name="item-find"></a>

### Find an item

Returns the data for a single item from the database.

To find an item, make the following request in Postman:

`GET http://localhost:3000/items/:id`

Path params:

- `id` (string): The ID of the product from the database.

Sample response:

```json
{
  "_id": "61e717cdcc9e7d4776fec19c",
  "description": "this is a test product",
  "name": "test",
  "__v": 0
}
```

**Example:**

Request and response in Postman:

![image](https://user-images.githubusercontent.com/33074023/150008093-adb96b1d-9aa2-47ae-baf8-81843fa198ed.png)

<a name="items-list"></a>

### Fetching a list of items

Returns the data for multiple items in the database. This endpoint is paginated.
Each page will list at most 50 items. The last page is indicated if the page
returns less than 50 items.

To list items, make the following request in Postman:

`GET http://localhost:3000/items`

Query params:

- `page` (number): The page to fetch

Sample response:

```json
[
  {
    "_id": "61e717cdcc9e7d4776fec19c",
    "description": "this is a test product",
    "name": "test",
    "__v": 0
  },
  {
    "_id": "61e71a02cc9e7d4776fec1a0",
    "description": "this is a test product",
    "name": "test 2",
    "__v": 0
  },
  {
    "_id": "61e71a05cc9e7d4776fec1a2",
    "description": "this is a test product",
    "name": "test 3",
    "__v": 0
  },
  {
    "_id": "61e71a07cc9e7d4776fec1a4",
    "description": "this is a test product",
    "name": "test 4",
    "__v": 0
  }
]
```

**Example:**

Request and response in Postman:

![image](https://user-images.githubusercontent.com/33074023/150008837-2dbe8f43-4e50-49dc-8327-87f61fb81e59.png)
![image](https://user-images.githubusercontent.com/33074023/150008935-b28fd630-8634-41ae-a1df-17e3d9d531fc.png)

<a name="item-update"></a>

### Updating an item

To update an item, make the following request in Postman:

`PATCH http://localhost:3000/items/:id`

Path params:

- `id` (string): The ID of the product from the database.

Body params:

- `name` (optional, string): The name of the product
- `description` (optional, string): Product's description

Sample response:

```json
{
  "_id": "61e717cdcc9e7d4776fec19c",
  "description": "updated description for item",
  "name": "new name for the product",
  "__v": 0
}
```

**Example:**

Request and response in Postman:

![image](https://user-images.githubusercontent.com/33074023/150009465-083753fa-cc0e-4f2a-a53a-bb7803d877aa.png)

You should also be able to see the updated product data in the database:

![image](https://user-images.githubusercontent.com/33074023/150009522-84fc65c4-e1b7-4c46-abbf-c48b2cbc796f.png)

<a name="item-delete"></a>

### Deleting an item

To delete an item, make the following request in Postman:

`DELETE http://localhost:3000/items/:id`

Path params:

- `id` (string): The ID of the product from the database.

Sample response:

```json
{
  "deletedCount": 1
}
```

**Example:**

Request and response in Postman:

![image](https://user-images.githubusercontent.com/33074023/150009465-083753fa-cc0e-4f2a-a53a-bb7803d877aa.png)

The product should no longer exist in the database:

![image](https://user-images.githubusercontent.com/33074023/150009901-3aa0274f-204a-4f2d-acfe-ecf5d70b8774.png)

<a name="warehouse-create"></a>

### Extra feature: Creating a warehouse with item inventory

I chose to implement the feature of adding warehouses/locations that can have inventory
for multiple items.

To create a warehouse, make the following request in Postman:

`POST http://localhost:3000/warehouses`

Body params:

- `name` (string): Name of the warehouse
- `address` (string): Address of the warehouse
- `inventory` (array of objects): List that contains information about how many of each item the warehouse has. Each object in the array must contain:
  - `item` (string): Object ID of the item
  - `amount` (number): The amount of the item stored in the warehouse

Sample response:

```json
{
  "inventory": [
    {
      "amount": 32,
      "item": "61e71a02cc9e7d4776fec1a0"
    }
  ],
  "address": "test street 123, toronto, ontario, canada",
  "name": "warehouse a",
  "_id": "61e71e50cc9e7d4776fec1ae",
  "__v": 0
}
```

**Example:**

Request and repsonse in Postman:

![image](https://user-images.githubusercontent.com/33074023/150010971-e45af66a-8727-4500-8a47-7df7bc834fce.png)

You should also be able to see the warehouse in the database:

![image](https://user-images.githubusercontent.com/33074023/150011054-1fa4b815-3dab-4e53-a87f-f88dbb34b274.png)

<a name="warehouse-inventory"></a>

### Continuing the extra feature: Checking total inventory for an item

After you create a warehouse, you can check the total inventory of an item.
The returned number is the total stock of that item across all warehouses.

To check the total inventory, make the following request in Postman:

`GET http://localhost:3000/items/inventory/:id`

Path params:

- `id` (string): The ID of the product from the database.

Sample response:

```
32
```

**Example:**

Request and response in Postman:

![image](https://user-images.githubusercontent.com/33074023/150011617-559eae92-a368-4f9e-a120-c80c17279060.png)

<a name="warehouse-other"></a>

### Continuing the extra feature: other endpoints

Similarly to the CRUD endpoints for items, you can delete, update and find warehouses.

For the sake of keeping this file short: use the following endpoints:

- Update: `PATCH http://localhost:3000/warehouses/:id`
- Delete: `DELETE http://localhost:3000/warehouses/:id`
- Find: `GET http://localhost:3000/warehouses/:id`
