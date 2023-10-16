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
  isAlertOpen = false;
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
    this.isAlertOpen = !this.isAlertOpen;
    this.alertInputs = [
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
      }
    ]
    this.alertButtons = [
      {
        text: 'Cancelar', handler: () => {
          console.log('Alert canceled');
          this.isAlertOpen = false;
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
    ]
  }

  detailTask(itemTask){
    this.isModalOpen = !this.isModalOpen;
    this.modelIdTask = this.myTasks.indexOf(itemTask);
  }

  editTask(id: any){
    var task = this.taskService.getTaskId(id);
    this.isAlertOpen = !this.isAlertOpen;
    this.alertInputs = [
      {
        placeholder: 'Titulo',
        value: task[0].title,
      },
      {
        placeholder: 'Descripcion',
        value: task[0].description,
        attributes: {
          maxlength: 140,
        },
      },
    ];

    this.alertButtons = [
      {
        text: 'Cancelar', handler: () => {
          console.log('Alert canceled');
          this.isAlertOpen = false;
        },
      },
      {
        text: 'Actualizar', handler: (e: AlertInput[]) => {
          const editTask = { title: e[0], description: e[1], isDone: false }
          this.taskService.updateTask(task[0].id, editTask).then(resp => {
            this.myTasks = resp;
          });
        },
      },
    ]
  }

  doneTask(id: any){
    var task = this.taskService.getTaskId(id);
    task[0].isDone = !task[0].isDone;
    this.taskService.updateTask(task[0].id, task[0]).then(resp => {
      this.myTasks = resp;
    });
  }

  removeTask(id: any) {
    this.taskService.deleteTask(id).then(resp => {
      this.myTasks = resp;
    }
    );
  }



  public alertButtons = [];

  public alertInputs: AlertInput[] = [];
}
