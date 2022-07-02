package clients

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type ChainInfo struct {
	BlockHeight      int `json:"blockHeight"`
	CurrentEpoch     int `json:"currentEpoch"`
	AbsoluteSlot     int `json:"absoluteSlot"`
	TransactionCount int `json:"transactionCount"`
}

type TransactionItem struct {
	BlockTime          int    `json:"blockTime"`
	Slot               int    `json:"slot"`
	TxHash             string `json:"txHash"`
	Fee                int    `json:"fee"`
	Status             string `json:"status"`
	Lamport            int    `json:"lamport"`
	IncludeSPLTransfer bool   `json:"includeSPLTransfer"`
}

func DoHttpReq(url string) []byte {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		fmt.Printf("client: could not create request: %s\n", err)
		os.Exit(1)
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("client: error making http request: %s\n", err)
		os.Exit(1)
	}
	fmt.Printf("client: status code: %d\n", res.StatusCode)
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Printf("client: could not read response body: %s\n", err)
		os.Exit(1)
	}
	return resBody
}

func ParseJsonResp[T any](resp []byte) *T {
	var data *T
	err := json.Unmarshal(resp, &data)
	if err != nil {
		fmt.Printf("could not unmarshal json: %s\n", err)
		return nil
	}
	return data
}
