package handlers

import (
	"github.com/labstack/echo/v4"
)

func InitRouter(s *Server) *Router {

	router := &Router{
		Routes: nil,
		Root:   s.Echo.Group(""),
	}

	router.Routes = []*echo.Route{
		GetReadiness(router),
		GetAccountTransaction(router),
	}

	return router
}
