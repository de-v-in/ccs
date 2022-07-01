package handlers

import (
	"ccs/internal/clients"

	"github.com/labstack/echo/v4"
)

func GetUserInfoRoute(r *Router) *echo.Route {
	return r.Root.GET("", getHandler(r))
}

func getHandler(r *Router) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(200, clients.CheckSolScan())
	}
}
