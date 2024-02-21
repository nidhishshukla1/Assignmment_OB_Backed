const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/routes.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
