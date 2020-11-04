import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './core/index/index.component';
import { LoginComponent } from './core/login/login.component';
import { FornecedorComponent } from './modules/cadastros/fornecedor/fornecedor.component';
import { LocalEstoqueComponent } from './modules/cadastros/local-estoque/local-estoque.component';
import { MarcaComponent } from './modules/cadastros/marca/marca.component';
import { MaterialComponent } from './modules/cadastros/material/material.component';
import { ModeloComponent } from './modules/cadastros/modelo/modelo.component';
import { UsuarioComponent } from './modules/cadastros/usuario/usuario.component';
import { SaldoComponent } from './modules/estoque/saldo/saldo.component';
import { AcompanhamentoInventarioComponent } from './modules/inventarios/acompanhamento-inventario/acompanhamento-inventario.component';
import { InventarioComponent } from './modules/inventarios/inventario/inventario.component';
import { ConsultaMovimentacaoComponent } from './modules/movimentacoes/consulta-movimentacao/consulta-movimentacao.component';
import { MovimentacaoComponent } from './modules/movimentacoes/movimentacao/movimentacao.component';
import { ConsultaRecebimentoComponent } from './modules/recebimento/consulta-recebimento/consulta-recebimento.component';
import { RecebimentoComponent } from './modules/recebimento/recebimento/recebimento.component';
import { AtendimentoComponent } from './modules/requisicoes/atendimento/atendimento.component';
import { CriarRequisicaoComponent } from './modules/requisicoes/criar-requisicao/criar-requisicao.component';
import { DetalheRequisicaoComponent } from './modules/requisicoes/detalhe-requisicao/detalhe-requisicao/detalhe-requisicao.component';
import { RequisicaoComponent } from './modules/requisicoes/requisicao/requisicao.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},

  // Estoque
  { path: "saldo", component: SaldoComponent },

  // Recebimento
  { path: "recebimento", component: RecebimentoComponent },
  { path: "consulta-recebimento", component: ConsultaRecebimentoComponent },

  // Movimentações
  { path: "movimentacao", component: MovimentacaoComponent },
  { path: "consulta-movimentacao", component: ConsultaMovimentacaoComponent },

  // Requisições
  { path: "atendimento/:idRequisicao", component: AtendimentoComponent },
  { path: "criar-requisicao", component: CriarRequisicaoComponent },
  { path: "consulta-requisicao", component: RequisicaoComponent },
  { path: "detalhe-requisicao/:idRequisicao", component: DetalheRequisicaoComponent },

  // Inventários
  { path: "acompanhamento-inventario", component: AcompanhamentoInventarioComponent },
  { path: "inventario", component: InventarioComponent },

  // Cadastros
  { path: "material", component: MaterialComponent },
  { path: "marca", component: MarcaComponent },
  { path: "modelo", component: ModeloComponent },
  { path: "fornecedor", component: FornecedorComponent },
  { path: "local-estoque", component: LocalEstoqueComponent },
  { path: "usuario", component: UsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
