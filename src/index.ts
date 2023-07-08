import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import session, { SessionData } from 'express-session';
import mongoose from 'mongoose';

import homeRouter from './router/homeRoutes';
import findProductsRouter from './router/findProducts';
import {config} from './config';
import router from './router';

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

const MONGO_URL = config.mongoURI;// DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

// Set up middleware and view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

interface CustomSession extends SessionData {
  isAuthenticated: boolean;
}

declare module 'express-serve-static-core' {
  interface Request {
    session: CustomSession;
  }
}

app.use(session({
  secret: 'your-secret-key', // Set a secure secret key for session encryption
  resave: false,
  saveUninitialized: false,
}));

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session.isAuthenticated) {
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
    req.session.isAuthenticated = true; // Set the session variable to indicate authentication
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.isAuthenticated = false; // Set the session variable to indicate logout
  res.json({ message: 'Logout successful' });
});

// Apply router middleware
app.use(homeRouter);
app.use(findProductsRouter);
// Apply authentication middleware to all routes
app.use(authenticate);
app.use('/', router());
