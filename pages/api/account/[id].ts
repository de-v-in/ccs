import { APIConfig } from "@configs/api";
import { APIQueueItem } from "@saintno/needed-tools";
import type { NextApiRequest, NextApiResponse } from "next";

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

      const stepnTokenTransfer = transferList.filter((transfer: any) => {
        return transfer.decimals == 0;
      });

      const tokenAddressSignatureList = stepnTokenTransfer.map(
        ({ tokenAddress, signature }: any) => ({
          tokenAddress,
          signature: signature[0],
        })
      );

      const transactionDetailObj = {};
      const promiseList: { tokenTransfers: string; signature: string }[] = [];
      for (const { signature } of tokenAddressSignatureList) {
        const txDetail: any = new Promise((resolve, reject) => {
          new APIQueueItem(APIConfig.SOL_SCAN_TRANS(signature))
            .get()
            .then((data: any) => {
              resolve({
                tokenTransfers: data.tokenTransfers,
                signature,
              });
            })
            .catch((err) => reject(err));
        });
        promiseList.push(txDetail);
      }

      await Promise.allSettled(promiseList).then((results) =>
        results.forEach((result: any) => {
          if (result?.value) {
            const { signature, tokenTransfers } = result.value;
            if (signature) {
              transactionDetailObj[signature] = tokenTransfers;
            }
          }
        })
      );

      res.status(200).json(transactionDetailObj);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
