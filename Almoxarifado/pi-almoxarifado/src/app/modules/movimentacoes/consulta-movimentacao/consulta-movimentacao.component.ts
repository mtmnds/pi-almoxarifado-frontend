import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConsultaMovimentacaoService } from './consulta-movimentacao.service';


@Component({
  selector: 'app-consulta-movimentacao',
  templateUrl: './consulta-movimentacao.component.html',
  styleUrls: ['./consulta-movimentacao.component.scss']
})
export class ConsultaMovimentacaoComponent implements OnInit {

  public movimentacoes;
  public displayedColumns: string[] = ["dataMovimentacao", "localOrigem", "localDestino", "material", "quantidade", "usuario"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder,
    private movimentacaoService: ConsultaMovimentacaoService
  ) { }


  ngOnInit(): void {
    this.listarTodos();

    window.setInterval(() =>{
      this.listarTodos();
    }, 30000);
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.movimentacoes);
    this.table.renderRows();
  }


  public filtrarPorMaterial(material: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.material.nome.toLocaleLowerCase().includes(filter) || data.material.codigo.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = material.trim().toLocaleLowerCase();
  }


  public filtrarPorLocalOrigem(local: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.localOrigem.nome.toLocaleLowerCase().toString().includes(filter);
    };

    this.dataSource.filter = local.trim().toLocaleLowerCase();
  }


  public filtrarPorLocalDestino(local: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.localDestino.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = local.trim().toLocaleLowerCase();
  }


  public filtrarPorDataMovimentacao(dataMovimentacao: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.dataMovimentacao.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = dataMovimentacao.trim().toLocaleLowerCase();
  }


  public filtrarPorQuantidade(quantidade: number) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: number) => {
      return data.quantidade == filter;
    };

    this.dataSource.filter = quantidade;
  }


  public filtrarPorUsuario(usuario: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.usuarioMovimentacao.nome.toLocaleLowerCase().includes(filter)
        || data.usuarioMovimentacao.cpfCnpj.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = usuario.trim().toLocaleLowerCase();
  }

  public exportar() {
    console.log(this.dataSource.filteredData);
  }

  public listarTodos() {
    this.movimentacaoService.listarTodos().subscribe((data: any[]) => {
      this.movimentacoes = data.filter(movimentacao => {
        if (movimentacao.ativo) {
          return movimentacao;
        }
      });

      this.dataSource = new MatTableDataSource<PeriodicElement>(this.movimentacoes);
      this.dataSource.paginator = this.paginator;
    });
  }

  public formatarData(data: string) {
    const d = new Date(data);
    const ye = new Intl.DateTimeFormat('pt', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('pt', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('pt', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
  }

}


export interface PeriodicElement {
  ativo: boolean,
  dataMovimentacao: string,
  id: number,
  localDestino: {
    ativo: boolean,
    descricao: string,
    id: number,
    nome: string
  },
  localOrigem: {
    ativo: boolean,
    descricao: string,
    id: number,
    nome: string
  },
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
  quantidade: number,
  usuarioMovimentacao: {
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
  }
}

