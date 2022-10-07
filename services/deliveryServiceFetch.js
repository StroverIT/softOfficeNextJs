export const changeStatus = async (status, deliveryId) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, deliveryId }),
    };
    const res = await fetch(`/api/account/deliveries/changeStatus`, options);
<<<<<<< HEAD
=======
    console.log(res);
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
