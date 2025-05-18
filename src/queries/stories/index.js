import { base_url } from "..";
import { getToken } from "../../helpers/token";

export async function getStoryById(id) {
  try {
    const response = await fetch(base_url + `api/story/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching story with id ${id}: ${response.statusText}`);
    }
    const story = await response.json();
    return story;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getAllStories() {
  try {
    const response = await fetch(base_url + `api/story/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching story with id ${id}: ${response.statusText}`);
    }
    const story = await response.json();
    return story;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getArchive() {
  try {
    const response = await fetch(base_url + `api/top/archive`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching story with id ${id}: ${response.statusText}`);
    }
    const story = await response.json();
    return story;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
