// server.js
const net = require('net');

// Helper function to create a JSON-RPC response with a newline
function createResponse(id, result) {
  return JSON.stringify({
    jsonrpc: "2.0",
    id: id,
    result: result
  }) + "\n";
}

const server = net.createServer((socket) => {
  console.log('Client connected.');

  let buffer = "";
  socket.on('data', (data) => {
    buffer += data.toString();
    // Split messages by newline (each JSON-RPC message ends with a newline)
    let lines = buffer.split("\n");
    buffer = lines.pop(); // Keep any partial message in the buffer
    lines.forEach((line) => {
      if (!line) return;
      try {
        const message = JSON.parse(line);
        console.log("Received message:", message);
        // Handle the "initialize" method
        if (message.method === "initialize") {
          const response = {
            capabilities: {
              // Our simple server advertises an "echo" tool
              tools: { echo: { description: "Echo tool" } }
            },
            serverInfo: {
              name: "Simple MCP Server",
              version: "1.0.0"
            }
          };
          socket.write(createResponse(message.id, response));
        }
        // Handle the "echo" method
        else if (message.method === "echo") {
          // Simply echo back the provided parameters
          socket.write(createResponse(message.id, { echoed: message.params }));
        }
        // If method not found, send an error response
        else {
          socket.write(JSON.stringify({
            jsonrpc: "2.0",
            id: message.id,
            error: {
              code: -32601,
              message: "Method not found"
            }
          }) + "\n");
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    });
  });

  socket.on('end', () => {
    console.log('Client disconnected.');
  });
});

// Listen on port 4000
server.listen(4000, () => {
  console.log('Server listening on port 4000');
});

