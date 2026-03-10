# UBU HRMS Backend

## Overview
This is the backend server for UBU HRMS, built with Node.js, Express.js, and MongoDB. It handles API endpoints for authentication, employee management, attendance (including biometric integration), payroll (with M-Pesa), KPIs, leaves, and contracts.

## Technologies
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- Axios for API requests (M-Pesa)
- Crypto/FS for M-Pesa security

## Setup Instructions
1. Navigate to backend: `cd backend`.
2. Install dependencies: `npm install`.
3. Create `.env` file (copy from .env.example):
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<strong-secret>
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=<key>
MPESA_CONSUMER_SECRET=<secret>
MPESA_SHORTCODE=<shortcode>
MPESA_INITIATOR_PASSWORD=<password>
MPESA_CERT_PATH=cert/sandbox.cer
MPESA_CALLBACK_URL=<public-url>/api/payroll/payments/callback
MPESA_QUEUE_TIMEOUT_URL=<public-url>/api/payroll/payments/timeout
text4. Place M-Pesa certs in `cert/` folder.
5. Start the server: `npm start` (or `nodemon server.js` for development).
6. Test endpoints with Postman (see API documentation below).

## API Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Employees**: `/api/employees` (GET/POST), `/api/employees/:id` (PUT/DELETE)
- **Attendance**: `/api/attendance/biometrics/push` (POST, public), `/api/attendance/:employeeId` (GET), `/api/attendance/:id` (PUT)
- **Payroll**: `/api/payroll/calculate/:period` (GET), `/api/payroll/disburse` (POST), `/api/payroll/payments` (GET), `/api/payroll/payments/callback` (POST, public), `/api/payroll/payments/timeout` (POST, public)
- **KPIs**: `/api/kpis/:employeeId` (GET), `/api/kpis` (POST), `/api/kpis/:id` (PUT/DELETE)
- **Leaves**: `/api/leaves/:employeeId` (GET), `/api/leaves` (POST), `/api/leaves/:id` (PUT/DELETE)
- **Contracts**: `/api/contracts/:employeeId` (GET), `/api/contracts` (POST), `/api/contracts/:id` (PUT/DELETE)

For detailed input/output, refer to the provided endpoint table.

## Biometric Integration
- Endpoint: `/api/attendance/biometrics/push`
- Configure ZKTeco device to push to this URL.
- Payload: { biometricDeviceId, timestamp, punchState, shift (optional) }

## M-Pesa Integration
- Use sandbox for testing.
- Callback must be public (use ngrok locally).
- Test phone: 254708374149.

## Testing
- Use Postman collections.
- Unit tests: Add with Jest (not included yet).

## Deployment
- Host on Heroku/AWS.
- Set environment variables.
- Ensure port is open for webhooks.

## License
MIT.