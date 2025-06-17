
const startBtn = document.getElementById("start");
const responseEl = document.getElementById("response");

const apiKey = "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"; // Replace with your OpenAI key

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

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: userInput }]
    })
  }).then(res => res.json());

  const reply = response.choices[0].message.content;
  responseEl.textContent = reply;

  const utterance = new SpeechSynthesisUtterance(reply);
  synth.speak(utterance);
};
