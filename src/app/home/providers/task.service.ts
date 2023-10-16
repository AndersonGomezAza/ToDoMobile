import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo'
import { Storage } from '@ionic/storage'

@Injectable({
    providedIn: 'root'
})
export class TaskService {
  tasks: Todo[] = [];
  constructor(private storage: Storage) {
      this.getTask().then(data => {
          this.tasks = data == null ? [] : data;
      })
  }

  public getTask(): Promise<Todo[]> {
      return this.storage.get('tasks');
  }

  public saveTask(t: any): Promise<Todo[]> {
      if (t.id == undefined) {
          const newTask = { id: Date.now(), title: t.title, description: t.description, isDone: false }
          this.tasks.push(newTask);
      }
      return this.storage.set('tasks', this.tasks);
  }

  public getTaskId(id: number): Todo[] {
    return this.tasks.filter(t => t.id == id);
  }

  public updateTask(id: number, task:any): Promise<Todo[]> {
    this.tasks.map(function(t){
      if(t.id == id){
        t.title = task.title;
        t.description = task.description;
        t.isDone = task.isDone;
      }
    });
    return this.storage.set('tasks', this.tasks);
  }

  public deleteTask(id: number): Promise<Todo[]> {
    this.tasks = this.tasks.filter(t => t.id != id);
    return this.storage.set('tasks', this.tasks);
  }
}
