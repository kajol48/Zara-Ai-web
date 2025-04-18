function sendText() {
    const userText = document.getElementById("userInput").value;
    fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("responseText").innerText = data.response;
        fetch("/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: data.response })
        })
        .then(res => res.json())
        .then(audio => {
            let audioElem = document.getElementById("ttsAudio");
            audioElem.src = audio.audio_url;
            audioElem.style.display = "block";
            audioElem.play();
        });
    });
}
