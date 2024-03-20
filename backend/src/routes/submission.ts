import { Router } from 'express';
import { getAllSubmissions, submitCodeSnippet } from '../Functions/submissionFunction';
import { submitCodeMiddleware } from '../middleware/submitCodeMiddleware';

const router = Router();

// return all the submissions from the table of code snippets
router.get('/', async (req, res)=> {
    const data = await getAllSubmissions();
    res.json(data);
});

router.post('/submit', submitCodeMiddleware, async (req, res) => {
    const { username, source_code, stdin, preferred_language } = req.body;
    // call the function to submit the code snippet
    const result = await submitCodeSnippet({ username, source_code, stdin, preferred_language });
    res.json(result);
});

export default router;