import { APIConfig } from "@configs/api";
import { programs } from "@metaplex/js";
import { APIQueueItem } from "@saintno/needed-tools";
import { Connection, PublicKey } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";

const {
  metadata: { Metadata },
} = programs;

export default async function tokenMetaHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      const stepnUri: any = await (async () => {
        const mintPubkey = new PublicKey(id as string);
        const tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
        const connection = new Connection(APIConfig.SOL_CONNECTION);
        const tokenmeta: any = await Metadata.load(connection, tokenmetaPubkey);

        return tokenmeta.data.data.uri;
      })();
      const meta = await new APIQueueItem(stepnUri).get();
      res.status(200).json(meta);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
