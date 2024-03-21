import { Application } from 'express';
import submissionRoutes from './submission';

export default function setupRoutes(app : Application){
    app.use('/api', submissionRoutes);
}