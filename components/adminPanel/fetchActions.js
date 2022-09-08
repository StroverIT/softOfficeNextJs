const route = "/api/products";

const multipart = "multipart/data;boundary";
const formData = "multipart/form-data;";
const appJson = "application/json";

export const create = async (data) => {
  return fetch(`${route}/create`, {
    method: "POST",
    body: data,
  });
};
