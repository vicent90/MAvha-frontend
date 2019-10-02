import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/providers/todo.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { STATUS } from '../../config/config';

@Component({
  selector: 'app-crear-todos',
  templateUrl: './crear-todos.component.html',
  styleUrls: []
})
export class CrearTodosComponent implements OnInit {

  estados: string[];
  forma: FormGroup;
  showSpinner = false;

  constructor(
    public todoService: TodoService,
    public dialogRef: MatDialogRef<CrearTodosComponent>,
    private notif: NotificationsService
  ) { }

  ngOnInit() {
    this.estados = STATUS;
    console.log(STATUS);
    this.forma = new FormGroup({
      descripcion: new FormControl( null, Validators.required),
      estado: new FormControl( null )
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  crearTodo() {
    if ( this.forma.status === 'INVALID' ) { return; }
    this.showSpinner = true;
    const nuevoTodo = this.forma.value;
    this.todoService.crearTodo( nuevoTodo )
      .subscribe(
        (resp) => {
          this.showSpinner = false;
          this.notif.success(resp.message);
          console.log(resp);
          this.dialogRef.close(true);
        },
        (error) => {
          this.showSpinner = false;
          this.dialogRef.close(true);
          this.notif.error(error.error.message, error.error.errors.message);
          console.error(error);
        }
      );
  }
}
