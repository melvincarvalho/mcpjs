// client.js
const net = require('net');

// Helper function to create a JSON-RPC request with a newline
function createRequest (id, method, params) {
  const request = JSON.stringify({
    jsonrpc: "2.0",
    id: id,
    method: method,
    params: params
  }) + "\n";
  console.log("Sending request:", JSON.stringify(JSON.parse(request), null, 2));
  return request;
}

const client = new net.Socket();

client.connect(4000, '127.0.0.1', () => {
  console.log('Connected to server.');

  // Send an "initialize" request (ID 1)
  client.write(createRequest(1, "initialize", { capabilities: {} }));

  // After a short delay, send an "echo" request (ID 2)
  setTimeout(() => {
    client.write(createRequest(2, "echo", { message: "Hello, MCP!" }));
  }, 500);
});

let buffer = "";
client.on('data', (data) => {
  buffer += data.toString();
  let lines = buffer.split("\n");
  buffer = lines.pop(); // keep incomplete messages in the buffer
  lines.forEach((line) => {
    if (!line) return;
    try {
      const message = JSON.parse(line);
      console.log("Received response:", JSON.stringify(message, null, 2));
    } catch (err) {
      console.error("Error parsing response:", err);
    }
  });
});

client.on('close', () => {
  console.log('Connection closed.');
});

