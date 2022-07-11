import { exec } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      const result: string = await new Promise((resolve, rej) =>
        exec(
          `curl --user-agent 'Chrome/79' --silent https://opensea.io/assets/solana/${id} > /tmp/temp && xidel -s /tmp/temp --xpath "//div[contains(@class, 'Price--amount')]" && rm /tmp/temp`,
          (err, stdout) => {
            if (err) {
              console.log("Error: ", err);
              rej(err);
            }
            resolve(stdout);
          }
        )
      );
      if (result.length === 0) {
        res.status(200).json({ result: false });
      } else {
        res.status(200).json({ result });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
