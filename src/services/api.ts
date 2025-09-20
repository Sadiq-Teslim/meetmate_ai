import axios from "axios";

export const API_BASE = "https://meetingsense.onrender.com/";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Create a meeting
export const createMeeting = async (
  title: string,
  participants: { name: string; email: string }[]
) => {
  const { data } = await api.post("/meetings", { title, participants });
  return data.data; // return meeting object
};

// Example endpoints (to expand later)
export const generateSummary = (transcript: string) =>
  api.post("/summary", { transcript });

export const askQuestion = (question: string) => api.post("/qa", { question });
