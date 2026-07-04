# 🎓 Campus Event Management Platform

A modern, full-featured event management system designed for educational institutions.  
This platform helps administrators organize events efficiently while giving students a smooth and engaging experience.

---

## Problem Statement

Educational institutions often struggle to organize campus events using fragmented tools such as spreadsheets, messaging platforms, and manual registration processes.

These disconnected workflows make event management difficult for administrators while providing students with a poor registration and participation experience.

Administrators need a centralized platform to create, organize, monitor, and analyze events, while students need an intuitive system for discovering and joining campus activities.

---

## Solution

Campus Event Management Platform provides a centralized event management system that streamlines the complete event lifecycle.

Administrators can create, manage, monitor, and analyze campus events from a single dashboard, while students can browse events, register instantly, manage their participation, and stay informed through a modern responsive interface.

The application minimizes administrative overhead, improves student engagement, and provides a scalable foundation for future institutional features.

---

## Features

### Admin Portal
- **Event & Registration Management:** Create, update, and delete campus events, and oversee student registrations.
- **Analytics & Leaderboards:** Access real-time analytics dashboards, popularity reports, and student participation leaderboards.

### Student Portal
- **Discovery & Registration:** Browse and filter events instantly with one-click registration or cancellation.
- **Personalized Experience:** Manage registered events via a personal dashboard with fully responsive light/dark mode support.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS |
| State Management | TanStack React Query |
| Forms | React Hook Form, Yup |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## Project Goals

- Simplify event creation and management.
- Improve student participation.
- Reduce manual administrative work.
- Provide responsive access across devices.
- Build a scalable frontend architecture suitable for production applications.

---

## System Architecture

```text
                   React + Vite
                        │
                  React Router
                        │
          TanStack React Query
                        │
         Reusable UI Components
                        │
             Local Data Layer
                        │
          (Future REST Backend)
```

---

## Why This Architecture

The project follows a modular component-based architecture where presentation, state management, routing, and reusable UI components remain separated.

This improves maintainability, promotes code reuse, and allows a future backend to be integrated with minimal frontend changes.

The project is intentionally structured in a scalable manner so new modules such as authentication, notifications, and analytics can be introduced without restructuring the application.

---

## Engineering Decisions

- React was selected for reusable component architecture.
- Vite provides significantly faster development and build performance.
- TanStack React Query manages asynchronous state efficiently.
- React Hook Form improves form performance while reducing unnecessary re-renders.
- Yup handles schema-based validation.
- Tailwind CSS enables rapid UI development while maintaining consistency.
- Error Boundaries improve application resilience.
- Skeleton loaders improve perceived performance.

---

## Trade-offs

### Current Implementation
- Local mock data keeps development simple.
- Frontend-first architecture enables rapid iteration.
- React Query is introduced early to make backend integration straightforward.

### Future Improvements
- Replace local data with REST APIs.
- Introduce JWT authentication.
- Add persistent database support.
- Add real-time notifications.

---

## Performance Considerations

The application has been designed with frontend performance in mind.

Key optimizations include:
- Fast Vite production builds.
- Component reusability to reduce unnecessary rendering.
- Skeleton loading screens to improve perceived loading speed.
- React Query caching for future API optimization.
- Responsive layouts optimized for desktop, tablet, and mobile devices.

---

## Scalability

The project structure allows additional modules to be integrated without major architectural changes.

Examples include:
- Authentication
- Email notifications
- QR attendance
- Event approvals
- Analytics dashboard
- Backend APIs
- Multi-campus support

---

## Security Considerations

Although this version is frontend-focused, the architecture has been designed to support production security practices including:
- Protected routes
- JWT authentication
- Role-based authorization
- Server-side validation
- HTTPS deployment
- Secure environment variable management

---

## Challenges Faced

- Designing reusable UI components.
- Creating responsive layouts that work across screen sizes.
- Managing complex form validation.
- Building scalable folder architecture.
- Maintaining consistent UI across administrator and student portals.

---

## Key Learnings

This project strengthened practical experience with:
- React architecture
- Component reusability
- State management
- Form validation
- React Query
- Responsive design
- Error handling
- Modern frontend project organization

---

## Future Improvements

- Backend API integration
- JWT authentication
- Email notifications
- Push notifications
- QR-based attendance
- Event certificates
- Calendar integration
- AI-powered event recommendations
- Docker support
- CI/CD pipeline
- Automated testing

---

## Recruiter Highlights

- ✔ Production-quality React architecture
- ✔ Modular reusable component design
- ✔ React Query state management
- ✔ React Hook Form validation
- ✔ Tailwind CSS responsive UI
- ✔ Modern folder organization
- ✔ Error Boundary implementation
- ✔ Skeleton loading states
- ✔ Mobile-first design
- ✔ Scalable architecture for backend integration

---

## Project Metrics

| Metric | Value |
|---------|------|
| Architecture | Component-Based |
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| State Management | TanStack React Query |
| Forms | React Hook Form |
| Validation | Yup |
| Routing | React Router |
| Responsive Design | Yes |
| Dark Mode | Yes |
| Error Boundary | Yes |
| Skeleton Loading | Yes |
| Mobile Friendly | Yes |

---

## Folder Structure

```text
src/
├── assets/            # Global styles
├── components/        # Reusable UI components
│   ├── Layout/
│   └── UI/
├── data/              # Mock APIs / local storage
├── hooks/             # Custom hooks
├── pages/             # Main pages
├── utils/             # Helper functions
└── App.jsx            # Root app
```

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

## Author

**Vishal M Bharadwaj**  
🔗 [Portfolio](https://vishal-m-bharadwaj-portfolio.vercel.app/)

---

## License
MIT

