import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public tasks: Task[];
  public task: string;
  @ViewChild('inputText') input;

  constructor(private tS: TasksService) {
    this.tS.getTasks().subscribe(res => {
      this.tasks = res
    })
  }

  addTask() {
    let t = {
      task: this.task,
      status: false
    }
    this.tS.addTask(t).subscribe(res => {
      this.tasks = res
    });
    this.task = "";
    this.input.setFocus();
  }

  public removeTask(id: string) {
    this.tS.removeTask(id).subscribe(res => {
      this.tasks = res
    });
  }

  public completeTask(t: Task) {
    this.tS.completeTask(t).subscribe(res => {
      this.tasks = res
    })
  }
}