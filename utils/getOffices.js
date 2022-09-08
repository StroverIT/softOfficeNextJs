async function getOffices(cityID) {
  try {
    const res = await fetch(
      "https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryCode: "BGR", cityID }),
      }
    );
    const data = await res.json();
    const filteredData = [];
    for (let office of data.offices) {
      filteredData.push({
        name: `${office.name} (${office.address.fullAddress})`,
      });
    }
    return filteredData;
  } catch (e) {
    console.error(e);
  }
}
export default getOffices;
