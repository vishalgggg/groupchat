const {Sequelize} = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.MYSQL_DATABASE,process.env.MYSQL_USER,process.env.MYSQL_PASSWORD,{
    host:process.env.MYSQL_HOST,
    dialect:"mysql",
    logging: console.log,
});
(async () => {
    try {
        await db.authenticate();
        console.log("Database connected");
        
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
})();
module.exports = db;