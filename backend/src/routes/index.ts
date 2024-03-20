import { Application } from 'express';
import userRoutes from './user';
import submissionRoutes from './submission';

export default function setupRoutes(app : Application){
    // app.use('/user', userRoutes);
    app.use('/api/submission', submissionRoutes);
}