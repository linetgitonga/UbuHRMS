# UBU HRMS Frontend

## Overview
This is the frontend application for UBU HRMS, built with React.js and Tailwind CSS. It provides user interfaces for dashboards, employee management, attendance review, payroll processing, and additional features like KPIs, leaves, and contracts. It communicates with the backend via RESTful APIs.

## Technologies
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- Optional: Redux for state management (if implemented)

## Setup Instructions
1. Navigate to frontend: `cd frontend`.
2. Install dependencies: `npm install`.
3. Create `.env` file:
REACT_APP_API_URL=http://localhost:5000/api
text4. Start the app: `npm start`.
5. Access at `http://localhost:3000`.

## Project Structure
frontend/
├── src/
│   ├── components/   # Reusable UI components (e.g., Dashboard, EmployeeForm)
│   ├── pages/        # Main pages (e.g., EmployeeManagement, AttendanceReview, PayrollDashboard)
│   ├── services/     # API services (e.g., authService.js, employeeService.js)
│   ├── App.js        # Main app entry
│   ├── index.js      # React DOM render
│   └── ...
├── public/
├── .env
├── package.json
└── README.md
text## Key Features
- **Dashboards**: Employee, Attendance, Payroll, Device Management, Reporting.
- **Forms**: Employee registration, attendance adjustments, leave applications, etc.
- **Integration**: Calls backend APIs for data.
- **Responsive**: Mobile-friendly with Tailwind.

## Development
- Add pages/components as needed (e.g., KPI screen: list KPIs, add/update forms).
- Handle JWT auth: Store token in localStorage, add to headers via Axios interceptors.
- Error handling: Use toasts (e.g., react-toastify).

## Deployment
- Build: `npm run build`.
- Host on Vercel/Netlify.
- Set environment variables for production API URL.

## Testing
- Use React Testing Library/Jest.
- End-to-end: Cypress (not included yet).

## License
MIT.