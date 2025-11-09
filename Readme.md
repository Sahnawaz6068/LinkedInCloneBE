## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18.x or higher recommended)
* [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)
* A running database instance (e.g., MongoDB, PostgreSQL)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Sahnawaz6068/LinkedInCloneBE](https://github.com/your-username/your-project-name.git)
    cd your-project-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    * Create a `.env` file in the root directory.
    * Copy the contents of `.env.example` (if you have one) into your new `.env` file.
    * Fill in the required values (like `DB_URL`, `JWT_SECRET`, etc.).

    ```.env
    # Example .env file
    DB_URL="your_database_connection_string"
    JWT_SECRET="your_super_secret_key"
    PORT=3000
    JWT_EXPIRES_IN=
    ```
    - DB_URL is MongoDB URL

5.  **Start the development server:**
    ```bash
    npm run dev
    ```

Your server should now be running at `http://localhost:3000`.


## 🚀 API Documentation

This section details the API endpoints for the application.

---

### 1. Authentication

#### `POST /api/v1/auth/register`
Registers a new user in the system.

* **Request Body:**
    ```json
    {
        "name": "Harsh Kumar",
        "email": "lol@3gmail.com",
        "password": "Harsh@123",
        "avatarUrl": "[https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250](https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250)"
    }
    ```
    | Field       | Type   | Required | Description                      |
| ----------- | ------ | -------- | ---------------------------------|
| `name`      | string |  Yes    | Full name of the user             |
| `email`     | string |  Yes    | Unique email address of the user  |
| `password`  | string |  Yes    | Password for the user account     |
| `avatarUrl` | string |  No     | Optional profile avatar image URL |


* **Success Response (201 Created):**
    ```json
    {
        "user": {
            "name": "Harsh Kumar",
            "email": "lol@43gmail.com",
            "avatarUrl": "[https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250](https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250)",
            "_id": "6910743cccd650291fb8d0e2",
            "createdAt": "2025-11-09T11:00:12.992Z",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTA3NDNjY2NkNjUwMjkxZmI4ZDBlMiIsImlhdCI6MTc2MjY4NjAxMywiZXhwIjoxNzYzMjkwODEzfQ.R9MtsEHwtFHND4qM_-2wRKZy4vQjuKr-EdMSlvmV5vQ"
    }
    ```

#### `POST /api/v1/auth/login`
Logs in an existing user and returns a JWT token.

* **Request Body:**
    ```json
    {
        "email": "lol@43gmail.com",
        "password": "Harsh@123"
    }
    ```
* **Success Response (200 OK):**
    ```json
    {
        "user": {
            "_id": "6910743cccd650291fb8d0e2",
            "name": "Harsh Kumar",
            "email": "lol@43gmail.com",
            "avatarUrl": "[https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250](https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250)",
            "createdAt": "2025-11-09T11:00:12.992Z",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTA3NDNjY2NkNjUwMjkxZmI4ZDBlMiIsImlhdCI6MTc2MjY4NjA4MCwiZXhwIjoxNzYzMjkwODgwfQ.KdC21bmxiU6Xw--lz40W4mtNWrc-8XW3ChkIViSTuM4"
    }
    ```

---

### 2. Posts

#### `GET /api/v1/post/feed`
Fetches all posts for the main feed. This is a public route.

* **Request Body:** (None)
* **Success Response (200 OK):**
    ```json
    {
        "success": true,
        "message": "All posts fetched successfully",
        "totalPosts": 9,
        "posts": [
            {
                "_id": "691053d9b435c0ddfe045cc7",
                "user": {
                    "_id": "690e1276c84c6b8b07a7de59",
                    "name": "Sahnawaz Hussain",
                    "email": "sahnawaz@gmail.com",
                    "avatarUrl": null
                },
                "text": "Due to my exam i have build require feature only...",
                "imageUrl": "[https://ik.imagekit.io/yewxrcdog/image.png?updatedAt=1762677681074](https://ik.imagekit.io/yewxrcdog/image.png?updatedAt=1762677681074)",
                "likes": [],
                "commentsCount": 0,
                "createdAt": "2025-11-09T08:42:01.816Z",
                "updatedAt": "2025-11-09T08:42:01.816Z",
                "__v": 0
            },
            {
                "_id": "691043b70301ea7e73c644f4",
                "user": {
                    "_id": "69103460ff337fa3c0ebde63",
                    "name": "Suresh Travels",
                    "email": "suresh@gmail.com",
                    "avatarUrl": ""
                },
                "text": "chaliye suru karte hai",
                "imageUrl": "[https://imgs.search.brave.com/](https://imgs.search.brave.com/)...",
                "likes": [],
                "commentsCount": 0,
                "createdAt": "2025-11-09T07:33:11.314Z",
                "updatedAt": "2025-11-09T07:33:11.314Z",
                "__v": 0
            }
        ]
    }
    ```

#### `POST /api/v1/post/createPost`
Creates a new post. This is a protected route and requires a valid JWT token.

* **Request Body:**
    ```json
    {
        "text": "Imgae url ki kami ho gai smjhe.",
        "imageUrl": ""
    }
    ```
* **Success Response (201 Created):**
    


