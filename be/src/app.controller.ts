import { Controller, Get, Param, Query } from '@nestjs/common';
import { exec } from 'child_process';
import { AppService } from './app.service';
import { PublicKey } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/transfer/:account')
  async getAccountSplTransfers(
    @Param('account') account: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    console.time('getAccountSplTransfers');
    Promise.allSettled =
      Promise.allSettled ||
      ((promises) =>
        Promise.all(
          promises.map((p) =>
            p
              .then((value) => ({
                status: 'fulfilled',
                value,
              }))
              .catch((reason) => ({
                status: 'rejected',
                reason,
              })),
          ),
        ));
    const url = `https://public-api.solscan.io/account/splTransfers?account=${account}&offset=${offset}&limit=${limit}`;
    const response: any = await this.appService.getReq(url);

    const transferList = response.data.data;
    const stepnTokenTransfer = transferList.filter((transfer: any) => {
      return transfer.decimals == 0;
    });
    const tokenAddressSignatureList = stepnTokenTransfer.map(
      ({ tokenAddress, signature }: any) => ({
        tokenAddress,
        signature: signature[0],
      }),
    );

    const transactionDetailList = [];
    const promiseList = [];
    for (const { signature } of tokenAddressSignatureList) {
      const transactionDetailUrl = `https://public-api.solscan.io/transaction/${signature}`;
      const txDetail: any = this.appService.getReq(transactionDetailUrl);
      // transactionDetailList.push(txDetail.data.tokenTransfers);
      promiseList.push(txDetail);
    }

    await Promise.allSettled(promiseList).then((results) =>
      results.forEach((result: any) => {
        if (result.value.data) {
          transactionDetailList.push(result.value.data.tokenTransfers);
        }
      }),
    );

    console.timeEnd('getAccountSplTransfers');
    return {
      transactionDetailList,
    };
  }

  @Get('/price/:id')
  async getTokenPrice(@Param('id') id: string) {
    const result: string = await new Promise((resolve, rej) =>
      exec(
        `curl --user-agent 'Chrome/79' --silent https://opensea.io/assets/solana/${id} > temp && xidel -s temp --xpath "//div[contains(@class, 'Price--amount')]"`,
        (err, stdout) => {
          if (err) {
            console.log('Error: ', err);
            rej(err);
          }
          resolve(stdout);
        },
      ),
    );
    return {
      price: result.length === 0 ? 'Price not found' : result.split('\n')[0],
    };
  }

  @Get('/meta/:id')
  async getMeta(@Param('id') id: string) {
    const stepnUri: any = await (async () => {
      const mintPubkey = new PublicKey(id);
      const tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
      const connection = this.appService.getSolConnection();
      const tokenmeta: any = await Metadata.load(connection, tokenmetaPubkey);

      return tokenmeta.data.data.uri;
    })();
    const response: any = await this.appService.getReq(stepnUri);
    return response.data;
  }
}
