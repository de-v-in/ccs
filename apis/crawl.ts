import { APIQueueItem } from "@saintno/needed-tools";

export const getAccountTransactionsAPI = (account: string, limit: number) => {
  return new APIQueueItem(`/api/account/${account}?offset=0&limit=${limit}`)
    .high()
    .get<{ [key: string]: ITransactionDetail[] }>();
};

export const getTokenMetadataAPI = (address: string) => {
  return new APIQueueItem(`/api/token/${address}/meta`).get<ITokenMeta>();
};

export const getTokenOpenSeaPricingAPI = async (address: string) => {
  const output = await new APIQueueItem(
    `/api/token/${address}/opensea/price`
  ).get<{ result: false | string }>();
  return output.result ? parseFloat(output.result) : false;
};
