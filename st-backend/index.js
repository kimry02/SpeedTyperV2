import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const port = process.env.port || 5000;


mongoose.connect(process.env.ATLAS_URI, {})
    .then(app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    }));


app.use('/users', userRoutes);
app.use('*', (req, res) => res.status(404).json({ error: "not found..." }));

export default app;