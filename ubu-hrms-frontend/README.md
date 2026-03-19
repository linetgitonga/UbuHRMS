# Ubuntu HRMS - React Frontend

A modern Human Resource Management System built with React, TypeScript, Vite, and Tailwind CSS for Ubuntu Eco Lodge.

## Features

- **Employee Management**: Add, edit, and manage employee records
- **Attendance Tracking**: Biometric device integration for attendance
- **Payroll Management**: Process salaries with M-Pesa integration
- **Leave Management**: Request and approve employee leaves
- **KPI Tracking**: Set and monitor key performance indicators
- **Contract Management**: Store and manage employee contracts
- **Reports & Analytics**: Comprehensive reporting dashboard
- **Device Management**: Monitor biometric devices
- **Role-Based Access Control**: Secure authentication system
- **Dark Mode Support**: Theme toggle for better UX

## Technology Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 5.0.8
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.2.0 with OKLCH color system
- **Routing**: React Router v6
- **HTTP Client**: Axios with JWT interceptors
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+ or pnpm 8+
- Backend API running on `http://localhost:5000/api`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ubu-hrms-frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your API URL if different from default:
```env
VITE_API_URL=http://localhost:5000/api
```

### Development

Start the development server:
```bash
pnpm run dev
```

The application will open at `http://localhost:3000` with hot module replacement enabled.

### Build

Create an optimized production build:
```bash
pnpm run build
```

Preview the production build locally:
```bash
pnpm run preview
```

## Project Structure

```
ubu-hrms-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components
│   ├── lib/
│   │   ├── api.ts          # Axios configuration
│   │   ├── auth-context.tsx # Authentication context
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
└── tsconfig.json           # TypeScript config
```

## Available Pages

- `/login` - User authentication
- `/register` - New user registration
- `/dashboard` - Main dashboard with KPIs
- `/employees` - Employee management
- `/attendance` - Attendance tracking
- `/payroll` - Payroll processing
- `/devices` - Biometric device management
- `/leaves` - Leave requests and approvals
- `/kpis` - Key performance indicators
- `/contracts` - Employee contracts
- `/reports` - Reports and analytics
- `/settings` - User settings and logout

## Authentication

The application uses JWT-based authentication. Login credentials are stored in localStorage and sent via the `x-auth-token` header with each API request. The auth context automatically handles token refresh and logout on 401 responses.

## API Integration

The application connects to a backend API with the following auth endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- Other endpoints for employee, attendance, payroll, etc.

## Styling

The application uses Tailwind CSS v4 with OKLCH color tokens for better color management. The design system includes:

- **Primary Color**: Teal (180° hue)
- **Secondary Color**: Cyan (190° hue)
- **Accent Color**: Turquoise (170° hue)
- **Destructive Color**: Red (25° hue)
- **Neutral Tones**: Grayscale for background, foreground, borders

## Environment Variables

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is proprietary software for Ubuntu Eco Lodge.

## Support

For support, contact the development team or open an issue in the repository.
