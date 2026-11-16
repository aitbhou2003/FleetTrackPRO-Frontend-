export async function getTrucks(token) {
  try {
    const response = await fetch("http://localhost:3000/api/trucks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function createTruck(truckData, token) {
  try {
    const response = await fetch("http://localhost:3000/api/trucks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        immatriculation: truckData.immatriculation,
        marque: truckData.marque,
        kilometrageTotal: truckData.kilometrageTotal,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "error de craetion de camion");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteTruck(token, truckId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/trucks/${truckId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateTruck(updatedData, truckId, token) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/trucks/${truckId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
