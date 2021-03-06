import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";

export const SelectLimit = ({
  limits,
  onSelect,
  current,
}: {
  current: { amount: number };
  limits: { amount: number }[];
  onSelect: (limit: { amount: number }) => void;
}) => {
  const [selected, setSelected] = useState(current);

  useEffect(() => {
    if (selected !== current) {
      onSelect(selected);
    }
  }, [selected]);

  return (
    <div className="absolute top-0 right-0 bottom-0 flex items-center mr-1">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-600 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-white text-xs md:text-sm">
              LAST <strong>{selected.amount}</strong> TX
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-300"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {limits.map((limit, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 flex justify-center pl-2 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={limit}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {limit.amount}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center text-amber-600 ml-1">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
