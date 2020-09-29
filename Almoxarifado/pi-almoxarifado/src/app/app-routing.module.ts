import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/geral/login/login.component';
import { IndexComponent } from './modules/geral/index/index.component';
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
import { MenuComponent } from './modules/cadastros/menu/menu.component';


const routes: Routes = [
  // Geral
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "index", component: IndexComponent },

  // Estoque
  { path: "saldo", component: SaldoComponent },

  // Recebimento
  { path: "recebimento", component: RecebimentoComponent },
  { path: "consulta-recebimento", component: ConsultaRecebimentoComponent },

  // Movimentações
  { path: "movimentacao", component: MovimentacaoComponent },
  { path: "consulta-movimentacao", component: ConsultaMovimentacaoComponent },

  // Requisições
  { path: "atendimento", component: AtendimentoComponent },
  { path: "criar-requisicao", component: CriarRequisicaoComponent },
  { path: "requisicao", component: RequisicaoComponent },

  // Inventários
  { path: "acompanhamento-inventario", component: AcompanhamentoInventarioComponent },
  { path: "inventario", component: InventarioComponent },

  // Cadastros
  { path: "material", component: MaterialComponent },
  { path: "marca", component: MarcaComponent },
  { path: "modelo", component: ModeloComponent },
  { path: "fornecedor", component: FornecedorComponent },
  { path: "local-estoque", component: LocalEstoqueComponent },
  { path: "usuario", component: UsuarioComponent },
  { path: "menu", component: MenuComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
