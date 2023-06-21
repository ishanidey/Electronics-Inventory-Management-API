import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = 'mongodb+srv://ishudey:ishudey@cluster0.euxuqc2.mongodb.net/?retryWrites=true&w=majority'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/products', (req, res) => {
  res.render('products');
});

// Register the router with the app
app.use('/', router);

// Add the following middleware to handle undefined routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});
