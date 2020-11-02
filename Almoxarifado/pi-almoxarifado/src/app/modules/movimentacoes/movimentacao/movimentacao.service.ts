import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  private urlBase = `${ environment.urlBase }/movimentacao`;

  constructor(
    private http: HttpClient
  ) { }

  public movimentarSaldo(dados: any) {   
    return this.http.post(this.urlBase, dados);
  }

}

