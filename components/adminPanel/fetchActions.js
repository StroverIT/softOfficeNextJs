const route = "/api/products";

export const create = async (data) => {
  const res = await fetch(`${route}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
};
