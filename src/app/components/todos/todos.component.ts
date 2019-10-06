import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { STATUS } from '../../config/config';
import { CrearTodosComponent } from './crear-todos.component';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../providers/todo.service';

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
  estados: string[];

  constructor(
    public todoService: TodoService,
    public dialog: MatDialog,
    public notif: NotificationsService
  ) { }

  ngOnInit() {
    this.estados = STATUS.concat('todas');
    this.obtenerTodos();

  }

  obtenerTodos = () => {
    this.todoService.obtenerTodos()
      .subscribe( resp => {
        this.todos = resp;
      },
      (error) => {
        this.notif.error('Error de comunición con el servidor');
      });
  }

  crearTodo() {
    const dialogCrearRef = this.dialog.open(CrearTodosComponent);
    dialogCrearRef.afterClosed().subscribe(result => {
      if (result) { this.obtenerTodos(); }
    });
  }

  eliminar(id: number) {
    this.showSpinner = true;
    const dialogConfRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Esta seguro que desea borrar la tarea?'
    });
    dialogConfRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.todoService.borrarTodo( id )
          .subscribe( resp => {
            this.showSpinner = false;
            this.obtenerTodos();
            this.notif.success(resp.mensaje);
          },
          (error) => {
            this.showSpinner = false;
            const mensaje = error.error.mensaje ? error.error.mensaje : 'Error conexión con el servidor';
            this.notif.error(mensaje);
          }
          );
      } else { this.showSpinner = false; }
    });
  }

  cambiarEstado(id: number, estado: string ) {
    this.showSpinner = true;
    estado === 'pendiente' ? estado = 'resuelta' : estado = 'pendiente';
    this.todoService.actualizarEstadoTodo( id, estado )
      .subscribe(
        (resp) => {
          this.showSpinner = false;
          this.notif.success('Se cambió el estado de la tarea');
          this.obtenerTodos();
        },
        (error) => {
          this.showSpinner = false;
          const mensaje = error.error.mensaje ? error.error.mensaje : 'Error conexión con el servidor';
          this.notif.error(mensaje);
        }
      );
  }
}
