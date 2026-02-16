import { Hono } from "hono";

export const reviewRouter = new Hono()

    .get("/", (c) => {
        return c.json({message: "get all reviews"})
    })

    .get("/:id", (c) => {
        return c.json({message: "get a review by ID"})
    })

    