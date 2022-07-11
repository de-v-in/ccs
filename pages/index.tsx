import { getAccountTransactionsAPI } from "@apis/crawl";
import { SelectLimit } from "@components/SelectLimit";
import { Table } from "@components/Table";
import { debounce } from "lodash";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEventHandler, useEffect, useState } from "react";

const limits = [
  { amount: 10 },
  { amount: 30 },
  { amount: 50 },
  { amount: 100 },
];
const Home: NextPage = () => {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(limits[1]);
  const [transferDetails, setTransferDetails] = useState<ITransaction[]>([]);

  const debounceQuery = debounce(() => fetchAccountTransfers(), 500);

  const fetchAccountTransfers = async () => {
    setLoading(true);
    try {
      const data = await getAccountTransactionsAPI(account, limit.amount);
      const txArray: ITransaction[] = [];
      for (const k in data) {
        const transferList = data[k];
        const stepnTransferList = transferList.filter(({ token }) => {
          return token.decimals === 0;
        });
        const tokenTransferList: ITransaction[] = stepnTransferList.map(
          (tx) => {
            const { source_owner, destination_owner, token } = tx;
            return {
              txId: k,
              tokenAddress: token.address,
              type:
                {
                  [source_owner]: "SELL",
                  [destination_owner]: "BUY",
                }[account] || "UNDEFINED",
            } as ITransaction;
          }
        );
        txArray.push(...tokenTransferList);
      }
      setTransferDetails(txArray);
    } catch (e) {}
    setLoading(false);
  };

  const handleEnterAccountAddress: ChangeEventHandler<HTMLInputElement> = (
    input
  ) => {
    setAccount(input.target.value);
  };

  useEffect(() => {
    if (account) {
      try {
        debounceQuery();
      } catch (e) {}
    }
  }, [account, limit]);

  return (
    <div className="h-screen bg-gray-900 w-full flex flex-col">
      <Head>
        <title>CCS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full z-50">
        <label className="sr-only">Search</label>
        <div className="flex flex-row w-full items-center">
          <div className="relative w-32 h-12 mr-5">
            <Image
              alt="logo"
              src="/logo2.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex-auto flex-row flex justify-center items-center relative">
            <div className="relative w-3/6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                onChange={handleEnterAccountAddress}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter account address"
              />
              <SelectLimit
                limits={limits}
                current={limit}
                onSelect={setLimit}
              />
            </div>
          </div>
          <div className="w-1/12 overflow-hidden">
            {loading && (
              <div className="flex flex-row justify-center items-center">
                <span className="text-white mr-2 animate-pulse">LOADING</span>
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
          </div>
        </div>
      </div>
      <div className="flex-auto overflow-auto">
        <Table items={transferDetails} />
      </div>
    </div>
  );
};

export default Home;
