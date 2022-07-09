#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const app = fastify_1.default();
app.get("/", (req, res) => {
    res.headers({
        "Content-Type": "text/html",
    });
    res.send("<h1>Hello world</h1>");
});
const port = 8080;
console.log(`Listening on port ${port}`);
app.listen({ port });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9leGFtcGxlcy9ub2RlanMtZXhhbXBsZS9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQThCO0FBRTlCLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUN4QixHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ1YsY0FBYyxFQUFFLFdBQVc7S0FDNUIsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBRWxCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgZmFzdGlmeSBmcm9tIFwiZmFzdGlmeVwiO1xuXG5jb25zdCBhcHAgPSBmYXN0aWZ5KCk7XG5cbmFwcC5nZXQoXCIvXCIsIChyZXEsIHJlcykgPT4ge1xuICByZXMuaGVhZGVycyh7XG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L2h0bWxcIixcbiAgfSk7XG5cbiAgcmVzLnNlbmQoXCI8aDE+SGVsbG8gd29ybGQ8L2gxPlwiKTtcbn0pO1xuXG5jb25zdCBwb3J0ID0gODA4MDtcblxuY29uc29sZS5sb2coYExpc3RlbmluZyBvbiBwb3J0ICR7cG9ydH1gKTtcbmFwcC5saXN0ZW4oeyBwb3J0IH0pOyJdfQ==