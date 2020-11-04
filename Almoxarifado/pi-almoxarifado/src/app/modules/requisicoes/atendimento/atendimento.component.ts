import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalEstoqueService } from '../../cadastros/local-estoque/local-estoque.service';
import { MovimentacaoService } from '../../movimentacoes/movimentacao/movimentacao.service';
import { RequisicaoService } from '../requisicao.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {

  public itensRequisicao;
  public displayedColumns: string[] = ["codigoMaterial", "nomeMaterial", "marcaMaterial", "modeloMaterial", "quantidade", "localEstoque"];
  public dataSource;
  public requisicao;
  public locaisEstoque;
  public movimentacoes = {};
  public localEstoqueDestino;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private requisicaoService: RequisicaoService,
    private localEstoqueService: LocalEstoqueService,
    private movimentacaoService: MovimentacaoService,
    private router: Router
  ) { }


  ngOnInit(): void {
    var idRequisicao = Number(this.route.snapshot.paramMap.get("idRequisicao"));

    this.requisicaoService.buscar(idRequisicao).subscribe(data => {
      this.requisicao = data;
      this.itensRequisicao = this.requisicao.itens;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.itensRequisicao);

      var nomeLocal = `estoque_tecnico_${ this.requisicao.solicitante.id }`;
      this.localEstoqueService.buscarEstoqueTecnico(nomeLocal).subscribe(dados => {
        if (dados) {
          this.localEstoqueDestino = dados;
        }
        else {
          this.localEstoqueService.cadastrar({
            nome: nomeLocal,
            descricao: `Estoque do técnico: ${ this.requisicao.solicitante.id }`
          }).subscribe(localCadastrado => {
            if (localCadastrado) {
              this.localEstoqueDestino = localCadastrado;
            }
          });
        }
      });
    });

    var locais;

    this.localEstoqueService.listarTodos().subscribe(data => {
      locais = data;

      this.locaisEstoque = [];

      locais.forEach(element => {
        if (!element.nome.includes("estoque_tecnico_")) {
          this.locaisEstoque.push(element);
        }
      });
    });
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.itensRequisicao);
    this.table.renderRows();
  }


  public formatarData(data: string) {
    const d = new Date(data);
    const ye = new Intl.DateTimeFormat('pt', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('pt', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('pt', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
  }


  public aprovarRequisicao() {
    var aprovacaoRequisicaoDto = {
      idRequisicao: this.requisicao.id,
      idUsuarioAtendente: JSON.parse(sessionStorage.getItem("dadosUsuario")).id
    };

    this.requisicaoService.aprovar(aprovacaoRequisicaoDto).subscribe(dados => {
      Object.entries(this.movimentacoes).forEach(element => {
        var item: any = element[1];

        var movimentacaoDto = {
          material: item.requisicao.material,
          localOrigem: item.localEstoqueOrigem,
          localDestino: item.localEstoqueDestino,
          quantidade: item.requisicao.quantidade,
          usuarioMovimentacao: JSON.parse(sessionStorage.getItem("dadosUsuario"))
        };

        this.movimentacaoService.movimentarSaldo(movimentacaoDto).subscribe(movimentacao => {});
      });

      this.router.navigate([`/consulta-requisicao`]);
    });

  }


  public reprovarRequisicao() {
    var aprovacaoRequisicaoDto = {
      idRequisicao: this.requisicao.id,
      idUsuarioAtendente: JSON.parse(sessionStorage.getItem("dadosUsuario")).id
    };

    this.requisicaoService.reprovar(aprovacaoRequisicaoDto).subscribe(dados => {
      this.router.navigate([`/consulta-requisicao`]);
    });

  }


  public selecionaLocalEstoque(idLocalEstoqueOrigem, idLinha) {
    var localEstoqueOrigem;

    this.locaisEstoque.forEach(element => {
      if (element.id === Number(idLocalEstoqueOrigem)) {
        localEstoqueOrigem = element;
      }
    });

    this.dataSource.data.forEach(element => {
      if (element.id === idLinha) {
        this.movimentacoes[Number(element.id)] = {
          requisicao: element,
          localEstoqueOrigem: localEstoqueOrigem,
          localEstoqueDestino: this.localEstoqueDestino,
          solicitante: this.requisicao.solicitante,
          atendente: JSON.parse(sessionStorage.getItem("dadosUsuario"))
        };
      }
    });
  }


  public voltarPagina() {
    this.router.navigate([`/consulta-requisicao`]);
  }


}


export interface PeriodicElement {
  atendente: {
    ativo: boolean,
    cpfCnpj: string,
    email: string,
    id: number,
    nome: string,
    perfil: {
      ativo: boolean,
      descricao: string,
      id: number
    },
    senha: string
  },
  ativo: boolean,
  dataAtendimento: string,
  dataSolicitacao: string,
  id: number,
  itens: [
    {
      ativo: boolean,
      id: number,
      material: {
        ativo: boolean,
        codigo: string,
        id: number,
        modelo: {
          ativo: boolean,
          id: number,
          marca: {
            ativo: boolean,
            id: number,
            nome: string
          },
          nome: string
        },
        nome: string
      },
      quantidade: number
    }
  ],
  solicitante: {
    ativo: boolean,
    cpfCnpj: string,
    email: string,
    id: number,
    nome: string,
    perfil: {
      ativo: boolean,
      descricao: string,
      id: number
    },
    senha: string
  },
  statusRequisicao: {
    ativo: boolean,
    descricao: string,
    id: number
  }
}
