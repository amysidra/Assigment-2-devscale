import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { productRouter } from "./modules/products/router";
import { reviewRouter } from "./modules/reviews/router";
import { todosRouter } from "./modules/todos/router";

const app = new Hono()

  .route("/products", productRouter)
  .route("/reviews", reviewRouter)
  .route("/todos", todosRouter);

app.get("/", (c) => {
  return c.json({ Message: "Ahlan wa sahlan, Amy Sidra" }, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
