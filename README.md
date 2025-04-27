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
