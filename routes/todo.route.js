const express = require("express");
const router = express.Router();

const {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
} = require("../controllers/todo.controller");

const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, getAllTodo);
router.get("/:id", verifyToken, getTodoById);
router.post("/", verifyToken, createTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.delete("/", verifyToken, deleteAllTodo);

module.exports = router;
