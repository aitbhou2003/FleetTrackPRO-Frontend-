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

    // if (!response.ok) {
    //   throw new Error(response.message||'field login');
    
    // }
    // console.log(response.message);
    
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
