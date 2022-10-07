export default async function handler(req, res) {
<<<<<<< HEAD
  const { price, city } = req.body;
  let deliveryFee = 20;
=======
  const { price } = req.body;
  let deliveryFee = 10;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

  // Must check if everythings is correcly filled
  /*
  Must add:
  1. Delivery fee if price > 50
  2. DDS priced
  return totalPrice.toFixed(2).split(".")
   */
<<<<<<< HEAD
  // city = sofiq
  // if (city.toLowerCase() != "sofiq" || city.toLowerCase() != "софия") {
  //   deliveryFee = 80;
  // }
=======
  if (price > 50) {
    deliveryFee = 0;
  }
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  const totalPrice = (price * 1.2 + deliveryFee).toFixed(2).split(".");
  res.json({
    totalPrice: totalPrice,
    deliveryFee: deliveryFee.toFixed(2).split("."),
  });
}
