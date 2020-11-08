import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private urlBase = `${ environment.urlBase }/inventario`;

  constructor(
    private http: HttpClient
  ) { }

  public criar(dados: any) {   
    return this.http.post(this.urlBase, dados);
  }

  public alterar(dados: any) {   
    return this.http.put(this.urlBase, dados);
  }

  public cancelar(id: number) {   
    return this.http.delete(`${ this.urlBase }/${ id }`);
  }

  public aprovar(dados: any) {   
    return this.http.post(`${ this.urlBase }/aprovacao`, dados);
  }

  public reprovar(dados: any) {   
    return this.http.post(`${ this.urlBase }/reprovacao`, dados);
  }

  public buscar(id: number) {   
    return this.http.get(`${ this.urlBase }/${ id }`);
  }
}
