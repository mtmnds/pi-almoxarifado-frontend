import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from './shared/icons/icons.module';
import { LoginComponent } from './modules/geral/login/login.component';
import { IndexComponent } from './modules/geral/index/index.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SaldoComponent } from './modules/estoque/saldo/saldo.component';
import { RecebimentoComponent } from './modules/recebimento/recebimento/recebimento.component';
import { ConsultaRecebimentoComponent } from './modules/recebimento/consulta-recebimento/consulta-recebimento.component';
import { MovimentacaoComponent } from './modules/movimentacoes/movimentacao/movimentacao.component';
import { ConsultaMovimentacaoComponent } from './modules/movimentacoes/consulta-movimentacao/consulta-movimentacao.component';
import { AtendimentoComponent } from './modules/requisicoes/atendimento/atendimento.component';
import { CriarRequisicaoComponent } from './modules/requisicoes/criar-requisicao/criar-requisicao.component';
import { RequisicaoComponent } from './modules/requisicoes/requisicao/requisicao.component';
import { AcompanhamentoInventarioComponent } from './modules/inventarios/acompanhamento-inventario/acompanhamento-inventario.component';
import { InventarioComponent } from './modules/inventarios/inventario/inventario.component';
import { MaterialComponent } from './modules/cadastros/material/material.component';
import { MarcaComponent } from './modules/cadastros/marca/marca.component';
import { ModeloComponent } from './modules/cadastros/modelo/modelo.component';
import { FornecedorComponent } from './modules/cadastros/fornecedor/fornecedor.component';
import { LocalEstoqueComponent } from './modules/cadastros/local-estoque/local-estoque.component';
import { UsuarioComponent } from './modules/cadastros/usuario/usuario.component';
import { PerfilComponent } from './modules/cadastros/perfil/perfil.component';
import { AcessoComponent } from './modules/cadastros/acesso/acesso.component';
import { MenuComponent } from './modules/cadastros/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    NavbarComponent,
    SidebarComponent,
    SaldoComponent,
    RecebimentoComponent,
    ConsultaRecebimentoComponent,
    MovimentacaoComponent,
    ConsultaMovimentacaoComponent,
    AtendimentoComponent,
    CriarRequisicaoComponent,
    RequisicaoComponent,
    AcompanhamentoInventarioComponent,
    InventarioComponent,
    MaterialComponent,
    MarcaComponent,
    ModeloComponent,
    FornecedorComponent,
    LocalEstoqueComponent,
    UsuarioComponent,
    PerfilComponent,
    AcessoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
