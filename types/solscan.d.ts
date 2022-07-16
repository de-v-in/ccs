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

interface ISolscanTradeAPI {
  data: ISolscanTradeData[];
}
interface ISolscanTradeMeta {
  _id: string;
  mint: string;
  name: string;
  symbol: string;
  buyer: string;
  seller: string;
  price: number;
  collection: string;
  collectionId: string;
  tradeTime: number;
  dex: string;
  signature: string;
  family: string;
  type: string;
  image: string;
  attributes: any[];
}
