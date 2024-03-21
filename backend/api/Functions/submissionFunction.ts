import jsonResponse from "../utils/JsonResponse";
import db from "../db/index";

export async function checkUserExist(username : string){
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (result.length === 0) {
            return jsonResponse(400, {}, "Username does not exist", true);
        }
        return jsonResponse(200, {}, "Success");
    } catch (error) {
        console.error(error);
        return jsonResponse(500, error, "Server Error", true)
    } finally {
        connection?.release();
    }
}

export async function addUser(username : string) {
    let connection;
    try {
        connection = await db.getConnection();
        await connection.query('INSERT INTO users (username) VALUES (?)', [username]);
        return jsonResponse(200, {}, "Success");
    } catch (error) {
        console.error(error);
        return jsonResponse(500, error, "Server Error", true)
    }
}