async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    document.getElementById("userInput").value = "";
    let chatbox = document.getElementById("chatbox");

    // Display user message
    let userMessage = `<div class="message user">${userInput}</div>`;
    chatbox.innerHTML += userMessage;
    chatbox.scrollTop = chatbox.scrollHeight;

    // Fetch AI Response
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY" // 🔥 Replace with your real API key!
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }]
        })
    });

    let data = await response.json();
    let botReply = data.choices[0]?.message?.content || "I couldn't get a response. Try again!";

    // Display bot response
    let botMessage = `<div class="message bot">${botReply}</div>`;
    chatbox.innerHTML += botMessage;
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
