import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalEstoqueService } from 'src/app/modules/cadastros/local-estoque/local-estoque.service';
import { MovimentacaoService } from 'src/app/modules/movimentacoes/movimentacao/movimentacao.service';
import { RequisicaoService } from '../../requisicao.service';

@Component({
  selector: 'app-detalhe-requisicao',
  templateUrl: './detalhe-requisicao.component.html',
  styleUrls: ['./detalhe-requisicao.component.scss']
})
export class DetalheRequisicaoComponent implements OnInit {

  public itensRequisicao;
  public displayedColumns: string[] = ["codigoMaterial", "nomeMaterial", "marcaMaterial", "modeloMaterial", "quantidade"];
  public dataSource;
  public requisicao;
  public locaisEstoque;
  public movimentacoes = {};
  public localEstoqueDestino;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private route: ActivatedRoute,
    private requisicaoService: RequisicaoService,
    private router: Router
  ) { }


  ngOnInit(): void {
    var idRequisicao = Number(this.route.snapshot.paramMap.get("idRequisicao"));

    this.requisicaoService.buscar(idRequisicao).subscribe(data => {
      this.requisicao = data;
      this.itensRequisicao = this.requisicao.itens;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.itensRequisicao);
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

