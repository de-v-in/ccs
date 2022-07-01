package main

import "ccs/internal/handlers"

func main() {
	s := handlers.NewServer()
	s.Start()
}
