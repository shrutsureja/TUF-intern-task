import { Router } from 'express';
import jsonResponse from '../utils/JsonResponse';
import db from '../db/index'
import { registerUserMiddleware } from '../middleware/registerUser';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const router = Router();

router.post('/registerUser', registerUserMiddleware, async (req, res) => {
    const { username } = req.body;
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (result[0].length > 0) {
            return res.json(jsonResponse(400, {}, "Username already exists", true));
        }
        await connection.query('INSERT INTO users (username) VALUES (?)', [username]);
        res.json(jsonResponse(200, {}, "Success", false));
    } catch (error) {
        console.error(error);
        res.json(jsonResponse(500, error, "Server Error", true))
    }
    finally {
        connection?.release();
    }
});

router.post('/login', async (req, res) => {
    const { username } = req.body;
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (result[0].length === 0) {
            return res.json(jsonResponse(400, {}, "Username does not exist", true));
        }
        const payload = {
            username
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '3min' });
        res.json(jsonResponse(200, {token}, "Success", false));
    } catch (error) {
        console.error(error);
        res.json(jsonResponse(500, error, "Server Error", true))
    }
    finally {
        connection?.release();
    }
});

export default router;