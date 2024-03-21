import { Router } from 'express';
import { getAllSubmissions, submitCodeSnippet } from '../Functions/submissionFunction';
import { submitCodeMiddleware } from '../middleware/submitCodeMiddleware';

const router = Router();

// return all the submissions from the table of code snippets
router.get('/submissions', async (req, res)=> {
    const data = await getAllSubmissions();
    if(data.error) return res.status(data.status).json(data);
    res.json(data);
});

router.post('/submit', submitCodeMiddleware, async (req, res) => {
    const result = await submitCodeSnippet(req.body);
    if(result.error) return res.status(result.status).json(result);
    res.json(result);
});

export default router;