const {Sequelize} = require('sequelize');

const db = new Sequelize("groupChat","root","12345678",{
    host:"localhost",
    dialect:"mysql"
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