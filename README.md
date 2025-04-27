# Smart Expense Tracker with Budget Optimization

The **Smart Expense Tracker** is a web application designed to help users track their expenses, manage their monthly budgets, and receive AI-driven insights. The AI helps by chatting with users to understand their financial status and money management, offering personalized recommendations for monthly budgets and detecting anomalies in spending behavior.

## Features

- **Expense Tracking**: Log and categorize your expenses.
- **Budget Management**: Set and manage monthly budgets.
- **AI Chat Assistant**: AI-driven chatbot to discuss your financial status and money.
- **Real-time Updates**: Budget and savings values update live as you input data.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (or any database of your choice)
- **AI/Chatbot**: OpenAI (or any other AI tool/library)
- **Authentication**: JWT (JSON Web Tokens)
- **Hosting**: Vercel / Heroku (or any other cloud platform)
- **CSS Framework**: Tailwind CSS (or any other)


## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/smart-expense-tracker.git
   ```
2. Navigate to the project directory:
      ```bash
   cd smart-expense-tracker
   ```

## Usage

  * Open the application in your browser at http://localhost:3000 (or whatever the frontend URL is).
  
  * Create an account and log in.
  
  * Add your expenses, set your monthly budget, and interact with the AI assistant.
  
  * Get real-time insights on your spending and budget optimization.





Test Case: Customer Signup API
Request Payload:
{
  "name": "abchh",
  "email": "abggc@gmail.com",
  "password": "ewb$aLtNMq"
}
Status Code: 201 Created
Customer successfully created

Test Case: Customer Logi API
Request Payload:
{
"email":"abggc@gmail.com",
"password":"ewb$aLtNMq"
}
Status Code: 201 Created
Customer successfully login

business logic tests:
Test Case:Expenses
http://localhost:5000/api/expenses
Status Code: 200 ok

Test Case:Income get
http://localhost:5000/api/income/get
Status Code:200 ok

Test Case:User Profile
http://localhost:5000/api/user/profile
Status Code:200 Ok

Test Case:Expense Edit
http://localhost:5000/api/expense/680df4d5816be8db263b1dac
Status Code:200 Ok

Test Case:Income Edit
http://localhost:5000/api/income/680df4d5816be8db263b1dac
Status Code:200 Ok

Test Case:budgetRes
http://localhost:5000/api/budgets/get
Status Code:200 Ok

Test Case:Expense Get
http://localhost:5000/api/expenses
Status Code:200 Ok

Test Case:Income Get
http://localhost:5000/api/income/get
Status Code:200 Ok

Test Case:Balance
http://localhost:5000/api/user/balance
{
    "income": 0,
    "expenses": 74942,
    "savings": -74942,
    "total": -74942,
    "budget": 2500,
    "currency": "INR"
}
Status Code:200 Ok

Test Case: Budget Status
http://localhost:5000/api/monthly-budget?userId=${680df581816be8db263b1ddf}
Status Code:200 Ok
