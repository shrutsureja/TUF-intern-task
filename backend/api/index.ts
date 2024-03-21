import express from 'express';
import dotenv from 'dotenv';
import setupRoutes from './routes';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
setupRoutes(app);
app.get('/', (req, res) => {
  res.send('backend is running... ');
})

// setInterval(() => {
  // connect the mongodb and backup the data of the source_code Files
  // takeBackup(); function will be called here
// }, Number(process.env.BACKUP_TIME) || 10000);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});