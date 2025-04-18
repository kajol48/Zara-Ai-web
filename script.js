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
