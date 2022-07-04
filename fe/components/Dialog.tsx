import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export const TokenInfoDialog: React.FC<{
  item?: ITokenMeta;
  isOpen: boolean;
  closeModal: () => void;
}> = ({ isOpen, closeModal, item }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {item?.name}
                  </Dialog.Title>
                  <div className="mt-2 flex flex-row" style={{ maxWidth: 700 }}>
                    <div>
                      <img
                        alt="item"
                        src={item?.image}
                        style={{
                          minWidth: 128,
                          minHeight: 128,
                          height: 128,
                          width: 128,
                        }}
                        className="rounded-lg mt-1"
                      />
                    </div>
                    <div className="ml-4 flex flex-col">
                      <label className="text-xs font-bold text-gray-500">
                        ATTRIBUTES
                      </label>
                      <div className="flex flex-wrap">
                        {item?.attributes
                          .filter((i) => !i.trait_type.includes("Socket"))
                          .map((attribute) => (
                            <div
                              key={attribute.trait_type}
                              className="w-1/3 p-1"
                            >
                              <div className="flex flex-col p-2 rounded-md justify-center items-center border border-gray-400 bg-gray-200">
                                <span className="text-zinc-500 text-sm">
                                  {attribute.trait_type}
                                </span>
                                <span className="text-sm text-gray-900">
                                  {attribute.value.includes("unknown/empty")
                                    ? "Empty"
                                    : attribute.value}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                      <label className="text-xs font-bold text-gray-500 mt-2">
                        SOCKETS
                      </label>
                      <div className="flex flex-wrap">
                        {item?.attributes
                          .filter((i) => i.trait_type.includes("Socket"))
                          .map((attribute) => (
                            <div
                              key={attribute.trait_type}
                              className="w-1/3 p-1"
                            >
                              <div className="flex flex-col p-2 rounded-md justify-center items-center border border-gray-400 bg-gray-200">
                                <span className="text-zinc-500 text-sm">
                                  {attribute.trait_type}
                                </span>
                                <span className="text-sm text-gray-900">
                                  {attribute.value.includes("unknown/empty")
                                    ? "Empty"
                                    : attribute.value}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
