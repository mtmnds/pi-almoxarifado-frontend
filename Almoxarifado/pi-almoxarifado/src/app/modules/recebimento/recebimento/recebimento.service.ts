import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecebimentoService {

  private urlBase = `${ environment.urlBase }/recebimento`;

  constructor(
    private http: HttpClient
  ) { }

  public gerar(dados: any) {   
    return this.http.post(this.urlBase, dados);
  }
}
