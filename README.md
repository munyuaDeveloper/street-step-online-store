
# Street Step

**Street Step** is an online platform designed to provide users with the latest trends in urban streetwear. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), Street Step offers a seamless shopping experience with a focus on high-quality, fashionable products.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

Street Step is a modern web application that caters to fashion enthusiasts looking for the latest streetwear styles. The platform allows users to browse, search, and purchase a variety of streetwear items, including clothing, footwear, and accessories.

## Features

- **User Authentication:** Secure user registration and login system using JWT.
- **Product Management:** Admin panel to add, edit, and delete products.
- **Shopping Cart:** Add and remove items from the cart with real-time updates.
- **Order Processing:** Seamless checkout process with payment integration.
- **Search and Filter:** Advanced search and filter options for products.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend:**
  - React.js
  - Redux (State Management)
  - React Router (Navigation)
  - Axios (HTTP Requests)
  - Tailwind CSS (Styling)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Database)
  - Mongoose (ODM)
  - JSON Web Tokens (JWT) for authentication

- **Tools:**
  - Webpack (Module Bundler)
  - Babel (JavaScript Compiler)
  - ESLint (Linting)
  - Prettier (Code Formatting)

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [MongoDB](https://www.mongodb.com/) (v4.x or higher)
- [Git](https://git-scm.com/)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/munyuaDeveloper/street-step-online-store.git
   cd street-step
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory and add the following:

   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=your_frontend_server_url
   PORT=8000
   ```

4. **Start the Backend Server**

   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

2. **Start the Frontend Server**

   ```bash
   npm run dev
   ```

3. **Open the Application**

   Navigate to `http://localhost:5173` in your web browser to view the application.

## Usage

- **Sign Up/Login:** Register a new account or log in with existing credentials.
- **Browse Products:** Explore various categories and products.
- **Add to Cart:** Select items and add them to your shopping cart.
- **Checkout:** Complete the purchase using the integrated payment gateway.

## Project Structure

The project is divided into two main parts: frontend and backend.

### Frontend (React)

```
frontend/
│
├── public/                 # Public assets
├── src/
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── redux/              # Redux store and actions
│   ├── styles/             # CSS and styling
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
│
└── package.json            # Frontend dependencies
```

### Backend (Node.js/Express)

```
backend/
│
├── config/                 # Configuration files
├── controllers/            # Controllers for handling requests
├── models/                 # Mongoose models
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── utils/                  # Utility functions
├── server.js               # Entry point for the server
└── package.json            # Backend dependencies
```
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact us at:

- **Email:** info@streetstep.com
- **GitHub:** [munyuaDeveloper](https://github.com/yourusername)
