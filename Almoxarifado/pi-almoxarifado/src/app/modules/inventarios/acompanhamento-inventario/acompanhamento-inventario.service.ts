import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoInventarioService {

  private urlBase = `${ environment.urlBase }/inventario`;
  constructor(
    private http: HttpClient
  ) { }

    
  public listarTodos() {   
    return this.http.get(this.urlBase);
  }
}
