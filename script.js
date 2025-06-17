
const startBtn = document.getElementById("start");
const responseEl = document.getElementById("response");

const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

startBtn.onclick = () => {
  recognition.start();
  responseEl.textContent = "🎤 Listening...";
};

recognition.onresult = async (event) => {
  const userInput = event.results[0][0].transcript;
  responseEl.textContent = "You asked: " + userInput;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    const reply = data.reply;
    responseEl.textContent = reply;

    const utterance = new SpeechSynthesisUtterance(reply);
    synth.speak(utterance);
  } catch (error) {
    responseEl.textContent = "❌ Error getting response.";
    console.error(error);
  }
};
