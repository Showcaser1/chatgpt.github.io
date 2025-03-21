async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    document.getElementById("userInput").value = "";
    let chatbox = document.getElementById("chatbox");

    // Display user message
    let userMessage = `<div class="message user">${userInput}</div>`;
    chatbox.innerHTML += userMessage;
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        // Fetch AI Response
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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" // Replace with your real API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get response data
        let data = await response.json();
        console.log(data); // Log the data for debugging

        // Check if the response contains a valid reply
        let botReply = data.choices[0]?.message?.content || "I couldn't get a response. Try again!";

        // Display bot response
        let botMessage = `<div class="message bot">${botReply}</div>`;
        chatbox.innerHTML += botMessage;
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        let errorMessage = `<div class="message bot">There was an error. Please try again later.</div>`;
        chatbox.innerHTML += errorMessage;
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
