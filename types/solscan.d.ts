interface ISolscanAPI {
  total: number;
  data: ISolscanData[];
}

interface ISolscanData {
  _id: string;
  address: string;
  signature: string[];
  changeType: string;
  changeAmount: number;
  decimals: number;
  postBalance: string;
  preBalance: string;
  tokenAddress: string;
  owner: string;
  symbol: string;
  blockTime: number;
  slot: number;
  fee: number;
}

interface IStepNSPLTransfer extends ISolscanData {
  balance: IBalance;
}

interface IBalance {
  amount: string;
  decimals: number;
}
