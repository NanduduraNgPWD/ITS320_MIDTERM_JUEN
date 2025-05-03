import { createTodo, getTodo, updateTodo, deleteTodo, deleteTodoList } from "../controller/todoController.js";
import e from "express";
import authenticateToken from '../middleware/auth.js';
import Todo from '../models/todoModel.js';  // Make sure to import Todo model here!

export const router = e.Router();

router.post('/create', authenticateToken, createTodo);
router.get('/', authenticateToken, getTodo);
router.put('/:id', updateTodo);
router.delete('/:id/item/:itemIndex', deleteTodo);
router.delete('/:id', deleteTodoList);

router.get('/my', authenticateToken, async (req, res) => {
    try {
        // Query for the todos owned by the user (based on the userId decoded from token)
        const todos = await Todo.find({ owner: req.user.userId });  // This will retrieve only the todos for the logged-in user
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving user todos');
    }
});
