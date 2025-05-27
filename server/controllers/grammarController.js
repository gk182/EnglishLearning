import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const checkGrammar = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

const prompt = `
You are a grammar checker AI. Please check and correct the grammar in the following English text.
Return a JSON object with two keys:
- "correctedText": the corrected text string.
- "errors": an array of objects, each with "word" (the incorrect word) and "message" (the explanation of the error in Vietnamese).

Respond ONLY with the JSON object. No additional text.

Text to check:
${text}
`;


  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    let content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return res.status(500).json({ error: "No response from Gemini" });
    }

    // Loại bỏ markdown ```json ... ``` nếu có
    content = content.trim();
    if (content.startsWith("```json")) {
      content = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (content.startsWith("```")) {
      content = content.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      return res.status(500).json({ error: "Invalid JSON response from Gemini", raw: content });
    }

    res.json(result);
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to check grammar" });
  }
};
