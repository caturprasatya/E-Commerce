# My Assets Kanban Server
My Assets App is an application to manage your assets. It performs standard CRUD actions based on RESTful concept.

This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL
* Sequelize JS
* Vue JS
* JWT JS
* Bcrypt JS
* Axios JS
* jest js
* supertest js



&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (500 - Internal Server Error)_
```
{
  "message": "<your message for 400>"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "<your message for 401>"
}
```


&nbsp;

## RESTful endpoints
---
---

# USER
---
### POST /user/login

> Create new asset

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<pasword to get insert into>"
}
```

_Response (200 - OK)_
```
  access_token    

```


_Respone (400 - Bad Request)_
```
[
    {
        "message": "Eamil cannot empty"
    },
    {
        "message": "Password cannot empty"
    }
]
```

_Respone (401 - Unauthorized)_
```
[
    { message : 'Invalid email / password'}
]
```
### POST /user/register

> Create new asset

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
  "name": "<name to get insert into>",
  "email": "<email to get insert into>",
  "password": "<pasword to get insert into>"
}
```

_Response (200 - OK)_
```
{
    "id": 8,
    "name": "prasatya",
    "email": "satya123@mail.com",
    "password": "$2a$10$1XUeI.29eMD/VGpxouAYq.x3wgwUjQkvdOD8nIqLeeWYp/wKneAF.",
    "updatedAt": "2021-03-24T13:17:54.878Z",
    "createdAt": "2021-03-24T13:17:54.878Z",
    "role": "customer"
}    
```

_Respone (400 - Bad Request)_
```
[
    {
        "message": "Name cannot empty"
    },
    {
        "message": "Eamil cannot empty"
    },
    {
        "message": "Password cannot empty"
    },
    {
        "message": "email must be unique",
    }
]
```


# PRODUCTS
---
### GET /products

> Get single asset as defined by the id provided

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": <given id by system>,
        "image_url": "<asset image_url>",
        "name": "<asset name>",
        "category": "<asset category>",
        "price": "<asset price>",
        "stock": "<asset stock>",
        "createdAt": "2021-03-20T07:15:12.149Z",
        "updatedAt": "2021-03-20T07:15:12.149Z",
    },
    {
        "id": <given id by system>,
        "image_url": "<asset image_url>",
        "name": "<asset name>",
        "category": "<asset category>",
        "price": "<asset price>",
        "stock": "<asset stock>",
        "createdAt": "2021-03-20T07:15:12.149Z",
        "updatedAt": "2021-03-20T07:15:12.149Z",
    }
]
```

---
### POST /products

> Create new asset

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "category": "<category to get insert into>"
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "image_url": "<asset image_url>",
    "name": "<asset name>",
    "category": "<asset category>",
    "price": "<asset price>",
    "stock": "<asset stock>",
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
}
```


_Respone (401 - Bad Request)_
```
[
    "Name product cannot empty",
    "Image product must be available",
    'Category product cannot empty',
    "Price cannot empty",
    'Price product must be more than 1',
    "Stock cannot empty",
    'Stock product must be more than 1',
]
```


---
### PUT /products/:id

> Update an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "category": "<category to get insert into>"
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
}
```

_Response (200 - OK)_
```
{
    "id": <given id by system>,
    "image_url": "<asset image_url>",
    "name": "<asset name>",
    "category": "<asset category>",
    "price": "<asset price>",
    "stock": "<asset stock>",
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
}
```

_Respone (401 - Bad Request)_
```
[
    "Name product cannot empty",
    "Image product must be available",
    'Category product cannot empty',
    "Price cannot empty",
    'Price product must be more than 1',
    "Stock cannot empty",
    'Stock product must be more than 1',
]
```

---
### DELETE /products/:id

> Delete an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Success deleted product"
}
```

# BANNERS
---
### GET /banners

> Get single asset as defined by the id provided

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Request Params_
```
not needed
```

_Response (200)_
```
[
    {
        "id": <given id by system>,
        "banner_url": "<asset banner_url>",
        "title": "<asset title>",
        "status": "<asset status>",
        "createdAt": "2021-03-20T07:15:12.149Z",
        "updatedAt": "2021-03-20T07:15:12.149Z",
    },
     {
        "id": <given id by system>,
        "banner_url": "<asset banner_url>",
        "title": "<asset title>",
        "status": "<asset status>",
        "createdAt": "2021-03-20T07:15:12.149Z",
        "updatedAt": "2021-03-20T07:15:12.149Z",
    }
]
```

---
### POST /banners

> Create new asset

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
{
    "title": "<title to get insert into>",
    "banner_url": "<banner_url to get insert into>",
    "status": "<status to get insert into>",
}
```

_Response (201 - Created)_
```
 {
    "id": <given id by system>,
    "banner_url": "<asset banner_url>",
    "title": "<asset title>",
    "status": "<asset status>",
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
}
```

_Respone (401 - Bad Request)_
```
[
    "Title cannot empty",
    "Image banner must be available",
    "Status cannot empty",
    'This type must be url'
]
```


---
### PUT /banners/:id

> Update an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
{
    "title": "<title to get insert into>",
    "banner_url": "<banner_url to get insert into>",
    "status": "<status to get insert into>",
}
```

_Response (200 - OK)_
```
 {
    "id": <given id by system>,
    "banner_url": "<asset banner_url>",
    "title": "<asset title>",
    "status": "<asset status>",
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
}
```

_Respone (401 - Bad Request)_
```
[
    "Title cannot empty",
    "Image banner must be available",
    "Status cannot empty",
    'This type must be url'
]
```

---
### DELETE /banners/:id

> Delete an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Success deleted banner"
}
```

---

# CART
---
### GET /carts

> Get single asset as defined by the id provided

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
not needed
```

