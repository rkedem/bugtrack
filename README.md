# BugTrack – QA Management System

BugTrack is a full-stack web application for tracking and managing software bugs. It provides a simple dashboard for reporting issues, monitoring bug status, and organizing the software testing process.

## Live Demo

[View BugTrack](https://bugtrack-rho.vercel.app)

## Features

- Create and manage bug reports
- Search reported bugs
- Update bug status
- Delete bugs
- View bug status counts on the dashboard
- Monitor recently reported issues

Bug statuses include:

- Open
- In Progress
- Ready for Testing
- Resolved

## Technologies Used

**Frontend**
- React
- JavaScript
- HTML
- CSS
- Vite

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Deployment**
- Vercel

## Project Structure

```text
bugtrack/
├── frontend/     # React frontend
├── backend/      # Node.js / Express backend
└── .gitignore
```

## How It Works

The React frontend provides the user interface for managing bugs. The frontend communicates with the Node.js and Express backend, which handles requests and interacts with MongoDB to store and retrieve bug information.

```text
React Frontend
      ↓
Node.js / Express
      ↓
MongoDB
```

## CRUD Operations

- **Create** – Add a new bug
- **Read** – View reported bugs
- **Update** – Update bug information or status
- **Delete** – Remove a bug

## Future Improvements

- User authentication
- Bug priority levels
- Assign bugs to team members
- Screenshot/file attachments
- More detailed reports and analytics
