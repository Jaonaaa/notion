import { base_url } from "../index.js";
import { getToken } from "../../helpers/token.js";
export const addMemories = async (data) => {
  try {
    const response = await fetch(base_url + "api/story", {
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

export const getMemories = async () => {
  try {
    const response = await fetch(base_url + "api/story", {
      method: "GET",
      headers: {
        Authorization: getToken(),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
