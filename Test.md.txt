Website Test Report
This document outlines the test cases for the website's APIs, including customer signup, login, and various business logic endpoints. Each test case includes the request details, expected status code, and outcome.
Customer Signup API

Endpoint: /api/signup (assumed based on context)
Method: POST
Request Payload:{
  "name": "abchh",
  "email": "abggc@gmail.com",
  "password": "ewb$aLtNMq"
}


Expected Status Code: 201 Created
Outcome: Customer successfully created

Customer Login API

Endpoint: /api/login (assumed based on context)
Method: POST
Request Payload:{
  "email": "abggc@gmail.com",
  "password": "ewb$aLtNMq"
}


Expected Status Code: 201 Created
Outcome: Customer successfully logged in
Note: A 201 status code for login is unconventional; typically, 200 OK is used for successful logins.

Business Logic Tests
Expenses

Endpoint: http://localhost:5000/api/expenses
Method: GET (assumed based on context)
Expected Status Code: 200 OK
Outcome: Successfully retrieved expenses

Income Get

Endpoint: http://localhost:5000/api/income/get
Method: GET
Expected Status Code: 200 OK
Outcome: Successfully retrieved income data

User Profile

Endpoint: http://localhost:5000/api/user/profile
Method: GET
Expected Status Code: 200 OK
Outcome: Successfully retrieved user profile

Expense Edit

Endpoint: http://localhost:5000/api/expense/680df4d5816be8db263b1dac
Method: PUT (assumed for editing)
Expected Status Code: 200 OK
Outcome: Successfully edited expense

Income Edit

Endpoint: http://localhost:5000/api/income/680df4d5816be8db263b1dac
Method: PUT (assumed for editing)
Expected Status Code: 200 OK
Outcome: Successfully edited income

Budget Retrieval

Endpoint: http://localhost:5000/api/budgets/get
Method: GET
Expected Status Code: 200 OK
Outcome: Successfully retrieved budgets

Expense Get

Endpoint: http://localhost:5000/api/expenses
Method: GET
Expected Status Code: 200 OK
Outcome: Successfully retrieved expenses
Note: This test case is identical to the "Expenses" test above; consider consolidating or clarifying if they test different scenarios.

Income Get

Endpoint: http://localhost:5000/api/income/get
Method: GET
Expected Status Code: 200 OK
Outcome: Successfully retrieved income data
Note: This test case is identical to the "Income Get" test above; consider consolidating or clarifying if they test different scenarios.

Balance

Endpoint: http://localhost:5000/api/user/balance
Method: GET
Response Payload:{
  "income": 0,
  "expenses": 74942,
  "savings": -74942,
  "total": -74942,
  "budget": 2500,
  "currency": "INR"
}


Expected Status Code: 200 OK
Outcome: Successfully retrieved balance information

Budget Status

Endpoint: http://localhost:5000/api/monthly-budget?userId=680df581816be8db263b1ddf
Method: GET
Expected Status Code: 200 OK
Outcome: Successfully retrieved monthly budget status

API ChatBot

Endpoint: Not specified (assumed to be a chatbot-related API)
Method: GET (assumed)
Expected Status Code: 200 OK
Outcome: Successfully executed, but the output indicates undefined values for the user's name and current project.
Issue: This likely indicates a problem with how user information is retrieved or stored. Further investigation is needed to ensure proper data handling.

Observations

Most APIs return the expected 200 OK or 201 Created status codes, indicating successful execution.
The Customer Login API uses a 201 Created status code, which is unusual for login endpoints (typically 200 OK). Consider reviewing the API design.
Duplicate test cases for "Expenses" and "Income Get" were noted. Clarify if these test different scenarios or consolidate them.
The API ChatBot test highlights a potential issue with undefined user data, which requires debugging.

Recommendations

Investigate the undefined user name and project in the API ChatBot response.
Standardize status codes (e.g., use 200 OK for login instead of 201 Created).
Consolidate duplicate test cases or provide distinct descriptions for clarity.
Ensure all endpoints are secured and tested with invalid inputs for robustness.

