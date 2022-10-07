import React from "react";

<<<<<<< HEAD
// Components
import PromoItem from "./promotions/PromoItem";

export default function Promotions({ promotions }) {
  return (
    <div className="flex flex-wrap items-center justify-center my-10 gap-x-5 gap-y-5">
      {promotions.length >= 1 &&
        promotions.map((promo) => <PromoItem key={promo._id} promo={promo} />)}
      {promotions.length <= 0 && <div>Няма добавени промоции</div>}
    </div>
  );
=======
export default function Promotions() {
  return <div>Promotions</div>;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
}
