const Todo = require('../models/todo');

module.exports = {
  getAllTodo: async (req, res) => {
    try {
      const user = req.user;

      const todos = await Todo.find({ userID: user.id }).populate("userID", ["_id", "name"]);

      res.json({
        message: "Berhasil mendapatkan data todo",
        data: todos
      });
    } catch (error) {
      console.error("Kesalahan pada getAllTodo:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id).populate("userID", ["_id", "name"]);

      if (!todo) {
        return res.status(404).json({ message: "Todo tidak ditemukan" });
      }

      res.json({
        message: "Berhasil mendapatkan detail todo",
        data: todo
      });
    } catch (error) {
      console.error("Kesalahan pada getTodoById:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },

  createTodo: async (req, res) => {
    try {
      const data = req.body;
      const user = req.user;

      const newTodo = await Todo.create({ ...data, userID: user.id });

      res.json({
        message: "Berhasil membuat data todo",
        data: newTodo
      });
    } catch (error) {
      console.error("Kesalahan pada createTodo:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },

  updateTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!todo) {
        return res.status(404).json({ message: "Todo tidak ditemukan" });
      }

      res.json({
        message: "Berhasil mengubah data todo",
        data: todo
      });
    } catch (error) {
      console.error("Kesalahan pada updateTodo:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);

      if (!todo) {
        return res.status(404).json({ message: "Todo tidak ditemukan" });
      }

      res.json({
        message: "Berhasil menghapus data todo",
        data: todo
      });
    } catch (error) {
      console.error("Kesalahan pada deleteTodo:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },

  deleteAllTodo: async (req, res) => {
    try {
      const user = req.user;

      const result = await Todo.deleteMany({ userID: user.id });

      res.json({
        message: "Berhasil menghapus semua data todo",
        data: result
      });
    } catch (error) {
      console.error("Kesalahan pada deleteAllTodo:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },
};
