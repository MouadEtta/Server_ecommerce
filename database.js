const mysql=require('mysql');
///DATA TO ACCESS THE DATABASE
const pool =mysql.createPool({
    host:'database-2.ctfdpizyhhzy.eu-north-1.rds.amazonaws.com',
    user:'admin',
    password:'Mouad2001#',
    database:'ecommerce',
    port: 3306,
    connectionLimit: 100,
    multipleStatements: false
});
 
module.exports = {
    pool
};