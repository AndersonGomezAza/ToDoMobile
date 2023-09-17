import { Component } from '@angular/core';
import { Todo } from './interfaces/todo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Declaracion de variables
  isModalOpen = false;
  idTask = 0;
  modelIdTask = 0;
  myTasks: Todo[] = [];

  // Constructor
  constructor() { }

  // Metodos ToDo Funcionalidades
  addTask() {
    this.alertInputs = [
      {
        placeholder: 'Titulo',
      },
      {
        placeholder: 'Descripcion',
        attributes: {
          maxlength: 140,
        },
      },
    ];
  }

  detailTask(itemTask){
    this.isModalOpen = !this.isModalOpen;
    this.modelIdTask = this.myTasks.indexOf(itemTask);
  }

  removeTask(idTask){
    this.myTasks = this.myTasks.filter(task => task.id !== idTask);
  }

  public alertButtons = [
    {
      text: 'Cancelar', handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Guardar', handler: (e: any) => {
        this.myTasks.push({ id: this.idTask, title: e[0], description: e[1], isDone: false });
        this.idTask++;
      },
    },
  ];

  public alertInputs = [
    {
      placeholder: 'Titulo',
    },
    {
      placeholder: 'Descripcion',
      attributes: {
        maxlength: 140,
      },
    },
  ];
}
