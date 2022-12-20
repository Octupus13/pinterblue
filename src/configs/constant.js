//IMG MAX MEMORY SIZE
const IMG_MAX_SIZE = 5000000;

//JWT SECRET
const JWT_SECRET = 'pinterbluenotprinter';
const JWT_EXPIRE_TIMEOUT = 3600;

//SERVER
const SERVER_PORT = 3000;

//DATABASE
const DB_HOST = 'localhost'
const DB_USER = 'root'
const DB_PASSWORD = '1234'
const DB_NAME = 'pinterblue'
const DB_PORT = 3306;
module.exports = {
    SERVER_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    JWT_SECRET,
    JWT_EXPIRE_TIMEOUT,
    IMG_MAX_SIZE
};