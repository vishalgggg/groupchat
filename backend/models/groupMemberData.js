const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./loginData"); 
const Group = require("./groupData"); // Import the Group model
const GroupMember = sequelize.define("GroupMember", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group, // Reference to the groups table
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference to the users table
            key: 'id'
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Default to false, meaning the user is not an admin
    },
    joined_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: "group_members",
    timestamps: false // Disable automatic timestamps since we are defining joined_at
});

(async () => {
    try {
        await GroupMember.sync({ force: false });
    } catch (error) {
        console.error("Error synchronizing the GroupMember model:", error);
    }
})();

module.exports = GroupMember;