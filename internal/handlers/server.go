package handlers

import (
	"github.com/labstack/echo/v4"
)

type Router struct {
	Routes []*echo.Route
	Root   *echo.Group
}

type Server struct {
	Echo   *echo.Echo
	Router *Router
}

func NewServer() *Server {
	echo := echo.New()
	return &Server{
		Echo:   echo,
		Router: nil,
	}
}

func (s *Server) Start() {
	s.Router = InitRouter(s)
	s.Echo.Logger.Fatal(s.Echo.Start(":1323"))
}
