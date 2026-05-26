# StayHealthy

Capstone project for the IBM Front-End Development Professional Certificate on Coursera.

StayHealthy is a React-based healthcare appointment platform that lets users find doctors, book instant or scheduled consultations, read health blog posts, leave reviews, and manage their profile. It was built across the modules of the front-end capstone and uses an Express + MongoDB backend for authentication.

## Tech Stack

- **Frontend:** React 18, React Router v6, React Bootstrap, Bootstrap 5
- **Backend:** Express, Mongoose, MongoDB
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Build:** Create React App (react-scripts)

## Features

- Landing page + responsive navigation bar
- Sign Up and Login with client-side validation
- Find Doctor / Instant Consultation search by specialty
- Appointment booking with confirmation
- Notifications integrated with the navbar / global layout
- Reviews component with rating selector and review form
- Profile component with editable name, email, phone
- Self-checkup and Health Blog sections

## Repository Layout

```
public/                  # CRA static assets
src/
  App.js                 # Routes
  Components/
    Landing_Page/
    Login/  Sign_Up/
    Navbar/
    Home/
    FindDoctorSearch/
    InstantConsultation/
    BookingConsultation/
    AppointmentForm/
    DoctorCard/
    Notification/
    ReviewForm/  (Star.js, GiveReviews.js, ReviewForm.js)
    ProfileCard/
    ReportsLayout/
    Healthblog/
    SelfCheckup/
server/                  # Express + Mongoose API
  index.js  db.js
  routes/ models/ public/
screenshots/             # Capstone deliverable screenshots
```

## Running Locally

```bash
# Frontend
npm install
npm start          # http://localhost:3000

# Backend
cd server
npm install
node index.js      # http://localhost:8181
```

## Capstone Screenshots

The `screenshots/` directory contains the 15 capstone screenshots required by the Coursera peer-graded final project (Option 2): navbar, sign-up/login forms and validation, README, logout button, doc search, notification integration, instant consultation, review form, profile, build, SEO, and version control evidence.

## License

ISC - see `LICENSE`.
