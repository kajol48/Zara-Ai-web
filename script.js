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
function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "bn-BD";

    let voices = window.speechSynthesis.getVoices();
    let zaraVoice = voices.find(voice => voice.name.includes("Google বাংলা") || voice.name.includes("Bangla"));

    if (zaraVoice) {
        utterance.voice = zaraVoice;
    }

    speechSynthesis.speak(utterance);
}
let recognizing = false;
let recognition;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'bn-BD';
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => recognizing = true;
  recognition.onend = () => recognizing = false;

  recognition.onresult = function(event) {
    const lastResult = event.results[event.results.length - 1];
    const transcript = lastResult[0].transcript.trim().toLowerCase();

    console.log("Voice Input:", transcript);
    if (transcript.includes("জারা") || transcript.includes("zara")) {
      speakText("জি SK, বলো?");
      listenCommand();
    }
  };
}

function startWakeListener() {
  if (!recognizing) recognition.start();
}

function listenCommand() {
  recognition.stop();

  const commandRec = new webkitSpeechRecognition();
  commandRec.lang = 'bn-BD';
  commandRec.continuous = false;
  commandRec.interimResults = false;

  commandRec.onresult = function(event) {
    const command = event.results[0][0].transcript.trim();
    appendMessage("SK (Voice)", command, "user");
    getZaraResponse(command);
  };

  commandRec.start();
}

// পেজ লোডেই শুরু হবে
window.onload = () => {
  startWakeListener();
};
