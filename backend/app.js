const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const connectDB = require("./config/db");
// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/', userRoutes);
// Error handler (must be last)
app.use(errorHandler);

connectDB();
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});