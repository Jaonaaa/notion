import { base_url } from "..";

async function signIn(email, password) {
  try {
    const response = await fetch(base_url + "api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to sign in");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function singUp(fullname, email, password) {
  try {
    const response = await fetch(base_url + "api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name: fullname }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to sign in");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export default signIn;
