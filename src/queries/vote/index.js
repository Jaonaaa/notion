import { base_url } from "..";
import { getToken } from "../../helpers/token";

export const addVote = async (storyId) => {
  try {
    const response = await fetch(base_url + `api/stories/${storyId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding vote:", error);
    throw error;
  }
};
