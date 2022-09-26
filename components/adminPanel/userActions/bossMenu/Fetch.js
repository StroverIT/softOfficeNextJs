export async function BossFetch(data) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const res = await fetch(`/api/roles/boss/addBossAndWorkers`, options);

  return res.json();
}

export async function BossActions(options) {
  const res = await fetch("/api/boss/actions", options);
  return res.json();
}
