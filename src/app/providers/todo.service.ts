import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor( private http: HttpClient ) { }

  crearTodo(data: any) {
    const url = URL_SERVICIOS + '/todos';
    return this.http.post( url, data )
      .pipe( map((resp: any) => {
        return resp;
      }),
      catchError( err => {
        return throwError(err);
      })
    );
  }

  obtenerTodos() {
    const url = URL_SERVICIOS + '/todos';
    return this.http.get( url )
      .pipe( map((resp: any) => {
        return resp;
      }),
      catchError( err => {
        return throwError(err);
      })
    );
  }

  borrarTodo( id: number ) {
    const url = URL_SERVICIOS + '/todos/' + id;
    return this.http.delete( url )
      .pipe( map((resp: any) => {
        return resp;
      }),
      catchError( err => {
        return throwError(err);
      })
    );
  }


}
