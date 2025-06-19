const startButton = document.getElementById('start');
const transcriptDiv = document.getElementById('transcript');
const responseDiv = document.getElementById('response');

const API_KEY = "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";

startButton.onclick = () => {
  const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = async (event) => {
    const text = event.results[0][0].transcript;
    transcriptDiv.innerHTML = "You: " + text;
    const reply = await getChatGPTReply(text);
    responseDiv.innerHTML = "ChatGPT: " + reply;
    speak(reply);
  };
};

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

async function getChatGPTReply(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content.trim();
}
