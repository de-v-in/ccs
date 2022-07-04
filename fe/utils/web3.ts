import { clusterApiUrl, Connection } from "@solana/web3.js";

class Web3Services {
  conn: Connection;

  constructor() {
    this.conn = new Connection(clusterApiUrl("mainnet-beta"));
  }

  async getTransInfo(txId: string) {
    return this.conn.getTransaction(txId);
  }
}

let web3Services: Web3Services;

const getW3Service = () => {
  if (!web3Services) {
    web3Services = new Web3Services();
  }
  return web3Services;
};

export { getW3Service, Web3Services };
