# Task Management Application

## Short Description

This is a task management application built using React.js with Vite, providing a seamless drag-and-drop functionality for task organization. The application supports authentication via Firebase Authentication, real-time task updates using MongoDB Change Streams, and a clean, responsive UI with dark mode support. Users can add, edit, delete, reorder, and categorize tasks as "To-Do," "In Progress," or "Done."

## Live Links

- Live Application:https://tma-task.web.app

## Dependencies

### Frontend

- React.js
- Vite
- react-beautiful-dnd
- Firebase Authentication
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- WebSockets/MongoDB Change Streams
- CORS
- 
## Installation Steps

### Backend Setup

1. Clone the repository: https://github.com/sultangithub04/tam-task/tree/main

   git clone https://github.com/sultangithub04/tam-task/tree/main
   cd tma-client & cd tma-server
2. Install dependencies: 
   npm install

3. Set up environment variables in a .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5000

4.  nodemon index.js & npm run dev  :     backend and fontend respectively

