import express from 'express';
const router = express.Router();

// Render the index view
router.get('/', (req, res) => {
    res.render('index');
  });
  
  // Render the products view
  router.get('/products', (req, res) => {
    res.render('products');
  });

  export default router;
