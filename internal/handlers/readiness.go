package handlers

import (
	"ccs/internal"

	"github.com/labstack/echo/v4"
)

func GetUserInfoRoute(r *internal.Router) *echo.Route {
	return r.Root.GET("/", getHandler(r))
}

func getHandler(r *internal.Router) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(200, "Hello, World!")
	}
}
