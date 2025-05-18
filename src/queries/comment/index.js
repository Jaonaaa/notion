import { base_url } from "../index.js";
import { getToken } from "../../helpers/token.js";

export const addComment = async (data) => {
  try {
    const response = await fetch(base_url + "api/comments ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
