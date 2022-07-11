const route = "/api/products";

export const create = async (data) => {
  return fetch(`${route}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
