# BugTrack

BugTrack is a QA management web application that I built to practice software testing, bug tracking, and full-stack web development.

The application allows users to create and manage software bugs and test cases. It also includes a dashboard where users can quickly see information about reported bugs and testing activity.

## Features

### Bug Tracking

Users can create bugs and keep track of reported issues.

Each bug can include information such as:
- Bug title
- Description
- Severity
- Status

Users can also update the status of a bug as it moves through the testing process.

### Search

The application includes a search feature that makes it easier to find reported bugs.

### Test Cases

Users can create test cases and track their testing status.

Test cases can be marked as:
- Not Run
- Passed
- Failed

This makes it easier to keep track of which tests have already been completed.

### Dashboard

The dashboard gives a quick overview of the QA process and displays information about bugs and testing activity.

## Technologies Used

### Frontend

- React
- JavaScript
- CSS
- Vite

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

## How the Application Works

The frontend was built with React and provides the user interface for managing bugs and test cases.

The frontend sends requests to the Express backend when bug information needs to be created, retrieved, or updated.

The backend connects to MongoDB using Mongoose and stores the bug data in the database.

The basic flow of the application is:

User → React Frontend → Express Backend → MongoDB

## Project Structure

The project contains two main folders:

### frontend

Contains the React application and user interface.

### backend

Contains the Express server, API routes, and MongoDB connection.

## Running the Project

First, install the backend dependencies:

```bash
cd backend
npm install
