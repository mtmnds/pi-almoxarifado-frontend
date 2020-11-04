import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  private urlBase = `${ environment.urlBase }/estoque`;

  constructor(
    private http: HttpClient
  ) { }

  public listarTodos() {
    return this.http.get(this.urlBase);
  }
}
