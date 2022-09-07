async function Fetch(data) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const res = await fetch(`/api/roles/boss/addBossAndWorkers`, options);

  return res.json();
}
export default Fetch;
