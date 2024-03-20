import express from 'express';
import dotenv from 'dotenv';
import setupRoutes from './routes';
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});