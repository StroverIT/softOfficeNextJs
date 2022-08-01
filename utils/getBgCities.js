async function getCities() {
  const res = await fetch(
    "http://ee.econt.com/services/Nomenclatures/NomenclaturesService.getCities.json",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ countryCode: "BGR" }),
    }
  );
  const data = await res.json();

  const fullData = [];
  data.cities.forEach((city) => {
    if (city.regionName.length > 0) {
      if (
        fullData.findIndex((item) => item.cityName == city.regionName) == -1
      ) {
        fullData.push({ cityName: city.regionName });
      }
    }
  });
  console.log(fullData.length);
  return Array.from(fullData).sort((a, b) =>
    a.cityName.localeCompare(b.cityName)
  );
}
export default getCities;
