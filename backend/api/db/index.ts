import maraidb from 'mariadb';
import { db_host, db_name, db_password, db_port, db_user, productionENV } from '../config';
import mongoose from 'mongoose';

let connection : maraidb.Pool;
if(productionENV){
    connection = maraidb.createPool({
        host: db_host,
        user: db_user,
        password: db_password,
        database: db_name,
        port: parseInt(db_port.toString())
    });
}
else {
    connection = maraidb.createPool({
        host: db_host,
        user: db_user,
        password: db_password,
        database: db_name,
    });
}

export const mongo = mongoose.connect(process.env.MONGO_URI || 'localhost').then(() => {
    console.log("Connected to the database");
}
).catch((err) => {
    console.error(err);
});

export default connection;