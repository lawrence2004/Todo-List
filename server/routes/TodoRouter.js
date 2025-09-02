import express from "express";
import { Todo } from "../models/todoModel.js";

const router = express.Router();

// router.use((req, res, next) => {
//   console.log("Request URL:", req.originalUrl);
//   next();
// });

router.get("/", async (req, res) => {
    try {

        let { page = 1, limit = 5 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const todos = await Todo.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            page,
            limit,
            data: todos
        });
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        if(!req.body.task || req.body.task == "") {
            res.status(400).send({ message : "Task cannot be empty"});
        }

        const todo = await Todo.create(req.body);
        res.status(201).send("Todo Created");
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        if(!req.body.task || req.body.task == "") {
            res.status(400).send({ message : "Task cannot be empty"});
        }

        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: "Todo updated sucessfully"});
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/:id/toggle", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.done = !todo.done;
    await todo.save();

    res.status(200).json({ message: "Todo toggled", todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});



router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id, req.body);

        if(!todo) res.status(404).send({ mesaage: "Todo not found"});
        res.status(200).send({ message: "Todo deleted sucessfully"});
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


export { router as todoRouter }