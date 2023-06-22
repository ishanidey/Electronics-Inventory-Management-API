import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import  path from 'path';

import router from './router';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = 'mongodb+srv://ishudey:ishudey@cluster0.euxuqc2.mongodb.net/?retryWrites=true&w=majority'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let isAuthenticated = false; // Authentication status

// Middleware to check if user is authenticated
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Please login to access this resource' });
  }
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match the admin credentials
  if (username === 'admin' && password === 'ishudey') {
    isAuthenticated = true;
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  isAuthenticated = false;
  res.json({ message: 'Logout successful' });
});

// Apply authentication middleware to all routes
app.use(authenticate);

// Apply router middleware
app.use('/', router());
