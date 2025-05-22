
## Backend (Node.js/Express)
Located in the `/backend` folder, this contains the Express server with MongoDB connection:
- Express.js
- MongoDB
- CORS middleware


```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
PORT=5000
```

Start the backend server:
```bash

```
The backend runs on http://localhost:5000


## Project Structure
- `/src` - Frontend React application
- `/backend` - Backend Express API
- `/public` - Static assets

Make sure both frontend and backend are running simultaneously for the full application to work.
