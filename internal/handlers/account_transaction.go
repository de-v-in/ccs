package handlers

import (
	"ccs/internal/clients"
	"fmt"

	"github.com/labstack/echo/v4"
)

func GetAccountTransaction(r *Router) *echo.Route {
	return r.Root.GET("/tx", getATHandler(r))
}

func getATHandler(r *Router) echo.HandlerFunc {
	return func(c echo.Context) error {
		ac := c.QueryParam("account")
		limit := c.QueryParam("limit")
		url := fmt.Sprintf("https://public-api.solscan.io/account/transactions?account=%s&limit=%s", ac, limit)

		acTxList := clients.ParseJsonResp[[]clients.TransactionItem](clients.DoHttpReq(url))

		for _, v := range *acTxList {
			if v.IncludeSPLTransfer {
				fmt.Printf("%+v\n", v)
			}
		}

		return c.JSON(200, clients.ParseJsonResp[[]clients.TransactionItem](clients.DoHttpReq(url)))
	}
}
