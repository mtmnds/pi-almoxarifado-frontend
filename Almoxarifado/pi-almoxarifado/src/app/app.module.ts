import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from './shared/modules/icons/icons.module';
import { LoginComponent } from './core/login/login.component';
import { NavbarComponent } from './shared/modules/navbar/navbar.component';
import { IndexComponent } from './core/index/index.component';
import { SidebarComponent } from './shared/modules/sidebar/sidebar.component';
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
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PerfilAcessoComponent } from './modules/cadastros/usuario/perfil-acesso/perfil-acesso.component';
import { DetalheRequisicaoComponent } from './modules/requisicoes/detalhe-requisicao/detalhe-requisicao/detalhe-requisicao.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DetalheInventarioComponent } from './modules/inventarios/detalhe-inventario/detalhe-inventario/detalhe-inventario.component';
import { ContagemComponent } from './modules/inventarios/contagem/contagem.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    IndexComponent,
    NavbarComponent,
    LoginComponent,
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
    PerfilAcessoComponent,
    DetalheRequisicaoComponent,
    DetalheInventarioComponent,
    ContagemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    IconsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
