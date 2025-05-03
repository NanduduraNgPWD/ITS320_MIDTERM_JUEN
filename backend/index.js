import express, { json} from 'express';
import connectDB from './config//db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as userRouter } from './routes/userRoutes.js';
// import { router as quotesRouter } from './routes/quotesRoutes.js';
import { router as todoRouter } from './routes/todoRoutes.js';
import authRouter from './routes/authRoutes.js';
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
app.use(cors());

app.use(json());

connectDB();
app.use('/auth', authRouter);
app.use('/todo', todoRouter)

app.use('/user', userRouter)
app.use(express.json()); // Very important for JSON POST requests

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
