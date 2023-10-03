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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDY1MjQ3"
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDY1Mj"
}
```

## GET /users/token

### Request:

```js
fetch(`${API}/users/token`, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy1m",
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
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy1mZ",
  },
  body: JSON.stringify({
    title: "Pay Bills", 
    description: "Pay electric and water bills", // optional
    categoryId: "f3e47327-808e-4343-b6d9-bed030c2e9ff",
    due_date: "2023-10-15",
    priority: "medium", //optional
  }),
});
```
### Response:

```js
{
  "success": true,
  "task": {
      "id": 123,
      "title": "Pay Bills",
      "description": "Pay electric and water bills",
      "categoryId" : "f3e47327-808e-4343-b6d9-bed030c2e9ff",
      "due_date": "22023-10-15",
      "priority": "medium",
      "completed": false
    }
}
```

## DELETE /tasks/:id

### Request:

```js
fetch(`${API}/tasks/2`, {
  method: "DELETE",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwM2NhMTI4MS1kZG",
  },
});
```

### Response:

```js
{
  "success": true,
  "task":   {
      "id": 2,
      "title": "Finish project report"
    }
}
```

## PUT /tasks/:id 

### Request:

```js
fetch(`${API}/tasks/2`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy",
  },
  body: JSON.stringify({
      title: "Start project report", //optional
      description: "Complete the Q4 sales report", //optional
      due_date: "2023-10-20", //optional
      priority: "low", //optional
      completed: false, //optional
      category: "remote-work" //optional
  }),
});
```

### Response:

```js
{
  "success": true,
  "task": {
    "title": "Start project report",
    "description": "Complete the Q4 sales report",
    "due_date": "2023-10-20",
    "priority": "low",
    "completed": false,
    "category": "remote-work"
  }
}
```

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
