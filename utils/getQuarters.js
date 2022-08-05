async function getQuarters(cityID) {
  try {
    const res = await fetch(
      "http://ee.econt.com/services/Nomenclatures/NomenclaturesService.getQuarters.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryCode: "BGR", cityID }),
      }
    );
    const data = await res.json();
    const filtereData = data.quarters.map((item) => {
      return { name: item.name };
    });
    return filtereData;
  } catch (e) {
    console.error(e);
  }
}
export default getQuarters;
