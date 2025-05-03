import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { todoService } from '../services/to-do.service';
import { AuthService } from '../services/auth.service'; // Injecting the AuthService


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
type Todo = {
  _id: string;
  title: string;
  items: TodoItem[];
}
type TodoItem = {
  text: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
};

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {

  constructor(private newTodo: todoService, private authService: AuthService) { }
  title = new FormControl('');
  item = new FormControl("");
  priority = new FormControl("");
  unsavedItems: TodoItem[] = [];
  itemPriority = new FormControl('');


  showList = false;
  list: Todo[] = []

  editIndex: number | null = null;
  editText: string = '';

  startEdit(index: number, task: any) {
    this.editIndex = index;
    this.editText = task.text;
  }


  saveEdit(index: number) {
    console.log('Saving edit for index:', index, 'with text:', this.editText);
    if (this.editText.trim()) {
      this.unsavedItems[index].text = this.editText.trim();
      this.editIndex = null;
      this.editText = '';
    }
  }




  cancelEdit() {
    this.editIndex = null;
    this.editText = '';
  }

  deleteItem(index: number) {
    this.unsavedItems.splice(index, 1);
  }

  // Add item to unsavedItems list
  pushToList() {
    const value = this.item.value?.trim();
    const priorityValue = this.itemPriority.value as 'Low' | 'Medium' | 'High'; // 👈 type assertion

    if (value && priorityValue) {
      this.unsavedItems.push({
        text: value,
        completed: false,
        priority: priorityValue
      });
      this.item.setValue('');
      this.itemPriority.setValue('');
    } else {
      alert('Please enter both item text and priority.');
    }
  }




  // Save list to the backend and set the flag to true
  saveList() {
    const userId = this.authService.getUserId();  // Retrieve the logged-in user's ID
    const payload = {
      title: this.title.value?.trim() || 'Untitled',
      items: this.unsavedItems
    };


    this.newTodo.addTodo(payload).subscribe({
      next: () => {
        alert('List saved successfully!');
        this.unsavedItems = [];  // Clear unsaved items
        this.title.setValue('');  // Clear the title input
      },
      error: (err) => {
        alert('Failed to save the list.');
        console.error(err);
      }
    });

    console.log('Sending to backend:', payload);  // Log the payload for debugging
  }



  toggleCompleted(item: TodoItem) {
    item.completed = !item.completed;
  }
}
