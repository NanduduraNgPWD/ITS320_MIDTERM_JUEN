import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { todoService } from '../services/to-do.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
type TodoItem = {
  text: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
};

type Todo = {
  _id: string;
  title: string;
  items: TodoItem[];
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  loading = true;
  errorMessage = '';
  constructor(private todoService: todoService, private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.todoService.Get().subscribe({
      next: (data: Todo[]) => {
        this.todoLists = data;
      },
      error: (err) => {
        console.error('Failed to fetch todo lists:', err);
      }
    });
  }



  onLogout() {
    this.authService.logout();
  }

  editingItem: { listId: string; itemIndex: number } | null = null;
  clickedItems: { [listId: string]: boolean } = {};

  todoLists: Todo[] = [];
  expandedLists: { [key: string]: boolean } = {};
  updatedItem: { listId: string; itemIndex: number } | null = null;

  showAddItemModal = false;
  currentListId: string | null = null;
  newItemText = '';
  newItemPriority: 'Low' | 'Medium' | 'High' = 'Low';



  toggleList(id: string) {
    this.expandedLists[id] = !this.expandedLists[id];
  }

  toggleCompleted(listId: string, itemIndex: number) {
    const list = this.todoLists.find(l => l._id === listId);
    if (list) {
      list.items[itemIndex].completed = !list.items[itemIndex].completed;
      this.updatedItem = { listId, itemIndex };
    }
  }

  saveCompletedStatus(listId: string) {
    const list = this.todoLists.find(l => l._id === listId);
    if (list) {
      this.todoService.updateTodo(listId, list).subscribe({
        next: () => {
          alert('Changes saved!');
          this.updatedItem = null;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to save changes.');
        }
      });
    }
  }


  enableTextEdit(listId: string, itemIndex: number) {

    this.editingItem = { listId, itemIndex };
  }


  saveUpdatedText(listId: string) {
    const list = this.todoLists.find(t => t._id === listId);
    if (list && this.editingItem) {
      const item = list.items[this.editingItem.itemIndex];

      this.todoService.updateTodo(listId, list).subscribe({
        next: () => {
          console.log('Text updated successfully');
          this.editingItem = null;
        },
        error: (err) => {
          console.error('Failed to update text', err);
        }
      });
    }
  }


  deleteItem(todoId: string, index: number) {
    this.todoService.deleteItem(todoId, index).subscribe({
      next: (res) => {

        const todo = this.todoLists.find((t) => t._id === todoId);
        if (todo) todo.items.splice(index, 1);
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      },
    });
  }
  handleClick(listId: string): void {
    this.clickedItems[listId] = true;
  }
  hasClickedItemInList(listId: string): boolean {
    return !!this.clickedItems[listId];
  }
  dropdownOpen: { [key: string]: boolean } = {};

  toggleDropdown(listId: string) {
    // Close all dropdowns except the clicked one
    for (let id in this.dropdownOpen) {
      if (id !== listId) {
        this.dropdownOpen[id] = false;
      }
    }

    this.dropdownOpen[listId] = !this.dropdownOpen[listId];
  }


  deleteList(listId: string) {
    this.todoService.deleteList(listId).subscribe({
      next: () => {
        this.todoLists = this.todoLists.filter(list => list._id !== listId);
        console.log('List deleted');
      },
      error: (err) => {
        console.error('Failed to delete list:', err);
        alert('Failed to delete list.');
      }
    });
  }


  addItemToList(listId: string) {
    this.currentListId = listId;
    this.newItemText = '';
    this.newItemPriority = 'Low';
    this.showAddItemModal = true;
  }

  closeModal() {
    this.showAddItemModal = false;
  }

  submitNewItem() {
    if (!this.newItemText.trim() || !this.currentListId) return;

    const newItem: TodoItem = {
      text: this.newItemText,
      completed: false,
      priority: this.newItemPriority,
    };

    const list = this.todoLists.find(l => l._id === this.currentListId);
    if (list) {
      list.items.push(newItem);

      // Save to backend
      this.todoService.updateTodo(this.currentListId, list).subscribe({
        next: () => {
          console.log('Item added and saved');
          this.closeModal();
        },
        error: (err) => {
          console.error('Error adding item:', err);
          alert('Failed to save item.');
        }
      });
    }
  }


}
