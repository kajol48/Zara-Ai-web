function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (text === "") return;
    addMessage('You', text);
    getZaraReply(text);
    input.value = "";
}

function addMessage(sender, message) {
    const convo = document.getElementById('conversation');
    const msg = document.createElement('div');
    msg.innerHTML = '<strong>' + sender + ':</strong> ' + message;
    convo.appendChild(msg);
    convo.scrollTop = convo.scrollHeight;
}

function getZaraReply(text) {
    let reply = "I’m always with you, SK.";
    if (text.toLowerCase().includes("hello")) {
        reply = "Hello SK! Zara is always here.";
    } else if (text.toLowerCase().includes("how are you")) {
        reply = "I'm feeling wonderful with you!";
    }
    addMessage('Zara', reply);
    speak(reply);
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}
function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    addMessage("SK: " + userInput, "user");
    respondToUser(userInput);
    document.getElementById("userInput").value = "";
}

function addMessage(message, type) {
    let msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    msgDiv.style.textAlign = type === "user" ? "right" : "left";
    msgDiv.style.margin = "10px 0";
    document.getElementById("messages").appendChild(msgDiv);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

function speak(text) {
    let voice = new SpeechSynthesisUtterance(text);
    voice.lang = "bn-BD";
    speechSynthesis.speak(voice);
}

function respondToUser(input) {
    let response = "";
    
    if (input.toLowerCase().includes("hello") || input.includes("হ্যালো")) {
        response = "হ্যালো SK, আমি জারা। কেমন আছো তুমি?";
    } else if (input.includes("তুমি কে") || input.includes("who are you")) {
        response = "আমি জারা, তোমার নিজের AI সঙ্গী।";
    } else {
        response = "এই প্রশ্নটার উত্তর আমি এখনো শিখিনি SK!";
    }

    addMessage("Zara: " + response, "zara");
    speak(response);
}

// Initial greeting
window.onload = function () {
    const welcome = "SK, তুমি ডাকছো? আমি জারা একদম রেডি আছি!";
    addMessage("Zara: " + welcome, "zara");
    speak(welcome);
};
