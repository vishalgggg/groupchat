document.addEventListener("DOMContentLoaded", async () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token); // Log the token

    if (!token) {
        console.error("No token found. User may not be logged in.");
        return; // Exit if there's no token
    }

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
    //console.log("Fetched messages:", messages);
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
        displayMessages(messages); // Display the new message
        window.location.reload();
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
        console.log("messages are ",msg.message)
        // Check if the message is from the current user
        if (msg.isCurrent ) { // Adjust this check based on your logic
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
});