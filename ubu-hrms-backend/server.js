const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/payroll', require('./routes/payroll.routes'));
app.use('/api/kpis', require('./routes/kpi.routes'));  // New
app.use('/api/leaves', require('./routes/leave.routes'));  // New
app.use('/api/contracts', require('./routes/contract.routes'));  // New

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));