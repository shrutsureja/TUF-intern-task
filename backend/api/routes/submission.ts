import { Router } from 'express';
import { addUser, checkUserExist } from '../Functions/submissionFunction';
import { submitCodeMiddleware } from '../middleware/submitCodeMiddleware';
import db from '../db/index'
import jsonResponse from '../utils/JsonResponse';

const router = Router();

// return all the submissions from the table of code snippets
router.get('/getAllSubmissions', async (req, res)=> {
    const start = Date.now();
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.query('SELECT * FROM code_snippet_submissions');
        // convert the user_id to username
        for (let i = 0; i < result.length; i++) {
            const username = await connection.query('SELECT username FROM users WHERE user_id = ?', [result[i].user_id]);
            result[i].user_id = username[0].username;
        }
        res.json(jsonResponse(200, result, "Success"));
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, error, "Server Error", true))
    } finally {
        connection?.release();
        console.log(`Response time: ${Date.now() - start}ms`);
    }
});

router.post('/submitCodeSnippet', submitCodeMiddleware, async (req, res) => {
    const start = Date.now();
    const { username, source_code, stdin, preferred_language } = req.body;
    let connection;
    try {
        // check if the userexists or not if not then add the user
        const userExist = await checkUserExist(username);
        if(userExist.status === 400){
            const response = await addUser(username);
            if(response.status === 500){
                return res.status(500).json(response);
            }
        }
        else if(userExist.status === 500){
            return res.status(500).json(userExist);
        }      
        connection = await db.getConnection();
        console.log(source_code, stdin);
        
        const normal_code = Buffer.from(source_code, 'base64').toString('utf-8');
        // const normal_stdin = Buffer.from(stdin, 'base64').toString('utf-8');
        await connection.query(`INSERT INTO code_snippet_submissions (user_id, preferred_language, stdin, source_code) VALUES ((SELECT user_id FROM users WHERE username = ?) , ?, ?, ?);`, [username, preferred_language, stdin, normal_code]);
        res.json(jsonResponse(200, {}, "Success"));
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, error, "Server Error", true));
    } finally {
        connection?.release();
        console.log(`Response time: ${Date.now() - start}ms`);
    }
});

export default router;