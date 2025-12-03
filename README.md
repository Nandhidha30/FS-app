# Cactus Haven - MERN Stack E-commerce Application

A complete full-stack e-commerce web application for selling cacti, succulents, and plant accessories.

## Technologies Used

- **Frontend**: ReactJS, HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **API Integration**: Twitter API for social media posting
- **HTTP Client**: Axios for AJAX/fetch calls

## Features

### User Features
- User registration and authentication
- Browse products by category (Cacti, Succulents, Accessories)
- Search and filter products
- Product detail pages with care instructions
- Shopping cart functionality
- Wishlist management
- Product reviews and ratings
- Responsive design for all devices

### Admin Features
- Admin dashboard
- Product management (CRUD operations)
- User management
- Review moderation
- Twitter integration for marketing posts
- Analytics and reporting

### Technical Features
- RESTful API design
- JWT-based authentication with session management
- Password hashing with bcrypt
- File upload handling
- Error handling and validation
- Responsive CSS design
- Component-based React architecture

## Project Structure

```
cactus-haven/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication & validation
│   ├── uploads/            # File uploads
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state
│   │   ├── utils/          # API utilities
│   │   └── styles/         # CSS files
│   └── public/             # Static assets
└── README.md
```

## Database Models

### User Model
- Personal information (name, email, password)
- Role-based access (user/admin)
- Address and contact details
- Authentication timestamps

### Product Model
- Product details (name, description, price)
- Category classification
- Stock management
- Care instructions and specifications
- Image handling
- Rating system

### Cart Model
- User-specific shopping cart
- Product quantities and pricing
- Total amount calculation

### Wishlist Model
- User's saved products
- Easy add/remove functionality

### Review Model
- Product reviews and ratings
- User feedback system
- Helpful votes tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:productId` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove from cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add/:productId` - Add to wishlist
- `DELETE /api/wishlist/remove/:productId` - Remove from wishlist

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Twitter Integration
- `POST /api/twitter/tweet` - Send tweet (Admin)
- `GET /api/twitter/recent` - Get recent tweets

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Twitter Developer Account (for API keys)

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with required variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cactus-haven
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
   ```

4. Seed sample data:
   ```bash
   node seedData.js
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Test Accounts
- Admin: admin@cactushaven.com / admin123
- User: user@example.com / password123

## Future Enhancements

- Payment gateway integration
- Email notifications
- Advanced search with filters
- Product recommendations
- Mobile app development
- Real-time chat support
- Inventory management system
- Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.
