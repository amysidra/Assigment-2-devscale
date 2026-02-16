import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createProductSchema } from "./schema";

export const productRouter = new Hono()

    .get("/", (c) => {
        const token = c.req.header("token")

        if(!token) {
            return c.json({message: "anda tidak berhak di halaman ini"})
        }

        return c.json({message: "get all products", token})
    })

    .get("/:id", (c) => {
        return c.json({message: "get a product by ID"})
    })

    .post("/", zValidator("json", createProductSchema), (c) => {
        const body = c.req.valid("json")

        return c.json({message: "product telah dibuat", body})

    } )

