import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../providers/todo.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { STATUS } from '../../config/config';
import { FileService } from '../../providers/file.service';

@Component({
  selector: 'app-crear-todos',
  templateUrl: './crear-todos.component.html',
  styleUrls: []
})
export class CrearTodosComponent implements OnInit {

  estados: string[];
  forma: FormGroup;
  showSpinner = false;
  archivoSubir: File;
  nombreArchivo: string;

  constructor(
    public todoService: TodoService,
    public fileService: FileService,
    public dialogRef: MatDialogRef<CrearTodosComponent>,
    private notif: NotificationsService
  ) { }

  ngOnInit() {
    this.estados = STATUS;
    this.nombreArchivo = '';
    this.forma = new FormGroup({
      descripcion: new FormControl( null, Validators.required),
      archivo: new FormControl( null, Validators.required),
      estado: new FormControl( null )
    });
  }

  seleccionarArchivo( event ) {
    const reader = new FileReader();
    if (!event.target.files || !event.target.files.length) { return; }
    this.showSpinner = true;
    const archivo = event.target.files[0];
    this.archivoSubir = archivo;
    reader.readAsDataURL( archivo );
    reader.onloadend = () => this.forma.value.archivo = reader.result as string;
    this.showSpinner = false;
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  crearTodo() {
    if ( this.forma.status === 'INVALID' ) { return; }
    this.showSpinner = true;
    const nuevoTodo = this.forma.value;
    if (this.forma.value.estado === null) { nuevoTodo.estado = STATUS[0]; }
    this.todoService.crearTodo( nuevoTodo )
      .subscribe(
        (resp) => {
          this.fileService.subirArchivo( resp._id, this.archivoSubir, this.archivoSubir.name)
            .subscribe(
              (res) => {
                this.showSpinner = false;
                this.dialogRef.close(true);
                this.notif.success(res.mensaje);
              },
             (err) => {
                this.todoService.borrarTodo(resp._id).subscribe();
                this.showSpinner = false;
                this.dialogRef.close(true);
                const mensaje = err.error.mensaje ? err.error.mensaje : 'Error conexión con el servidor';
                this.notif.error(mensaje);
              }
            );
        },
        (error) => {
          this.showSpinner = false;
          this.dialogRef.close(true);
          const mensaje = error.error.mensaje ? error.error.mensaje : 'Error conexión con el servidor';
          this.notif.error(mensaje);
        }
      );
  }
}
