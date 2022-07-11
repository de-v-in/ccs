export const APIConfig = {
  SOL_CONNECTION: "https://api.mainnet-beta.solana.com",
  SOL_SCAN_SPL: (id: string, offset: number, limit: number) =>
    `https://public-api.solscan.io/account/splTransfers?account=${id}&offset=${offset}&limit=${limit}`,
  SOL_SCAN_TRANS: (sig: string) =>
    `https://public-api.solscan.io/transaction/${sig}`,
  SOL_SCAN_TOKEN_META: (address: string) =>
    `https://public-api.solscan.io/token/meta?tokenAddress=${address}`,
};
