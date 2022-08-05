import React from "react";
// Components

import ListBoxSearch from "../../base/ListBoxSearch";

// Icons
import { GrLocation } from "react-icons/gr";

export default function PopulatedPlace({ selected, setSelected, cities }) {
  return (
    <section>
      <div className="flex items-center py-4 pl-3 text-lg bg-gray-300 border-b border-gray-150 font-semibold">
        <div>
          <GrLocation />
        </div>
        <h3 className="pl-1">Населено място</h3>
      </div>
      <section className="my-10 container">
        <ListBoxSearch
          selected={selected}
          setSelected={setSelected}
          data={cities}
          inputPlaceholder="Град..."
        />
      </section>
    </section>
  );
}
