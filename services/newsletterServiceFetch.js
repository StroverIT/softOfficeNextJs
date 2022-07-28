export const addNewUser = (email) => {
  return fetch(`/api/newsletter/addNewUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};
