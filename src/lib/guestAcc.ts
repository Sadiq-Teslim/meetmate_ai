import { v4 as uuid } from "uuid";

export const getGuestUser = () => {
  let user = localStorage.getItem("guestUser");

  if (!user) {
    user = JSON.stringify({
      id: uuid(),
      name: "Guest",
      email: null, // optional for now
    });
    localStorage.setItem("guestUser", user);
  }

  return JSON.parse(user);
};
