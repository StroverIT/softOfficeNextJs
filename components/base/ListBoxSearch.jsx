import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { HiSelector } from "react-icons/hi";

// THIS IS ONLY WORKING FOR EKONT
export default function ListBox({
  selected,
  setSelected,
  data,
  inputPlaceholder,
}) {
  const [filtered, setFiltered] = useState(data);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input.length >= 3) {
      const filtered = Array.from(data).filter((obj) => {
        if (obj.cityName) {
          return obj.cityName.toLowerCase().includes(input.toLowerCase());
        }
        if (obj.officeName) {
          return obj.officeName.toLowerCase().includes(input.toLowerCase());
        }
      });
      setFiltered(filtered);
    }
    console.log(input);
  }, [data, input]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="container relative mt-1">
        <Listbox.Button className="relative w-full py-4 pl-3 pr-10  text-left bg-white border rounded-lg cursor-default border-gray focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block pl-2 truncate font-gray-450">
            {selected.cityName || selected.officeName}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiSelector className="w-5 h-5 text-gray-450" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <section className="sticky top-0 z-10 flex flex-col bg-white border-b border-gray-400 shadow">
              <input
                type="text"
                placeholder={inputPlaceholder}
                id="searchCity"
                onKeyDown={(e) => {
                  setInput(e.currentTarget.value);
                  e.stopPropagation();
                }}
                className="w-full py-4 pl-5 shadow placeholder:text-gray-450"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-autocomplete="both"
                aria-haspopup="false"
              />

              {input.length < 3 && (
                <label htmlFor="searchCity" className="pl-5 my-4">
                  За да търси, напишете поне 3 символа
                </label>
              )}
            </section>
            {input.length >= 3 &&
              filtered.length > 0 &&
              filtered.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10  hover:text-white ${
                      active ? "bg-primary text-white" : ""
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={` block truncate text-sm ${
                          selected ? "font-medium" : "font-normal "
                        }`}
                      >
                        {item.cityName || item.officeName}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green ">
                          <AiOutlineCheck
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            {filtered.length <= 0 && input.length >= 3 && (
              <div className="py-4 pl-2">Няма намерени резултати</div>
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
