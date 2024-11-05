# CodeTribe Market

CodeTribe Market is a full-stack e-commerce platform specializing in handcrafted jewelry. The platform allows users to browse products, manage their shopping cart, and for sellers to list their unique creations.

## Features

- **User Authentication**
  - User registration and login
  - Protected routes for authenticated users
  - Token-based authentication

- **Product Management**
  - Browse products with search functionality
  - Add new products (for authenticated users)
  - Update and delete products (for product owners)
  - Responsive product grid layout

- **Shopping Cart**
  - Add products to cart
  - View cart items
  - Cart item counter in navigation
  - Protected cart access

- **Admin Dashboard**
  - View user and product statistics
  - Manage user roles (promote to admin or demote to user)
  - Manage product status (approve, reject, hide)

- **Responsive Design**
  - Mobile-first approach
  - Responsive navigation
  - Adaptive grid layouts

## Technologies Used

### Frontend
- React
- Redux (for state management)
- React Router (for navigation)
- Tailwind CSS (for styling)
- Lucide React (for icons)
- ShadCN UI Components

### Backend
- Node.js with Express
- MongoDB  (for data storage)
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js 
- npm  package manager
- MongoDB instance running locally or in the cloud

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ComfortN/CodeTribe-Marketplace.git
cd CodeTribe-Marketplace
```

2. Navigate to frontend"
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory and add:
```
PORT=3005
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:
```bash
npm run dev
```


## Deployed link

- https://code-tribe-marketplace-nu.vercel.app/

- https://code-tribe-marketplace-backend.vercel.app/
