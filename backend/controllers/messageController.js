const  User  = require('../models/loginData'); 
const Message = require("../models/messageData");

const messageControl = {
    getMessages: async (req, res) => {
        try {
            const messages = await Message.findAll({
                include: [{ model: User, attributes: ['name'] }] // Ensure User is included
            });
    
            // Log the messages to see what is retrieved
            //console.log("Retrieved messages:", messages);
    
            const formattedMessages = messages.map(msg => ({
                id: msg.id,
                message: msg.message,
                name: msg.User ? msg.User.name : 'Unknown', // Handle case where User might be null
                isCurrent:msg.userId === req.user.userId, // Corrected line
                userId: msg.userId,
                createdAt: msg.createdAt,
                updatedAt: msg.updatedAt,
                msgUserId:msg.userId,
                reqUserId:req.user.userId,

            }));
            
            // Log the formatted messages to see the structure
            //console.log("Formatted messages:", formattedMessages);
            res.json(formattedMessages); // Send the formatted messages as a response
        } catch (error) {
            console.error("Error retrieving messages:", error); // Log the error for debugging
            res.status(500).send('Error retrieving messages');
        }
    },
    postMessage: async (req, res) => {
        console.log("postmessage function");
        console.log("User   ID:", req.user);
        const { message } = req.body;
        try {
            const newMessage = await Message.create({
                userId: req.user.userId,
                message
            });
            res.json(newMessage);
        } catch (error) {
            console.error("Error saving message:", error.message); // Log the error message
            res.status(500).send('Error saving message');
        }
    }

}

module.exports = messageControl;
