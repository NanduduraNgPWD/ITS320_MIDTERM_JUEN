import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  items: [
    {
      text: String,
      priority: String,
      completed: Boolean
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  });
  

export default mongoose.model('Todo', todoSchema);