import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { PerfilAcessoComponent } from './perfil-acesso/perfil-acesso.component';



@NgModule({
  declarations: [UsuarioComponent, PerfilAcessoComponent],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }
