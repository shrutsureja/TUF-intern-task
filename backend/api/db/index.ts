import maraidb from 'mariadb';
import { db_host, db_name, db_password, db_port, db_user, productionENV } from '../config';

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


export default connection;