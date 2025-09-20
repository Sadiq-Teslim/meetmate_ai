// src/lib/meetings.ts
import { apiUrl } from "../services/api";
import { getGuestUser } from "./guestAcc";

export const createMeeting = async (title: string) => {
  const user = getGuestUser();

  const res = await apiUrl.post("/meetings", {
    title,
    user,
  });

  return res.data;
};
