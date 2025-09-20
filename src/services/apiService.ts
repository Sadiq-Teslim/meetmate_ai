// src/services/apiService.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const createMeeting = async (title: string, participants: { name: string; email: string }[]) => {
  try {
    const response = await apiClient.post('/meetings', { title, participants });

    // --- THIS IS THE CRITICAL DEBUGGING STEP ---
    // Log the actual data received from the server to the browser's console.
    console.log("Raw API Response from /api/meetings:", response.data);

    // According to the documentation, the meeting object is inside a 'data' property.
    // We will now safely check for this structure.
    if (response.data && response.data.data && response.data.data._id) {
      return response.data.data; // Returns the full meeting object
    } else {
      // If the data is not in the expected shape, we throw an error.
      throw new Error("Invalid data structure received from createMeeting API.");
    }
  } catch (error) {
    console.error("API Error: Failed to create meeting", error);
    throw error;
  }
};

// --- (The other functions remain the same but are included for completeness) ---

export const endMeeting = async (meetingId: string) => {
  try {
    const response = await apiClient.post(`/meetings/${meetingId}/end`);
    return response.data;
  } catch (error) {
    console.error("API Error: Failed to end meeting", error);
    throw error;
  }
};

export const generateSummary = async (meetingId: string) => {
  try {
    const response = await apiClient.post(`/qa/meetings/${meetingId}/summary`);
    return response.data.data; // Returns the summary object
  } catch (error) {
    console.error("API Error: Failed to generate summary", error);
    throw error;
  }
};