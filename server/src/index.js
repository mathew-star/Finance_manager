  
  // src/index.js
  import express from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import authRoutes from './routes/auth.js';
  import { errorHandler } from './middleware/errorHandler.js';
  
  dotenv.config();
  
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  
  // Routes
  app.use('/api/auth', authRoutes);
  
  // Error handling
  app.use(errorHandler);
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  // src/middleware/errorHandler.js
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error'
    });
  };