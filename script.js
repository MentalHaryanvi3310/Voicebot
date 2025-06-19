const startButton = document.getElementById('start');
const transcriptDiv = document.getElementById('transcript');
const responseDiv = document.getElementById('response');

const API_KEY = "YOUR_OPENAI_API_KEY";

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
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // fallback model
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return "Oops! API error: " + errorData.error.message;
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Network or parsing error:", error);
    return "Sorry, there was a problem talking to ChatGPT.";
  }
}
