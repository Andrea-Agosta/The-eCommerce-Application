# E-commerce Website

This is a web application for an e-commerce website that allows users to register, log in, and authenticate from the backend built with Node.js, Express, and Passport. The backend sends a cookie with JWT to the frontend in React and allows the user to access the protected routes such as the cart. The user can have one of the following roles: user, admin, and superAdmin.

## Backend

The backend of this project is built with Node.js, Express, and Passport. The database is in Postgres in a Docker container. The backend uses Passport to authenticate users, and JWT is used to send the cookie to the frontend. There are three roles: user, admin, and superAdmin.

### Routes

- `/api/user`: API route for registering new users and retrieving user information.
- `/api/auth`: API route for logging in and logging out users.
- `/api/product`: API route for adding, updating, and deleting products.
- `/api/store`: API route for creating and deleting stores.

### Authentication

Passport is used for authentication, jsonwebtoken package create the JWT, and the routes with cookie-parser send the cookie to the frontend. The backend is protected, and the user needs to be logged in to access certain routes. The user's role is checked, and the user must have the appropriate role to access certain routes.

### Database

The database is in Postgres in a Docker container. The database contains tables for users, stores and products.

## Frontend

The frontend of this project is built with React using Vite for bundling and React Router Dom for managing routes. Tailwind CSS is used for styling.

### Pages

- `/`: Home page for the website.
- `/category/:category`: List of product for the specific category.
- `/category/:category/product/:id`: Page for single product.
- `/store`: Store page for admin to view products in thir own store.

### Authentication

Authentication is done by sending the JWT cookie with requests to the backend API. The frontend checks if the user is authenticated and redirects them to the appropriate page based on their role.

## Technologies

- Node.js
- Express
- Passport
- PostgreSQL
- Docker
- React
- Vite
- React Router Dom
- Tailwind CSS
- Typescript

## Installation

To get started, you will need to clone the repository and install the dependencies.

```bash
$ git clone https://github.com/Andrea-Agosta/The-eCommerce-Application.git
$ cd The-eCommerce-Application
$ npm install
```
 Once the dependencies are installed, you can start the development server with the following command:

```bash
$ npm run server
```
This will start the development server at `http://localhost:8080/`.
After, open your docker app or download from [here](https://www.docker.com/).
When the Docker app is running open a new tab on your terminal and type:

```bash
$ npm run docker:init
```
When the build is finished, open another tab on your terminal and run:
```bash
 $ npm run populate
```
This command fill up your postgress database with data. Now run:

```bash
$ cd client
$ npm install
```
 And now you can start the client server with the following command:

```bash
$ npm run dev
```

This will start the React and open the application in your default browser at `http://localhost:5173/`.
