# TODO: Set up Routing and Authentication

## Step 1: Create Login.tsx component with role selector
- [x] Create frontend/src/pages/Login.tsx
- [x] Add role selector (User/Admin)
- [x] For User: Redirect to Auth.tsx
- [x] For Admin: Show email/password form

## Step 2: Modify App.tsx for routing
- Import React Router components (Routes, Route)
- Set up routes: / (landing), /login, /admin, /stores, /dashboard, etc.
- Integrate age verification with routing

## Step 3: Connect Auth.tsx to backend OTP API
- [x] Replace simulated OTP with real API calls
- [x] Use /api/send-email-otp and /api/verify-email-otp
- [x] Handle success/failure properly

## Step 4: Add admin login endpoint to backend
- Add POST /api/admin-login to server.js
- Simple email/password check (hardcoded for now)

## Step 5: Update navigation and redirects
- Add navigation components if needed
- Handle redirects based on user role
- Protect admin routes

## Step 6: Test the complete flow
- [x] Test user login with OTP
- [x] Test admin login
- [x] Test routing and age verification integration
