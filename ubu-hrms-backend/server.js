const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');  // New import

dotenv.config();
connectDB();

const app = express();

// Enable CORS for frontend origin (adjust for production)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'x-auth-token'],  // Allowed headers
  credentials: true  // If using cookies/auth (optional)
}));

app.use(express.json());

// Routes (unchanged)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/payroll', require('./routes/payroll.routes'));
app.use('/api/kpis', require('./routes/kpi.routes'));
app.use('/api/leaves', require('./routes/leave.routes'));
app.use('/api/contracts', require('./routes/contract.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));