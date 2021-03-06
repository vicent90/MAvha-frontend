import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor( public http: HttpClient ) { }

  subirArchivo(id: number, archivo: File) {
    const url = URL_SERVICIOS + '/uploads/' + id;
    const formData: FormData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post(url, formData)
      .pipe( map((resp: any) => {
        return resp;
      }),
      catchError( err => {
        return throwError(err);
      })
    );
  }

  descargarArchivo( nombreArchivo: string ) {
    const url = URL_SERVICIOS + '/uploads/' + nombreArchivo;
    return this.http.get(url, {responseType: 'arraybuffer'} )
      .pipe( map((resp: any) => {
        return resp;
      }),
      catchError( err => {
        return throwError(err);
      })
    );
  }

  borrarArchivo( nombreArchivo: string ) {
    const url = URL_SERVICIOS + '/uploads/' + nombreArchivo;
    return this.http.delete(url)
      .pipe( map((resp: any) => {
        return resp;
      }),
      catchError( err => {
        return throwError(err);
      })
    );
  }
}
