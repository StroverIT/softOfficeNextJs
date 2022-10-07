<<<<<<< HEAD
import React, { useState } from "react";

// Components
import ListBoxSearch from "../base/ListBoxSearch";
import Outlined from "../buttons/Outlined";
import SingleUser from "./userActions/SingleUser";

export default function Users({ usersData, products }) {
  return (
    <section className="flex flex-wrap items-center justify-center my-10 ">
      {/* Nav buttons */}
      {usersData &&
        usersData.map((user) => {
          return <SingleUser data={user} key={user._id} products={products} />;
        })}
      {!usersData && <div> Няма регистрирани потребители</div>}
    </section>
  );
=======
import React from "react";

export default function Users() {
  return <div>Users</div>;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
}
