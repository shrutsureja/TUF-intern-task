import express from 'express';
import dotenv from 'dotenv';
import setupRoutes from './routes';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
setupRoutes(app);
app.get('/', (req, res) => {
  res.send('backend is running... ');
})
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});