import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { saveAs } from 'file-saver';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { STATUS } from '../../config/config';
import { CrearTodosComponent } from './crear-todos.component';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../providers/todo.service';
import { FileService } from '../../providers/file.service';

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
    public fileService: FileService,
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
        const mensaje = error.error.mensaje ? error.error.mensaje : 'Error conexión con el servidor';
        this.notif.error(mensaje);
      });
  }

  crearTodo() {
    const dialogCrearRef = this.dialog.open(CrearTodosComponent);
    dialogCrearRef.afterClosed().subscribe(result => {
      if (result) { this.obtenerTodos(); }
    });
  }

  eliminar(id: number, archivo: string) {
    this.showSpinner = true;
    const dialogConfRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Esta seguro que desea borrar la tarea?'
    });
    dialogConfRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.todoService.borrarTodo( id )
          .subscribe( resp => {
            this.fileService.borrarArchivo(archivo).subscribe(
              (res) => {
                this.showSpinner = false;
                this.obtenerTodos();
                this.notif.success(resp.mensaje);
              },
              (err) => {
                this.showSpinner = false;
                const mensaje = err.error.mensaje ? err.error.mensaje : 'Error conexión con el servidor';
                this.notif.error(mensaje);
              }
            );
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

  descargarArchivo(archivo: string, nombreArchivo: string) {
    this.showSpinner = true;
    this.fileService.descargarArchivo(archivo)
      .subscribe(
        (resp) => {
          this.showSpinner = false;
          const blob = new Blob([resp]);
          const url = window.URL.createObjectURL(blob);
          saveAs(blob, nombreArchivo);
          // window.open(url);
        },
        (error) => {
          this.showSpinner = false;
          const mensaje = error.error.mensaje ? error.error.mensaje : 'Error conexión con el servidor';
          this.notif.error(mensaje);
        }
      );
  }
}
