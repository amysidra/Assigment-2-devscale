import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../utils/prisma";
import { createTodoSchema } from "./schema";

export const todosRouter = new Hono()

  // get all todos
  .get("/", async (c) => {
    const todos = await prisma.todo.findMany();

    if (todos.length === 0 ) {
      return c.json({ message: "tidak ada datanya, bang!" }, 404);
    }

    return c.json(todos);
  })

  // get a todo by ID
  .get("/:id", async (c) => {
    const todoID = c.req.param("id");
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(todoID),
      },
    });

    if (!todo) {
      return c.json({ message: "data engga ada, bro!" }, 404);
    }

    return c.json(todo);
  })

  // add a todo
  .post("/", zValidator("json", createTodoSchema), async (c) => {
    const body = c.req.valid("json");
    try{
      const newTodo = await prisma.todo.create({
        data: body,
      });

      return c.json(newTodo, 201);
    }catch (error) {
      return c.json({message: "Tidak berhasil input data", error}, 500)
    }
    
  })

  // delete a todo
  .delete("/:id", async (c) => {
    const todoID = c.req.param("id");

    try {
      const delTodo = await prisma.todo.delete({
        where: {
          id: Number(todoID),
        },
      });

      return c.json(delTodo, 200);
    } catch (error) {
      return c.json({ message: "gagal delete data", error }, 404);
    }
  })

  // update a todo by ID
  .put("/:id", zValidator("json", createTodoSchema), async (c) => {
    const todoID = c.req.param("id");
    const body = c.req.valid("json");
    try {
      const todoUpdate = await prisma.todo.update({
        where: {
          id: Number(todoID),
        },
        data: body,
      });

      return c.json(todoUpdate);
    } catch (error) {
      c.json({message: "tidak bisa update data", error}, 500);
    }
  });
