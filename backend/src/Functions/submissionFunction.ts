import jsonResponse from "../utils/JsonResponse";
import db from "../db/index";

// input is non and return all the all submissions from the database
export async function getAllSubmissions(){
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.query('SELECT * FROM code_snippet_submissions');
        return jsonResponse(200, result, "Success");
    } catch (error) {
        console.error(error);
        return jsonResponse(500, error, "Server Error", true)
    } finally {
        connection?.release();
    }
}



export async function submitCodeSnippet(data : any){
    const { username, source_code, stdin, preferred_language } = data;
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (result.length === 0) {
            return jsonResponse(400, {}, "Username does not exist", true);
        }
        await connection.query(`INSERT INTO code_snippet_submissions (
            user_id,
            preferred_language,
            stdin,
            source_code
          )
        VALUES (
            (SELECT user_id FROM users WHERE username = ?),
            ?,
            ?,
            ?
          );`, [username, source_code, stdin, preferred_language]);
        return jsonResponse(200, {}, "Success");
    } catch (error) {
        console.error(error);
        return jsonResponse(500, error, "Server Error", true)
    } finally {
        connection?.release();
    }
}


