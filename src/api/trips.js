export async function getMyTrips(token) {
  try {
    const response = await fetch("http://localhost:3000/api/mes-trajets", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}


