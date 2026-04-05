# Expense Tracker

A full-stack web application for tracking personal income and expenses with beautiful charts and analytics.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Income Management**: Add, view, edit, and delete income sources
- **Expense Tracking**: Categorize and track expenses with detailed analytics
- **Dashboard Analytics**: Visual charts showing spending patterns and financial overview
- **Data Export**: Download income and expense data as Excel files
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live dashboard updates when data changes

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Beautiful charts and data visualization
- **React Hot Toast** - User-friendly notifications
- **Tailwind CSS** - Utility-first CSS framework
- **Emoji Picker** - Rich emoji selection for categories

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **xlsx** - Excel file generation

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── expenseController.js
│   │   └── incomeController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Expense.js
│   │   ├── Income.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── incomeRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── uploads/
│   ├── package.json
│   └── server.js
└── frontend/
    └── expense-tracker/
        ├── public/
        ├── src/
        │   ├── components/
        │   │   ├── Cards/
        │   │   ├── Charts/
        │   │   ├── Dashboard/
        │   │   ├── Expense/
        │   │   ├── Income/
        │   │   └── layouts/
        │   ├── context/
        │   ├── hooks/
        │   ├── pages/
        │   │   ├── Auth/
        │   │   └── Dashboard/
        │   ├── utils/
        │   └── App.jsx
        ├── package.json
        └── vite.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend/expense-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get user profile

### Dashboard
- `GET /api/v1/dashboard` - Get dashboard data

### Income Management
- `POST /api/v1/income/add` - Add new income
- `GET /api/v1/income/get` - Get all incomes
- `DELETE /api/v1/income/delete/:id` - Delete income
- `GET /api/v1/income/downloadexcel` - Download income data as Excel

### Expense Management
- `POST /api/v1/expense/add` - Add new expense
- `GET /api/v1/expense/get` - Get all expenses
- `DELETE /api/v1/expense/delete/:id` - Delete expense
- `GET /api/v1/expense/downloadexcel` - Download expense data as Excel

## 🎨 Features Overview

### Dashboard
- **Financial Overview**: Total balance, income, and expenses
- **Recent Transactions**: Latest income and expense entries
- **Charts & Analytics**:
  - Last 30 days expense breakdown by category
  - Last 60 days income trends
  - Financial overview with balance tracking

### Income Management
- Add income with source, amount, date, and icon
- View all income entries in a list
- Edit and delete income records
- Export income data to Excel

### Expense Tracking
- Categorize expenses (Food, Transport, Entertainment, etc.)
- Add expenses with category, amount, date, and icon
- View expense history
- Delete expense records
- Export expense data to Excel

### User Experience
- **Responsive Design**: Works on all device sizes
- **Dark/Light Theme**: Modern UI with consistent styling
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Smooth loading indicators
- **Error Handling**: Comprehensive error management

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

**Backend (.env):**
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret_key
```

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas for cloud)
2. Configure environment variables on your hosting platform
3. Deploy to services like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to services like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author
Name : Rohan Singh
Email : rohansinghiitian6395@gmail.com
Built with ❤️ using React, Node.js, and MongoDB

---

<<<<<<< HEAD
**Note:** This is a personal finance management tool. Always backup your data and use strong passwords for account security.
=======
**Note:** This is a personal finance management tool. Always backup your data and use strong passwords for account security.
>>>>>>> 7e852e0 (your message)
