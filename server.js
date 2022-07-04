import express from 'express';
import dotenv from 'dotenv';

// express app
const app = express();

// simple logger middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to my app : /' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT} my friend !`));
