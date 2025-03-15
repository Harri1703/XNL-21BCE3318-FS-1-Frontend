# XNL-21BCE3318-FS-1-Frontend

Fintech Platform - Frontend

This is the frontend of the Fintech Platform built using React.js and React Bootstrap. The backend is hosted on Railway, and the frontend is deployed on Vercel.

Features

User authentication including login and signup
Role-based access control for admin and user
Create and manage bank accounts
View account balance, deposit, withdraw, and transfer funds
Admin dashboard to view all users

Technologies Used

React.js for frontend development
React Bootstrap for UI styling
React Router for navigation
JWT authentication for secure API calls
RESTful API to connect with the backend
Railway for backend hosting
Vercel for frontend deployment

Getting Started

Step 1: Clone the Repository
git clone https://github.com/Harri1703/XNL-21BCE3318-FS-1-Frontend
cd fintech-frontend

Step 2: Install Dependencies
npm install

Step 3: Run the Development Server
npm start
Now, open http://localhost:3000 in your browser.

Deployment on Vercel

Step 1: Install Vercel CLI if not installed
npm install -g vercel

Step 2: Login to Vercel
vercel login

Step 3: Deploy to Vercel
Run the following command inside your project folder:
vercel
Follow the prompts to complete the deployment.

Project Structure

The project structure includes:
A public folder for static assets
A src folder containing components, pages, and main application files
A .env file for environment variables
A package.json file for managing dependencies

API Endpoints Used

POST /auth/login for user login
POST /auth/register for user signup
GET /users/me to get logged-in user info
GET /users/all to get all users, admin only
POST /accounts/create to create a new account
GET /accounts/fetch to get all user accounts
POST /accounts/getbalance to get account balance
POST /accounts/deposit to deposit money into an account
POST /accounts/withdraw to withdraw money from an account
POST /accounts/transfer to transfer money between accounts

Contributing

If you have suggestions or find issues, feel free to submit a pull request.

Developed by 21BCE3318 Sriharri K for XNL-FS-1.
