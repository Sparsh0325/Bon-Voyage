import axios from "axios";

const POLLINATIONS_AI_URL = "https://text.pollinations.ai/";
const BACKEND_URL = "http://localhost:8080/api";

/**
 * Free AI Chat Engine using Pollinations AI (No API Key Required)
 */
export const generateAIChatResponse = async (userPrompt, conversationHistory = []) => {
  try {
    const systemPrompt = "You are TravelMate AI, an expert and friendly travel planner assistant. You specialize in budget trip planning, day-by-day itineraries, hotel suggestions, local food spots, and travel tips. Keep responses helpful, structured, and easy to read.";

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg) => ({
        role: msg.sender === "USER" || msg.sender === "user" ? "user" : "assistant",
        content: msg.message || msg.text || ""
      })),
      { role: "user", content: userPrompt }
    ];

    const response = await axios.post(
      POLLINATIONS_AI_URL,
      {
        messages,
        model: "openai",
        seed: Math.floor(Math.random() * 100000)
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 20000
      }
    );

    let reply = "";
    if (typeof response.data === "string") {
      reply = response.data;
    } else if (response.data && response.data.content) {
      reply = response.data.content;
    } else if (response.data && response.data.choices && response.data.choices[0]) {
      reply = response.data.choices[0].message.content;
    } else {
      reply = String(response.data);
    }

    return reply || "Here are some top travel tips for your destination!";
  } catch (error) {
    console.warn("Pollinations AI POST error, attempting fallback GET:", error.message);
    try {
      const fallbackUrl = `https://text.pollinations.ai/${encodeURIComponent(userPrompt)}`;
      const res = await axios.get(fallbackUrl, { timeout: 15000 });
      return typeof res.data === "string" ? res.data : "Here is your travel itinerary suggestion!";
    } catch (fallbackErr) {
      return "I can help you plan your trip! Ask me about top places to visit, hotels, budget tips, or day-by-day itineraries.";
    }
  }
};

/**
 * Spring Boot Backend Chat History Persistence
 */
export const saveChatMessageToBackend = async (tripId, sender, message) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/trips/${tripId}/chats`, {
      tripId,
      sender,
      message
    });
    return response.data;
  } catch (err) {
    console.warn("Spring Boot Chat save error:", err.message);
    return null;
  }
};

export const fetchChatHistoryFromBackend = async (tripId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/trips/${tripId}/chats`);
    return response.data;
  } catch (err) {
    console.warn("Spring Boot Chat fetch error:", err.message);
    return [];
  }
};

export default {
  generateAIChatResponse,
  saveChatMessageToBackend,
  fetchChatHistoryFromBackend
};
