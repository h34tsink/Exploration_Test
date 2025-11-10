#!/usr/bin/env python3
"""
Simple HTTP server for the Exploration System Tester
Accessible over LAN by binding to all network interfaces (0.0.0.0)
"""

import http.server
import socketserver
import socket
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers if needed
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def get_local_ip():
    """Get the local IP address"""
    try:
        # Create a socket to get the local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception:
        return "Unable to determine"

if __name__ == "__main__":
    # Bind to all interfaces (0.0.0.0) to allow LAN access
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        local_ip = get_local_ip()
        
        print("=" * 70)
        print("🌌 Exploration System Tester - HTTP Server")
        print("=" * 70)
        print(f"\n✅ Server running on port {PORT}\n")
        print("📡 Access URLs:")
        print(f"   • Local:    http://localhost:{PORT}")
        print(f"   • Network:  http://{local_ip}:{PORT}")
        print(f"   • LAN:      http://0.0.0.0:{PORT}")
        print("\n💡 Other devices on your network can access via:")
        print(f"   http://{local_ip}:{PORT}")
        print("\n🛑 Press Ctrl+C to stop the server")
        print("=" * 70 + "\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped by user")
            sys.exit(0)
