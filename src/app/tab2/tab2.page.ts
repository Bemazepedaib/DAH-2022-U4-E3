import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public tasks: Task[];
  public task: string;

  constructor(private tS:TasksService){
    this.tS.getTasks().subscribe(res => {
      this.tasks = res
    })
  }

  public decompleteTask(t: Task) {
    this.tS.decompleteTask(t).subscribe(res => {
      this.tasks = res
    })
  }
}
