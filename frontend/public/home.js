document.addEventListener("DOMContentLoaded", async () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token); // Log the token

    if (!token) {
        console.error("No token found. User may not be logged in.");
        return; // Exit if there's no token
    }
    loadMessages(token);
    // Fetch existing messages when the page loads
    const response = await fetch("/api/messages", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}` // Include the token here
        }
    });

    if (!response.ok) {
        const errorText = await response.text(); // Get the error message
        console.error("Error fetching messages:", errorText); // Log the error message
        return; // Exit if there's an error
    }

    const messages = await response.json();
    displayMessages(messages); // Display the fetched messages

    document.getElementById("sendMessage").addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = document.getElementById("message").value;

        const response = await fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include the token here
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            const errorText = await response.text(); // Get the error message
            console.error("Error:", errorText); // Log the error message
            return; // Exit if there's an error
        }

        const result = await response.json(); // Parse the response as JSON
        console.log("Message sent:", result);
        displayMessages([result]); // Display the new message
        document.getElementById("message").value = ''; // Clear the input field
    });

    function displayMessages(messages) {
        const allMessages = document.getElementById("allMessages");
        allMessages.innerHTML = ''; // Clear existing messages

        // Check if messages is an array
        if (Array.isArray(messages)) {
            messages.forEach(msg => {
                createMessageElement(msg, allMessages);
            });
        } else {
            // If it's a single message object, create a message element for it
            createMessageElement(messages, allMessages);
        }
    
    }

    function createMessageElement(msg, container) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        console.log(msg)
        // Check if the message is from the current user
        if (msg.isCurrent) { // Adjust this check based on your logic
            messageDiv.classList.add("current-user");
            messageDiv.style.textAlign = "right";
            container.appendChild(document.createElement("br"))
        } else {
            messageDiv.classList.add("other-user");
            messageDiv.style.textAlign = "left";
            container.appendChild(document.createElement("br"))
        }

        messageDiv.innerText = `${msg.name || msg.userId}: ${msg.message}`; // Display user name or ID
        container.appendChild(messageDiv);

    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        displayMessages(messages); // Function to render messages on the frontend
        
        const lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : undefined;
        fetchNewMessages(lastMessageId); // Fetch new messages from backend
    }
    async function fetchNewMessages(lastMessageId) {
        const tokn = localStorage.getItem("token"); // Retrieve the token from local storage
        console.log("Token being sent:", tokn); // Log the token to check if it's retrieved correctly
    
        const url = lastMessageId ? `http://localhost:3000/api/messages?lastId=${lastMessageId}` : 'http://localhost:3000/api/messages?lastId=-1';
        
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}` // Include the token here
                }
            });
    
            if (!response.ok) {
                const errorText = await response.text(); // Get the error message
                console.error("Error fetching new messages:", errorText); // Log the error message
                throw new Error('Network response was not ok');
            }
    
            const newMessages = await response.json(); // Parse the response as JSON
            newMessages.forEach(storeMessage); // Store new messages in local storage
            displayMessages(newMessages); // Render new messages on the frontend
        } catch (error) {
            console.error("Error fetching new messages:", error);
        }
    }
    function storeMessage(message) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        
        // Limit to the most recent 10 messages
        if (messages.length > 10) {
            messages.shift(); // Remove the oldest message
        }
        
        localStorage.setItem('messages', JSON.stringify(messages)); // Save updated messages back to local storage
    }
})