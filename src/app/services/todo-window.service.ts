import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoWindowService {

  private _showAddTodo = new BehaviorSubject<boolean>(false);
  _todos = new BehaviorSubject<any[]>([]);

  showAddTodo = this._showAddTodo.asObservable();
  todos$ = this._todos.asObservable();

  constructor() { }

  /**
   * This function retrieves the stored data from localstorage.
   * Other components can access the data with the help of this.
   */
  fetchTodos(): any[] {
    console.log("FETCHED")
    const todosString = localStorage.getItem('todos');
    return todosString ? JSON.parse(todosString) : [];
  }

  /**
   * After adding a new todo the window should disappear and register as closed
   * @param visible - window visibility
   */
  toggleAddTodoVisibility(visible?: boolean) {
    if (visible !== undefined) {
      this._showAddTodo.next(visible);
    } else {
      this._showAddTodo.next(!this._showAddTodo.value);
    }
  }

  addTodo(todo: any): void {
    const todos = this.fetchTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.updateTodos(todos);
  }

  removeTodo(todo: any): void {
    let todos = this.fetchTodos();
    todos = todos.filter((t: any) => t.id !== todo.id);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.updateTodos(todos);
  }

  private updateTodos(todos: any[]): void {
    this._todos.next(todos);
  }
}
