const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your real API key securely in production
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question");
const responseText = document.getElementById("response");

const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = 'en-US';
recognition.interimResults = false;

startBtn.onclick = () => {
  responseText.textContent = "Listening...";
  recognition.start();
};

recognition.onresult = async (event) => {
  const userQuestion = event.results[0][0].transcript;
  questionText.textContent = `You: ${userQuestion}`;
  responseText.textContent = "Thinking...";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are ChatGPT responding with thoughtful, insightful and helpful answers in a friendly tone." },
        { role: "user", content: userQuestion }
      ],
    }),
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;
  responseText.textContent = reply;
  speak(reply);
};

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  synth.speak(utterance);
}