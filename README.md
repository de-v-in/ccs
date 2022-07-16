
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## CCS overview
- CCS stands for *Crypto Crawling System*, it leverages chain scanners and public APIs to collect the market's data. 
- Why? The crypto market is too immature and super chaos, so with prior and systematical information the tool can bring the valuable prospect for traders.

## Technical overview
- NextJS for both UI and API executions
- API crafting: `apis` => `pages/api`
- UI crafting: `components`, `pages`

## Crawling overview
### Solana
- [sol-scan](https://public-api.solscan.io/docs/#/) APIs
- [opensea](https://opensea.io/) web scraping
- Metadata of token from Solana programs




