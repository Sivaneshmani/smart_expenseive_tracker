const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const UserData = require('./models/Income');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    ssl: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1); // Stop server if DB connection fails
  });

// Route Imports
const authRoutes = require('./routes/authroute');
const expenseRoutes = require('./routes/Expense');
const incomeRoutes = require('./routes/income');
const budgetRoutes = require('./routes/budget');
const userRoutes = require('./routes/user');

// Route Mounts
app.use('/api', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/user', userRoutes);

// Default Test Route
app.get('/', (req, res) => {
  res.send('🌐 Backend is running!');
});

// Wit.ai Integration
const WIT_AI_TOKEN = process.env.WIT_AI_TOKEN; // Make sure you have this token in your environment variables
const WIT_AI_API_VERSION = '20220305'; // Consider updating to the latest version


const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require("body-parser");



app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.WIT_AI_TOKEN);
app.post("/generate", async (req, res) => {
  try {
      const { query } = req.body; // ✅ Getting prompt from client
      
      // Get user data from the database
      const userData = await UserData.findOne(); // You can modify the query to fetch based on user ID or other params

      // If no user data is found, send an error response
      if (!userData) {
          return res.status(404).send("User data not found.");
      }

      // Add user data to the query or context
      const userContext = `
          User's Name: ${userData.name}
          User's Current Project: ${userData.currentProject}
      `;

      // Combine user data with the original query
      const fullQuery = `${userContext} ${query}`;

      // Initialize the Gemini model (assuming it's initialized like this)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate the content from Gemini AI
      const result = await model.generateContent(fullQuery); // Pass the combined query
      const response = await result.response;
      const text = response.text();

      console.log(text); // AI generated content with user context

      // Send the generated content back to the client
      res.status(200).send(text);
  } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("An error occurred while generating the response. " + error.message);
  }
});


// Start the server
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});



//  *************************************************************************************************************
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();



// // Assuming your ExpenseModel is correctly set up and imported
// const ExpenseModel = require("./models/expenses");

// const genAI = new GoogleGenerativeAI(process.env.WIT_AI_TOKEN);

// // Assuming your ExpenseModel is correctly set up and imported



// app.post("/generate", async (req, res) => {
//     try {
//         const { expenses, income } = req.body;

//         // Check if expenses and income are provided and are valid
//         if (!expenses || !Array.isArray(expenses)) {
//             return res.status(400).send({
//                 error: "Invalid input. Please provide a valid 'expenses' array."
//             });
//         }

//         if (typeof income !== 'number') {
//             return res.status(400).send({
//                 error: "Invalid input. Please provide a valid 'income' number."
//             });
//         }

//         // Process the expenses data and calculate totalSpent
//         let totalSpent = 0;
//         expenses.forEach(expense => {
//             if (expense && expense.amount && typeof expense.amount === 'number') {
//                 totalSpent += expense.amount;
//             } else {
//                 console.warn("Skipping invalid expense entry:", expense);
//             }
//         });

//         // Example of a simple format for the result
//         const analysis = {
//             totalSpent,
//             overspending: totalSpent > income,
//             suggestions: []
//         };

//         if (totalSpent > income) {
//             analysis.suggestions.push("Consider reducing expenses in the high spending categories.");
//         }

//         // Response
//         const responseText = `
//             ### Expense Analysis Summary:
            
//             1. **Total Spent:** ₹${totalSpent} 
            
//             2. **Potential Overspending:** ${analysis.overspending ? "Yes" : "No"}
            
//             3. **Suggestions:**
//             ${analysis.suggestions.length > 0 ? analysis.suggestions.join("\n") : "No immediate suggestions."}
            
//             ### Sample Budget Plan (Adjust based on actual data):
            
//             | **Category**    | **Estimated Amount (₹)** | **Notes**                                 |
//             |-----------------|--------------------------|-------------------------------------------|
//             | Food            | 5,000                    | Adjust based on your needs               |
//             | Housing         | 10,000                   | Rent/Mortgage Payment                    |
//             | Transportation  | 1,500                    | Fuel, Commute, etc.                      |
//             | Utilities       | 2,000                    | Electricity, Water, Gas                  |
//             | Entertainment   | 1,000                    | Movies, Dining out, etc.                 |
//             | Miscellaneous   | 1,500                    | Unexpected expenses, etc.                |
//             | **TOTAL**       | **21,000**               | Placeholder; adjust to your budget       |
            
//             **Next Steps:**
//             - Provide income, typical expenses, and savings goals for a better plan.
//         `;

//         res.status(200).send({ response: responseText });

//     } catch (error) {
//         console.error("Error generating content:", error);
//         res.status(500).send("An error occurred while generating the response.");
//     }
// });

// Start the server on port 5000

// // Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));