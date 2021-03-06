import { APIQueueItem } from "@saintno/needed-tools";

export const getAccountTransactionsAPI = (account: string, limit: number) => {
  return new APIQueueItem(`/api/account/${account}?offset=0&limit=${limit}`)
    .high()
    .get<IStepNSPLTransfer[]>();
};

export const getTokenMetadataAPI = (address: string) => {
  return new APIQueueItem(`/api/token/${address}/meta`)
    .cache({ tl: "5min" })
    .get<ITokenMeta>();
};

export const getTokenOpenSeaPricingAPI = async (address: string) => {
  const output = await new APIQueueItem(`/api/token/${address}/opensea/price`)
    .cache({ tl: "1min" })
    .get<{ result: false | string }>();
  return output.result ? parseFloat(output.result) : false;
};

export const getTokenTradePriceAPI = async (address: string, limit: number) => {
  return new APIQueueItem(
    `/api/token/${address}/tradePrice?offset=0&limit=${limit}`
  )
    .now()
    .get<ISolscanTradeMeta[]>();
};
