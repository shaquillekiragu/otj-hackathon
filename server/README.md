# Backend API - OTJ Hackathon

A RESTful API backend for managing journal entries and user data, built with Express.js and MongoDB. This API supports creating, reading, updating, and deleting journal entries with timesheet tracking and user management.

## Features

- **Journal Entry Management**: Create, read, update, and delete journal entries
- **User Management**: Retrieve user information and OTJ (On-The-Job) hours tracking
- **Timesheet Tracking**: Track time spent on activities with start/end times and duration
- **Pagination**: Built-in pagination support for listing journal entries
- **Input Validation**: Comprehensive request validation middleware
- **Type Safety**: Full TypeScript support with strict type checking

## Tech Stack

- **Runtime**: Node.js (v18+ recommended)
- **Framework**: Express.js
- **Database**: MongoDB
- **Language**: TypeScript
- **Development Tools**: tsx, nodemon

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/your-database-name
PORT=8080
```

**Note**: Replace `your-database-name` with your actual MongoDB database name. For MongoDB Atlas or other cloud providers, use the full connection string.

## Running the Application

### Development Mode

Run the server in development mode with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:8080` (or the port specified in your `.env` file).

### Production Mode

1. Build the TypeScript code:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

## API Endpoints

### Journal Entries

#### Create Journal Entry
- **POST** `/api/journal`
- **Body**: Journal entry object with `userId`, `title`, `description`, `category`, `timeSheets`, and `tagIds`
- **Response**: Created journal entry

#### List Journal Entries by User
- **GET** `/api/journal?userId=<userId>&page=<page>&limit=<limit>`
- **Query Parameters**:
  - `userId` (required): User ID
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of items per page
- **Response**: Paginated list of journal entries

#### Get Journal Entry
- **GET** `/api/journal/:id`
- **Response**: Journal entry details

#### Update Journal Entry
- **PUT** `/api/journal/:id`
- **Body**: Updated journal entry object
- **Response**: Updated journal entry

#### Delete Journal Entry
- **DELETE** `/api/journal/:id`
- **Response**: Deletion confirmation

### Users

#### Get User
- **GET** `/api/user/:id`
- **Response**: User details including OTJ hours tracking


This project is part of the OTJ Hackathon.
