import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../providers/todo.service';
import { MatDialog } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  showSpinner = false;
  descripcion = '';
  id = null;
  todos: TodoModel[];

  constructor(
    public todoService: TodoService,
    public dialog: MatDialog,
    public notif: NotificationsService
  ) { }

  ngOnInit() {
    this.obtenerTodos();
  }

  obtenerTodos = () => {
    this.todoService.obtenerTodos()
      .subscribe( resp => {
        console.log(resp);
        this.todos = resp;
      });
  }

  eliminar(id: number) {
    this.showSpinner = true;
    const dialogConfRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogConfRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.todoService.borrarTodo( id )
          .subscribe( resp => {
            this.showSpinner = false;
            console.log(resp);
            this.obtenerTodos();
            this.notif.success(resp.message);
          },
          (error) => {
            this.showSpinner = false;
            this.notif.error(error.error.message);
            console.error(error);
          }
          );
      } else { this.showSpinner = false; }
    });
  }
}
