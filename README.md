# MCP JSON-RPC Client and Server Example

[![smithery badge](https://smithery.ai/badge/@melvincarvalho/mcpjs)](https://smithery.ai/server/@melvincarvalho/mcpjs)

This repository contains a simple, beginner-friendly example of an MCP-inspired JSON‑RPC client and server implemented in JavaScript. The project demonstrates a basic communication flow using Node.js's built‑in modules without any external dependencies.

## Overview

- **Server (`server.js`):**  
  - Listens on TCP port 4000.  
  - Implements two JSON‑RPC methods:  
    - `initialize`: Returns a basic capabilities object (advertising an "echo" tool).  
    - `echo`: Echoes back the parameters provided by the client.

- **Client (`client.js`):**  
  - Connects to the server on port 4000.  
  - Sends an `initialize` request followed by an `echo` request.  
  - Logs the responses received from the server.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system (v10 or later is recommended).

## Getting Started

### Installing via Smithery

To install MCP JSON-RPC Client and Server Example for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@melvincarvalho/mcpjs):

```bash
npx -y @smithery/cli install @melvincarvalho/mcpjs --client claude
```

### Manual Installation
1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sandy-mount/mcpjs.git
   cd mcp-jsonrpc-example
   ```

2. **Run the Server:**

   Open a terminal window and run:

   ```bash
   node server.js
   ```

   You should see a message like:

   ```
   Server listening on port 4000
   ```

3. **Run the Client:**

   Open another terminal window and run:

   ```bash
   node client.js
   ```

   The client will connect to the server, send the initialize and echo requests, and display the responses.

## How It Works

- The **server** listens for incoming TCP connections on port 4000. When it receives a JSON‑RPC message (each terminated by a newline), it processes the request:
  - For the `initialize` method, it returns a JSON‑RPC response with basic capabilities and server info.
  - For the `echo` method, it returns the parameters that were sent in the request.
  - If an unknown method is requested, it responds with a JSON‑RPC error.

- The **client** connects to the server, sends a JSON‑RPC `initialize` request, waits a short time, and then sends an `echo` request. Responses from the server are printed to the console.

## Files

- **server.js** — The JSON‑RPC server implementation.
- **client.js** — The JSON‑RPC client implementation.

## Customization

You can extend this example by:
- Adding more JSON‑RPC methods to the server.
- Implementing additional error handling and logging.
- Experimenting with different transport protocols or adding TLS support.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to open issues or submit pull requests with improvements or suggestions.

---

Happy coding!

