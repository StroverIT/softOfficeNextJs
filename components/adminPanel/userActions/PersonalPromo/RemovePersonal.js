export async function removePersonal(ownerId) {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerId }),
    };
    const res = await fetch(`/api/promotions/personal/remove`, options);
    return res.json();
  } catch (e) {
    console.log(e);

    return res.json({ error: e.error });
  }
}
