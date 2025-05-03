
import Todo from '../models/todoModel.js'

async function createTodo(req, res) {
  const { title, items } = req.body;

  if (!title || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Please provide a title and a non-empty list of items.');
  }

  try {
    const newTodo = await Todo.create({
      title,
      items,
      owner: req.user.userId, // store the owner's userId from the token
    });

    return res.status(201).json({ message: 'Todo created successfully', data: newTodo });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error while creating todo');
  }
}



async function getTodo(req, res) {
  try {
    const todos = await Todo.find({ owner: req.user.userId });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// async function updateTodo(req, res) {
//   const { id } = req.params;
//   const { items } = req.body;

//   if (!items || !Array.isArray(items) || items.length === 0) {
//     return res.status(400).send('Please provide a non-empty list of items.');
//   }

//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       id,
//       { items, updatedAt: new Date() }, // you can also update other fields here
//       { new: true, runValidators: true }
//     );

//     if (!updatedTodo) {
//       return res.status(404).send('Todo not found');
//     }

//     return res.status(200).json({ message: 'Todo successfully updated', data: updatedTodo });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send('Error while updating todo');
//   }
// }
async function updateTodo(req, res) {
  const { id } = req.params;
  const { title, items } = req.body;

  if (!title || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Please provide a title and a non-empty list of items.');
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, items },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).send('Todo not found');
    }

    return res.status(200).json({ message: 'Todo updated successfully', data: updatedTodo });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error while updating todo');
  }
}

// DELETE
async function deleteTodo(req, res) {
  const { id, itemIndex } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).send('Todo not found');

    todo.items.splice(itemIndex, 1);
    await todo.save();

    res.status(200).json({ message: 'Item deleted successfully', data: todo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item');
  }
}

async function deleteTodoList(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send('Todo list not found');

    res.status(200).json({ message: 'Todo list deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting todo list');
  }
}


export {createTodo, getTodo, updateTodo, deleteTodo, deleteTodoList};