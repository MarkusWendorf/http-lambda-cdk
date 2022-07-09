#!/usr/bin/env node
import fastify from "fastify";

const app = fastify();

app.get("/", (req, res) => {
  res.headers({
    "Content-Type": "text/html",
  });

  res.send("<h1>Hello world!</h1>");
});

const port = 8080;

console.log(`Listening on port ${port}`);
app.listen({ port });