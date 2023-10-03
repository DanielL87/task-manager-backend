# Task-Manager-backend
Back end repository for capstone project.

`const API = "localhost://3000" `
# Users

## POST /users/register
### Request:
```js
fetch(`${API}/users/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "Daniel",
    password: "123",
  }),
});
```

### Response:

```js
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDY1MjQ3Ny0yZDY1LTQzYzctYTJmMS1mMzU4ZTQyMGQxYWEiLCJpYXQiOjE2OTQ1Mjk3MDh9.a1HjJulV55JAwyKfKt8sTjpq0AKgGcahBNM1efgFE5g"
}
```

## POST /users/login

### Request:

```js
fetch(`${API}/users/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "Daniel",
    password: "123",
  }),
});
```

### Response:

```js
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDY1MjQ3Ny0yZDY1LTQzYzctYTJmMS1mMzU4ZTQyMGQxYWEiLCJpYXQiOjE2OTQ1Mjk3MDh9.a1HjJulV55JAwyKfKt8sTjpq0AKgGcahBNM1efgFE5g"
}
```

## GET /users/token

### Request:

```js
fetch(`${API}/users/token`, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy1mZTE0LTQ2NzgtYjAwMC03YzJkNTFkYmE3MWEiLCJpYXQiOjE2OTQ1MjE5Nzl9.6qiWcCWgOA3Wvie8pjimOs1j8irhOQy6WfdVUNhUhkU",
  },
});
```

### Response:

```js
{
  "success": true,
  "user": {
    "id": "03ca1281-ddb3-4421-a8f6-22c76b6a99b8",
    "username": "Daniel"
  }
}
```

# Tasks
## GET /tasks

### Request:

```js
fetch(`${API}/tasks`);
```

### Response:

```
{
  "success": true,
  "tasks": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread, and fruits",
      "due_date": "2023-10-10",
      "created_at": "2023-5-20T10:30:00Z",
      "updated_at": "2023-09-20T10:30:00Z",
      "priority": "high",
      "completed": false,
      "category": "home"
    },
    {
      "id": 2,
      "title": "Finish project report",
      "description": "Complete the Q3 sales report",
      "due_date": "2023-10-15",
      "created_at": "2023-09-20T10:30:00Z",
      "updated_at": "2023-09-20T10:30:00Z",
      "priority": "medium",
      "completed": true,
      "category": "work"
    },
    {
      "id": 3,
      "title": "Pay utility bills",
      "description": "Electricity and water bills",
      "due_date": "2023-10-20",
      "created_at": "2023-07-20T10:30:00Z",
      "updated_at": "2023-09-20T10:30:00Z",
      "priority": "low",
      "completed": false,
      "category": "home"
    }
  ]
}
```



## GET /tasks/:id

### Request:

```js
fetch(`${API}/tasks/2`);
```
### Response:

```
{
  "status": "success",
  "task": {
      "id": 2,
      "title": "Finish project report",
      "description": "Complete the Q3 sales report",
      "due_date": "2023-10-15",
      "created_at": "2023-09-20T10:30:00Z",
      "updated_at": "2023-09-20T10:30:00Z",
      "priority": "medium",
      "completed": true,
      "category": "work"
    }
}

```

## POST /tasks

### Request:

```js
fetch(`${API}/tasks`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy1mZTE0LTQ2NzgtYjAwMC03YzJkNTFkYmE3MWEiLCJpYXQiOjE2OTQ1MjE5Nzl9.6qiWcCWgOA3Wvie8pjimOs1j8irhOQy6WfdVUNhUhkU",
  },
  body: JSON.stringify({
    title: "Review of the new iphone 13 mini", 
    description: "it's pretty good!", // optional
    categoryId: "f3e47327-808e-4343-b6d9-bed030c2e9ff",
    due_date: "2023-10-15",
    priority: "medium", //optional
  }),
});
```


## DELETE /tasks/:id

## PUT /tasks/:id 

# Categories
## GET /categories

## GET /categories/:id

## POST /categories

## DELETE /categories

## PUT /categories

# Alerts

## GET /tasks/:id/alerts

## POST /tasks/:id/alerts 

## DELETE /tasks/:id/alerts

## PUT /tasks/:id/alerts
