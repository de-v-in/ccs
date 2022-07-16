import { APIConfig } from "@configs/api";
import { APIQueueItem } from "@saintno/needed-tools";
import type { NextApiRequest, NextApiResponse } from "next";

// Allow up to 20 jobs at once
APIQueueItem.getQueueInstance().maxProcessing = 20;

export default async function accountHandler(
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
        APIConfig.SOL_SCAN_SPL(id as string, pOffset, pLimit)
      ).get<ISolscanAPI>();
      const transferList = data.data;
      const transferMap = {};
      const getTokenMetaApiList = transferList
        .map((transfer) => {
          transferMap[transfer.tokenAddress] = transfer;
          return transfer.tokenAddress;
        })
        .map((address) => {
          return new Promise((resolve, reject) => {
            new APIQueueItem(APIConfig.SOL_SCAN_TOKEN_META(address))
              .get()
              .then((data: any) => {
                resolve({
                  tokenMeta: data,
                  address,
                });
              })
              .catch((err) => reject(err));
          });
        });
      const stepnTokens: any = [];
      await Promise.allSettled(getTokenMetaApiList).then((results) =>
        results.forEach((result: any) => {
          if (result.value) {
            const { tokenMeta, address } = result.value;
            const nameArr = tokenMeta.name.split(" ");
            if (nameArr[0] === "Sneaker") {
              stepnTokens.push(transferMap[address]);
            }
          }
        })
      );
      res.status(200).json(stepnTokens);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
