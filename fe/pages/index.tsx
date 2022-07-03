import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { getReq } from "../lib/be";
import AccountSearch from "../components/AccountSearch";
import TokenTransferList from "../components/TokenTransferList";
import styles from "../styles/Home.module.css";
import LimitSelect from "../components/LimitSelect";
const limits = [
  { amount: 10 },
  { amount: 30 },
  { amount: 50 },
  { amount: 100 },
];
const Home: NextPage = () => {
  const [account, setAccount] = useState("");
  const [limit, setLimit] = useState(limits[0]);
  const [transferDetails, setTransferDetails] = useState<any[]>([]);

  const fetchAccountTransfers = async () => {
    const data = await getReq(
      `https://ccs.550studios.com/transfer/${account}?offset=0&limit=${limit.amount}`
    );
    console.log(data);
    const txArray: any[] = [];
    for (const k in data) {
      const transferList = data[k];
      const stepnTransferList = transferList.filter(({ token }) => {
        return token.decimals === 0;
      });
      const tokenTransferList = stepnTransferList.map((tx) => {
        const { source_owner, destination_owner, token } = tx;
        if (source_owner === account) {
          return {
            type: "SELL",
            tokenAddress: token.address,
          };
        } else if (destination_owner === account) {
          return {
            type: "BUY",
            tokenAddress: token.address,
          };
        }
        console.log("tx", tx);
        return {
          type: "UNDEFINED",
          tokenAddress: token.address,
        };
      });
      txArray.push(...tokenTransferList);
    }
    setTransferDetails(txArray);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CCS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AccountSearch
          account={account}
          setAccount={setAccount}
          fetchAccountTransfers={fetchAccountTransfers}
        />
        <LimitSelect selected={limit} setSelected={setLimit} />

        {transferDetails.length !== 0 && (
          <TokenTransferList transferDetails={transferDetails} />
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
