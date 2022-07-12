import { QueueManager } from "@saintno/needed-tools";
import { exec } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

const OpenSeaQueue = new QueueManager("OpenSea", 8);

export default async function openseaPriceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      const result: string = await OpenSeaQueue.wait(
        () =>
          new Promise((resolve, rej) =>
            exec(
              `curl --user-agent 'Chrome/79' --silent https://opensea.io/assets/solana/${id} > /tmp/${id} && xidel -s /tmp/${id} --xpath "//div[contains(@class, 'Price--amount')]" && rm /tmp/${id}`,
              (err, stdout) => {
                if (err) {
                  resolve("");
                }
                resolve(stdout);
              }
            )
          )
      );
      if (result.length === 0) {
        res.status(200).json({ result: false });
      } else {
        res.status(200).json({ result: result.trim().split("\n")[0] });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
