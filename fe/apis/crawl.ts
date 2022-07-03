import { APIQueueItem } from "@saintno/needed-tools";

export const getAccountTransactionsAPI = (account: string, limit: number) => {
  return new APIQueueItem(
    `https://ccs.550studios.com/transfer/${account}?offset=0&limit=${limit}`
  )
    .high()
    .cache({ tl: "1min" })
    .get<{ [key: string]: ITransactionDetail[] }>();
};

export const getTokenMetadataAPI = (address: string) => {
  return new APIQueueItem(`https://ccs.550studios.com/meta/${address}`)
    .cache({ tl: "5min" })
    .get<ITokenMeta>();
};

export const getTokenOpenSeaPricingAPI = async (address: string) => {
  const output = await new APIQueueItem(
    `https://ccs.550studios.com/price/${address}`
  )
    .cache({ tl: "1min" })
    .get<string>();
  return output === "Price not found" ? false : parseFloat(output);
};
