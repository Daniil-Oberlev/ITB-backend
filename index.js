import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './validation.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { register, login, getMe } from './controllers/UserController.js';

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.get('/auth/me', checkAuth, getMe);

const PORT = process.env.PORT || 4444;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server OK on port ${PORT}`);
});
