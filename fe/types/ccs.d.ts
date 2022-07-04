type TTransactionType = "BUY" | "SELL" | "UNDEFINED";

interface ITransaction {
  txId: string;
  type: TTransactionType;
  tokenAddress: string;
}

interface ITokenInfo {
  address: string;
  decimals: number;
}

interface ITransactionDetail {
  source: string;
  destination: string;
  source_owner: string;
  destination_owner: string;
  amount: string;
  token: ITokenInfo;
  type: string;
}
