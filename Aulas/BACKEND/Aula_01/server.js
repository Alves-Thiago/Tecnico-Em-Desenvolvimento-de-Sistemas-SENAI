import { NOMEM } from "dns";
import http from "http";

let products = [
  { id: 1, name: "Mouse Gamer", price: 150 },
  { id: 2, name: "Teclado Gamer", price: 350 },
  { id: 3, name: "Headset", price: 50 },
];

async function getBody(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const [, route, idStr] = req.url.split("/");

  if (req.method === "GET" && idStr) {
    res.writeHead(200);
    return res.end(JSON.stringify(products));
  }

  if (req.method === "GET" && idStr) {
    const product = products.find(products.id === Number(idStr));
    if (!product) {
      return res.writeHead(404).end(JSON.stringify({ Erro: "Not Found" }));
    }

    if (req.method === "POST" && idStr) {
    }
  }
});

server.listen(3000, () => {
  console.log(`API Rodando em https://localhost${3000}`);
});
