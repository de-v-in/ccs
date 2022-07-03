import React, { useEffect, useState } from "react";

import { getReq } from "../lib/be";

export default function TokenTransferList({ transferDetails }) {
  const [txMap, setTxMap] = useState<any>(null);
  const fetchPrice = (token) => async () => {
    const data = await getReq(`https://ccs.550studios.com/price/${token}`);
    const txObj = {
      ...txMap[token],
      price: data.price,
    };
    setTxMap({
      ...txMap,
      [token]: txObj,
    });
  };

  useEffect(() => {
    const txObj = {};
    transferDetails.forEach(({ tokenAddress, type }) => {
      txObj[tokenAddress] = {
        type,
        price: "",
      };
    });
    setTxMap(txObj);
  }, [transferDetails]);

  return (
    <div className="w-screen">
      {txMap &&
        Object.keys(txMap).map((tokenAddress) => {
          return (
            <div className="flex my-3 justify-around" key={tokenAddress}>
              <div>{tokenAddress}</div>
              <div>{txMap[tokenAddress].type}</div>
              <div>
                <button
                  onClick={fetchPrice(tokenAddress)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Show price
                </button>
              </div>
              <div className="w-32 flex items-center">
                {txMap[tokenAddress].price}
              </div>
            </div>
          );
        })}
    </div>
  );
}
