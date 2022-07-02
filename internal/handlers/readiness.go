package handlers

import (
	"ccs/internal/clients"

	"github.com/labstack/echo/v4"
)

func GetReadiness(r *Router) *echo.Route {
	return r.Root.GET("", getReadinessHandler(r))
}

func getReadinessHandler(r *Router) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(200, clients.ParseJsonResp[clients.ChainInfo](clients.DoHttpReq("https://public-api.solscan.io/chaininfo/")))
	}
}
