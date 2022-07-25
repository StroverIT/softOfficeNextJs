export const changeStatus = async (status, deliveryId) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, deliveryId }),
    };
    const res = await fetch(`/api/account/deliveries/changeStatus`, options);
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
