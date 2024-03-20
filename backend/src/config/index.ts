import dotenv from 'dotenv';

dotenv.config();

const productionENV = true;

const PORT = productionENV ? process.env.PORT || 3000 : 3001;
const db_name = productionENV ? process.env.DB_NAME : 'tuf';
const db_host = productionENV ? process.env.DB_HOST : 'localhost';
const db_port = productionENV ? process.env.DB_PORT || 27017 : 81;
const db_user = productionENV ? process.env.DB_USER : 'root';
const db_password = productionENV ? process.env.DB_PASS : '';
const JWT_SECRET =  process.env.JWT_SECRET || 'secret';

export {
    PORT,
    db_name,
    db_host,
    db_port,
    db_user,
    db_password,
    productionENV,
    JWT_SECRET
}