import { Injectable } from '@nestjs/common';
import { Connection } from '@solana/web3.js';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getSolConnection(): any {
    return new Connection('https://api.mainnet-beta.solana.com');
  }

  getReq(url: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.get(url);
  }
}
