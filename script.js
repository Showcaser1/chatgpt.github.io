async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    document.getElementById("userInput").value = "";
    let chatbox = document.getElementById("chatbox");

    let userMessage = `<div class="message user">${userInput}</div>`;
    chatbox.innerHTML += userMessage;

    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }]
        })
    });

    let data = await response.json();
    let botReply = data.choices[0].message.content;

    let botMessage = `<div class="message bot">${botReply}</div>`;
    chatbox.innerHTML += botMessage;
    chatbox.scrollTop = chatbox.scrollHeight;
}
