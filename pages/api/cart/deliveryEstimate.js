export default async function handler(req, res) {
  const { price, city } = req.body;
  let deliveryFee = 20;

  // Must check if everythings is correcly filled
  /*
  Must add:
  1. Delivery fee if price > 50
  2. DDS priced
  return totalPrice.toFixed(2).split(".")
   */
  // city = sofiq
  // if (city.toLowerCase() != "sofiq" || city.toLowerCase() != "софия") {
  //   deliveryFee = 80;
  // }
  const totalPrice = (price * 1.2 + deliveryFee).toFixed(2).split(".");
  res.json({
    totalPrice: totalPrice,
    deliveryFee: deliveryFee.toFixed(2).split("."),
  });
}
