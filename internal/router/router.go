package router

import (
	"ccs/internal"
	"ccs/internal/handlers"

	"github.com/labstack/echo/v4"
)

func InitRouter(s *internal.Server) *internal.Router {

	router := &internal.Router{
		Routes: nil,
		Root:   s.Echo.Group(""),
	}

	router.Routes = []*echo.Route{
		handlers.GetUserInfoRoute(router),
	}

	return router
}
