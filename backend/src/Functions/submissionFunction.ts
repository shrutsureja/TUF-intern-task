import jsonResponse from "../utils/JsonResponse";
import db from "../db/index";

// input is non and return all the all submissions from the database
export async function getAllSubmissions(){
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.query('SELECT * FROM code_snippet_submissions');
        // convert the user_id to username
        for (let i = 0; i < result.length; i++) {
            const username = await connection.query('SELECT username FROM users WHERE user_id = ?', [result[i].user_id]);
            result[i].user_id = username[0].username;
        }
        return jsonResponse(200, result, "Success");
    } catch (error) {
        console.error(error);
        return jsonResponse(500, error, "Server Error", true)
    } finally {
        connection?.release();
    }
}


// this FUNCTION WILL GET CHANGED
export async function submitCodeSnippet(data : any){
    console.log("submitCodeSnippet");
    const { username, source_code, stdin, preferred_language } = data;
    let connection;
    try {
        // check if the userexists or not if not then add the user
        const userExist = await checkUserExist(username);
        if(userExist.status === 400){
            const response = await addUser(username);
            if(response.status === 500){
                return response;
            }
        }
        else if(userExist.status === 500){
            return userExist;
        }      

        connection = await db.getConnection();
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
          );`, [username, preferred_language, stdin,source_code]);
        return jsonResponse(200, {}, "Success");
    } catch (error) {
        console.error(error);
        return jsonResponse(500, error, "Server Error", true)
    } finally {
        connection?.release();
    }
}

export async function checkUserExist(username : string){
    console.log("checkUserExist");
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
    console.log("addUser");
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