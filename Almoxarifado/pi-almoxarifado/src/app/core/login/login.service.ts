import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = `${ environment.urlBase }/login`;

  constructor(
    private http: HttpClient
  ) { }

  public autenticar(dados: any) {   
    return this.http.post(this.urlBase, dados);
  }

}
