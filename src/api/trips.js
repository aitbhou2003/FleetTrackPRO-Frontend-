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

export async function getTrips(token) {
  try {
    const response = await fetch("http://localhost:3000/api/trajets", {
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

export async function getTripById(id, token) {
  try {
    const response = await fetch(`http://localhost:3000/api/trajets/${id}`, {
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

export async function createTrip(tripData, token) {
  try {
    const response = await fetch("http://localhost:3000/api/trajets", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
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

export async function demarrerTrip(id, kilometrageDepart, token) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/trajets/${id}/demarrer`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kilometrageDepart),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw new Error(data.message);
  }
}
