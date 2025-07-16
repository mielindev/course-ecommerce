# Course E-commerce Platform

==========================

## Description

---

A full-stack e-commerce platform for online courses, built with React, Node.js, and MongoDB. The platform allows users to browse and purchase courses, view course details, and manage their account.

## Installation

---

To install the project, follow these steps:

1.  Clone the repository: `git clone https://github.com/mielindev/course-ecommerce.git`
2.  Install dependencies: `npm install` (in both `frontend` and `backend` folders)
3.  Start the backend server: `npm start` (in the `backend` folder)
4.  Start the frontend server: `npm start` (in the `frontend` folder)

## Usage

---

To use the platform, follow these steps:

1.  Open the frontend server in your browser: `http://localhost:3000`
2.  Browse courses and add them to your cart
3.  Checkout and complete your purchase
4.  View your course details and manage your account

## API Endpoints

---

The backend API provides the following endpoints:

### Category Routes

- `POST /api/category`: Create a new category
- `GET /api/category`: Retrieve a list of all categories

### Product Routes

- `GET /api/products`: Retrieve a list of all products
- `GET /api/products/:id`: Retrieve a single product by ID
- `GET /api/products/explore/suggestions`: Retrieve a list of suggested products

### Favorite Routes

- `POST /api/favorites`: Add a product to favorites
- `GET /api/favorites`: Retrieve a list of all favorite products
- `DELETE /api/favorites/:productId`: Remove a product from favorites

### Viewed Routes

- `POST /api/viewed`: Add a product to viewed
- `GET /api/viewed`: Retrieve a list of all viewed products
- `DELETE /api/viewed`: Remove all viewed products

### Auth Routes

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `POST /api/auth/logout`: Logout a user
- `GET /api/auth/check`: Check if a user is authenticated
- `PUT /api/auth/update`: Update a user's profile picture

### Cart Routes

- `GET /api/cart`: Retrieve a user's cart
- `POST /api/cart/add`: Add a product to a user's cart
- `PUT /api/cart/update`: Update a product in a user's cart
- `DELETE /api/cart/remove/:productId`: Remove a product from a user's cart

## Structure

---

The project is divided into two main folders: `frontend` and `backend`.

- **Frontend**: Contains the React application code, including components, containers, and utilities.
- **Backend**: Contains the Node.js application code, including routes, controllers, and models.

## Tech Stack

---

- **Frontend**: React, React Router, Zustand, DaisyUi, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB

## Features

---

- **Course Catalog**: A comprehensive catalog of courses with details such as course name, description, price, and ratings.
- **Course Search**: Users can search for courses by name, category, or keyword.
- **Course Details**: Detailed information about each course, including course description, instructor, and reviews.
- **User Account Management**: Users can create an account, login, and manage their profile.
- **History Management**: Users can view their order history and track the status of their orders.

## License

---

This project is licensed under the ISC License.

## Environment Variables

---

The project uses the following environment variables:

- `MONGO_URI`: The URI of the MongoDB database
- `NODE_ENV`: The environment in which the application is running (e.g. development, production)
- `PORT`: The port on which the application is running
