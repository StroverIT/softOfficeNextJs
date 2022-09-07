async function Fetch(checkedProducts, generalPromo) {
  const filtered = checkedProducts.filter((item) => {
    if (item.isSelected) {
      return {
        sectionId: item._id,
        customPromo: item.customPromo,
        name: item.name,
        nameToDisplay: item.nameToDisplay,
      };
    }
  });
  const sendObject = {
    sectionPromo: filtered,
    generalPromo,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendObject),
  };
  const res = await fetch(`/api/promotions/personal/create`, options);

  return res.json();
}
export default Fetch;
