export async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "field login");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
