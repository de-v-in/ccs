import { APIConfig } from "@configs/api";
import { APIQueueItem } from "@saintno/needed-tools";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function tradePriceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, offset, limit },
    method,
  } = req;
  const pOffset = parseInt(offset as string, 10) || 0;
  const pLimit = parseInt(limit as string, 10) || 10;
  switch (method) {
    case "GET":
      const data = await new APIQueueItem(
        APIConfig.SOL_SCAN_NFT_TRADE_META(id as string, pOffset, pLimit)
      ).get<ISolscanTradeAPI>();
      res.status(200).json(data.data);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
