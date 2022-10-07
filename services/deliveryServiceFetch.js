export const changeStatus = async (status, deliveryId) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, deliveryId }),
    };
    const res = await fetch(`/api/account/deliveries/changeStatus`, options);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
