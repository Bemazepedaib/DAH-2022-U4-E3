import { Injectable } from '@angular/core';
import { Task } from "../models/task";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];

  constructor(private firestore: AngularFirestore) {
    this.getTasks().subscribe(res => {
      this.tasks = res
    })
  }

  public getTasks(): Observable<Task[]> {
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getTask(id: string): Observable<Task> {
    return this.firestore.collection('tasks').doc(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Task
        const id = a.payload.id;
        return { id, ...data };
      })
    )
  }

  public addTask(t: Task): Observable<Task[]>{
    this.firestore.collection('tasks').add(t);
    return this.getTasks();
  }
  public updateTask(id: string, t: Task): Observable<Task[]>{
    this.firestore.doc('tasks/'+ id).update(t);
    return this.getTasks();
  }
  public removeTask(id: string): Observable<Task[]>{
    this.firestore.doc('tasks/'+ id).delete();
    return this.getTasks();
  }
  public completeTask(t: Task): Observable<Task[]>{
    let t1 = {
      task: t.task,
      status: true
    }
    return this.updateTask(t.id, t1);
  }
  public decompleteTask(t: Task): Observable<Task[]>{
    let t1 = {
      task: t.task,
      status: false
    }
    return this.updateTask(t.id, t1);
  }
}
