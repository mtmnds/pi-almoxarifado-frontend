import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalEstoqueService {

  private urlBase = `${ environment.urlBase }/localEstoque`;

  constructor(
    private http: HttpClient
  ) { }

  public cadastrar(dados: any) {   
    return this.http.post(this.urlBase, dados);
  }

  public alterar(dados: any) {   
    return this.http.put(this.urlBase, dados);
  }

  public desativar(id: number) {   
    return this.http.delete(`${ this.urlBase }/${ id }`);
  }

  public buscar(id: number) {   
    return this.http.get(`${ this.urlBase }/${ id }`);
  }

  public listarTodos() {   
    return this.http.get(this.urlBase);
  }
  
}