_Response (200)_
```
[
    {
        "id": <given id by system>,
        "UserId": "<asset UserIde>",
        "ProductId": "<asset ProductId>",
        "createdAt": "2021-03-20T07:15:12.149Z",
        "updatedAt": "2021-03-20T07:15:12.149Z",
        "Product": {
            "id": <given id by system>,
            "name": "<asset name>",
            "image_url": "<asset image_url>",
            "price": <asset price>,
            "stock": <asset stock>,
            "category": "<asset category>",
            "createdAt": "2021-03-21T01:29:46.061Z",
            "updatedAt": "2021-03-21T01:29:46.061Z"
        }
    },
     {
        "id": <given id by system>,
        "banner_url": "<asset banner_url>",
        "title": "<asset title>",
        "status": "<asset status>",
        "createdAt": "2021-03-20T07:15:12.149Z",
        "updatedAt": "2021-03-20T07:15:12.149Z",
        "Product": {
            "id": <given id by system>,
            "name": "<asset name>",
            "image_url": "<asset image_url>",
            "price": <asset price>,
            "stock": <asset stock>,
            "category": "<asset category>",
            "createdAt": "2021-03-21T01:29:46.061Z",
            "updatedAt": "2021-03-21T01:29:46.061Z"
        }
    }
]
```

---
### POST /carts

> Create new asset

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": <given id by system>
}
```

_Request Headers_
```
{
    "UserId": "<asset UserIde>"
}
```

_Response (201 - Created)_
```
 {
    "id": <given id by system>,
    "UserId": "<asset UserId>",
    "ProductId": "<asset ProductId>",
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
}
```

_Respone (401 - Bad Request)_
```
[
    "UserId cannot null",
    "ProductId cannot null",
]
```


---
### PATCH /carts/:id

> Update an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
{
    "ProductId": "<ProductId to get insert into>",
    "amount": "<amount to get insert into>",
}
```

_Response (200 - OK)_
```
 {
    "id": <given id by system>,
    "UserId": "<asset UserId>",
    "ProductId": "<asset ProductId>",
    "amount": "<asset amount>",
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
}
```

_Respone (400 - Bad Request)_
```
[
    "UserId cannot null",
    "ProductId cannot null",
]
{
    message: 'More than product data'
}
```

---
### DELETE /carts/:id

> Delete an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  message: "Successfully delete appreciation"
}
```

# WISHLIST
---
### GET /wcheckout
>peritemet single asset as defined by the id provided

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
not needed
```

_Response (200)_
```
[
    {
        "id": <given id by system>,
        "UserId": <asset UserId>,
        "ProductId": <asset ProductId>,
        "Product": {
            "id": <given id by system>,
            "name": "<asset name>",
            "image_url": "<asset image_url>",
            "price": <asset price>,
            "stock": <asset stock>,
            "category": "<asset category>",
            "createdAt": "2021-03-21T01:29:46.061Z",
            "updatedAt": "2021-03-21T01:29:46.061Z"
        }
    },
    {
        "id": <given id by system>,
        "UserId": <asset UserId>,
        "ProductId": <asset ProductId>,
        "Product": {
            "id": <given id by system>,
            "name": "<asset name>",
            "image_url": "<asset image_url>",
            "price": <asset price>,
            "stock": <asset stock>,
            "category": "<asset category>",
            "createdAt": "2021-03-21T01:29:46.061Z",
            "updatedAt": "2021-03-21T01:29:46.061Z"
        }
    }
]
```

---
### POST /wishlists/:ProductId

> Create new asset

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "ProductId": <your input ProductId>
}
```

_Request CurrentUser_
```
{
    "UserId": "<UserId to get insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "UserId": <asset UserId>,
    "ProductId": <asset ProductId>,
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
}
```

_Respone (400 - Bad Request)_
```
[
    'UserId cannot empty',
    'UserId must be more than 0',
    'ProductId cannot empty'
    'ProductId must be more than 0'
],
{ 
    message: 'The wishlist has been input'
}
```

---
### DELETE /wishlists/:id

> Delete an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Successfully delete wishlist" 
}
```

---
### POST /wishlists/:ProductId

> Create new asset

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "ProductId": <your input ProductId>
}
```

_Request CurrentUser_
```
{
    "UserId": "<UserId to get insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "UserId": <asset UserId>,
    "ProductId": <asset ProductId>,
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
}
```

_Respone (400 - Bad Request)_
```
[
    'UserId cannot empty',
    'UserId must be more than 0',
    'ProductId cannot empty'
    'ProductId must be more than 0'
],
{ 
    message: 'The wishlist has been input'
}
```

---
# CHECKOUT
---
### Post /checkout/peritem

> ceate or update an asset defined by the id provided

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Params_
```
no needed
```

_Request Body_
```
{
    "id": "<UserId to get insert into>",
    "UserId": "<UserId to get insert into>",
    "ProductId": "<ProductId to get insert into>",
    "amount": "<amount to get insert into>"
}
```

_Response (200 - OK)_
```
{
    "id": <given id by system>,
    "image_url": "<asset image_url>",
    "name": "<asset name>",
    "category": "<asset category>",
    "price": "<asset price>",
    "stock": "<asset stock>",
    "createdAt": "2021-03-20T07:15:12.149Z",
    "updatedAt": "2021-03-20T07:15:12.149Z",
},
{
    "message": "Success update"
}

```

_Response (201 - created)_
```
{
  "message": "Successfully create" 
}
```

_Response (400 - bad request)_
```
{
  "message": "Stock is not enough" 
}
```

_Response (404 - not found)_
```
{
  "message": "Product Not Found" 
}
```