export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or try "gpt-3.5-turbo"
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    console.log("OpenAI response:", JSON.stringify(data, null, 2)); // 👈 Add this line

    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error); // 👈 Add this line
    res.status(500).json({ reply: "Something went wrong." });
  }
}
