# User CRUD API with Express and MongoDB

This is a simple User CRUD (Create, Read, Update, Delete) API built using Express.js and MongoDB. The API allows you to perform basic operations on user data such as creating a new user, fetching all users, fetching a user by ID, updating a user, and deleting a user.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/i-m-prabhat/user-crud-express.git
   ```

2. Change to the project directory:

   ```bash
   cd user-crud-express
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure .env from given .env.example file

    ```
    PORT=3000
    MONGO_URI=your-mongo-uri
    ```

5. Start the server:

   ```bash
   npm start
   ```

The API will be running at `http://localhost:3000`.

## API Endpoints

- **Base URL:** ``http://localhost:3000/api/v1/user``

### Create a new user

- **Endpoint:** `POST /create`
- **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 23
  }
  ```

- **Response:**

  ```json
    {
    "status": 201,
    "success": true,
    "message": "User created successfully",
    "data": {
        "name": "John Doe",
        "email": "<john@example.com>",
        "age": 23
    }
    }
  ```

### Get all users

- **Endpoint:** `GET /get-all`
- **Response:**

  ```json
  {
    "status": 200,
    "success": true,
    "data": [
      {
        "_id": "12345",
        "name": "John Doe",
        "email": "john@example.com",
        "age": 23
      },
      // Other users...
    ],
    "message": "Users fetched successfully"
  }
  ```

### Get user by ID

- **Endpoint:** `GET /:id`
- **Response:**

  ```json
  {
    "status": 200,
    "success": true,
    "data": {
      "_id": "12345",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 23
    },
    "message": "User fetched successfully"
  }
  ```

### Update user by ID

- **Endpoint:** `PUT /:id`
- **Request Body:**

  ```json
  {
    "age": 21
  }
  ```

- **Response:**

  ```json
  {
    "status": 200,
    "success": true,
    "data": {
      "_id": "12345",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 26
    },
    "message": "User updated successfully"
  }
  ```

### Delete user by ID

- **Endpoint:** `DELETE /:id`
- **Response:**

  ```json
  {
    "status": 200,
    "success": true,
    "data": {
      "_id": "12345",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 26
    },
    "message": "User deleted successfully"
  }
  ```

❤❤❤
