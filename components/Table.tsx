import { getTokenMetadataAPI, getTokenOpenSeaPricingAPI } from "@apis/crawl";
import { TransactionResponse } from "@solana/web3.js";
import { getW3Service } from "@utils/web3";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

import { cx } from "../utils/common";
import { TokenInfoDialog } from "./Dialog";
import { TextWithCopy } from "./TextWithCopy";

const RowInfo: React.FC<
  {
    onPress: (item: ITokenMeta | null) => void;
  } & ITransaction
> = (item) => {
  const [metaLoading, setMetaLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [meta, setMeta] = useState<ITokenMeta | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [trans, setTrans] = useState<TransactionResponse | null>(null);

  const handleInfo = () => item.onPress(meta);

  useEffect(() => {
    setMetaLoading(true);
    setPriceLoading(true);
    getTokenMetadataAPI(item.tokenAddress)
      .then((data) => setMeta(data))
      .catch((e) => {})
      .finally(() => setMetaLoading(false));
    // getTokenOpenSeaPricingAPI(item.tokenAddress)
    //   .then((data) => (data ? setPrice(data) : null))
    //   .catch((e) => {})
    //   .finally(() => setPriceLoading(false));
    getW3Service()
      .getTransInfo(item.txId)
      .catch((e) => {})
      .then((data) => !!data && setTrans(data));
  }, [item]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">
        {metaLoading && (
          <div className="h-16 w-16 flex items-center justify-center">
            <svg
              role="status"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        {!metaLoading && !!meta && (
          <img
            alt="logo"
            className="object-contain rounded-md h-16 w-16"
            src={meta.image}
          />
        )}
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        <TextWithCopy text={item.txId} />
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {meta?.name || "--"}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        <TextWithCopy text={item.tokenAddress} />
      </th>
      <td className="px-6 py-4">
        <div className="flex">
          <div
            className={cx("p-2 py-1 rounded-xl text-white", {
              "bg-green-500": item.type === "BUY",
              "bg-red-500": item.type === "SELL",
              "bg-zinc-500": item.type === "UNDEFINED",
            })}
          >
            {item.type}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {priceLoading && (
          <div className="h-16 w-16 flex items-center justify-center">
            <svg
              role="status"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        {!priceLoading && (price ?? "--")}
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {trans?.blockTime
          ? moment(new Date(trans.blockTime * 1000)).fromNow()
          : "--"}
      </th>
      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={handleInfo}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5"
        >
          Item Info
        </button>
      </td>
    </tr>
  );
};

export const Table = ({ items = [] }: { items: ITransaction[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [crrTokenMeta, setTokenMeta] = useState<ITokenMeta | null>(null);

  const handleClose = () => setShowModal(false);
  const handleOpenDialog = (item: ITokenMeta | null) => {
    if (item) {
      setTokenMeta(item);
      setShowModal(true);
    }
  };

  const renderItems = useMemo(() => {
    return items.map((item, idx) => {
      return <RowInfo key={idx} {...item} onPress={handleOpenDialog} />;
    });
  }, [items]);

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Image
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Tx
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Name
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Token Address
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              OpenSea Price
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">View Info</span>
            </th>
          </tr>
        </thead>
        <tbody>{renderItems}</tbody>
      </table>
      <TokenInfoDialog
        isOpen={showModal}
        closeModal={handleClose}
        item={crrTokenMeta}
      />
    </>
  );
};
