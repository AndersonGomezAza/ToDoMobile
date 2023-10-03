import { Component } from '@angular/core';
import { Todo } from './interfaces/todo';
import { TaskService } from './providers/task.service';
import { AlertInput } from '@ionic/angular';

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
  constructor( private taskService:TaskService ) { }

  ionViewWillEnter(){
    this.taskService.getTask().then(data=>{
      this.myTasks = data;
    })
  }

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

  removeTask(id: any) {
    this.taskService.deleteTask(id).then(resp => {
      this.myTasks = resp;
    }
    );
  }

  public alertButtons = [
    {
      text: 'Cancelar', handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Guardar', handler: (e: AlertInput[]) => {
        this.alertInputs.forEach(e=>{
         return e.value = '';
        });
        const newTask = { title: e[0], description: e[1] }
        this.taskService.saveTask(newTask).then(resp => {
          this.myTasks = resp;
        });
      },
    },
  ];

  public alertInputs: AlertInput[] = [
    {
      placeholder: 'Titulo',
      id: 'title',
      value: ''
    },
    {
      placeholder: 'Descripcion',
      id: 'description',
      value: '',
      attributes: {
        maxlength: 140,
      },
    },
  ];
}
