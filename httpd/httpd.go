package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	if len(os.Args) <= 1 {
		fmt.Printf("Usage: %v -dir <dir> [-ip <ipaddr>] [-port <port>]\n", os.Args[0])
		os.Exit(1)
	}

	var httpdir = flag.String("dir", "", "Directory to serve")
	var listenip = flag.String("ip", "127.0.0.1", "IP Address to listen on")
	var listenport = flag.Int("port", 8080, "Port to listen on")
	flag.Parse()

	if(*httpdir == "") {
		fmt.Printf("Error: Directory not specified")
		os.Exit(1)
	}

	stat, err := os.Stat(*httpdir)
	if err != nil || !stat.Mode().IsDir() {
		fmt.Printf("Error: %v is not a directory\n", *httpdir)
		os.Exit(1)
	}

	path, err := filepath.Abs(*httpdir)
	if err != nil {
		fmt.Printf("Error: %v cannot be converted to absolute path\n", *httpdir)
		os.Exit(1)
	}


	var listenaddr string = fmt.Sprintf("%s:%d", *listenip, *listenport)

	fmt.Printf("[%s] Serving %v\n", listenaddr, path)
	http.Handle("/", http.FileServer(http.Dir(path)))
	http.ListenAndServe(fmt.Sprintf("%s", listenaddr), nil)
}
