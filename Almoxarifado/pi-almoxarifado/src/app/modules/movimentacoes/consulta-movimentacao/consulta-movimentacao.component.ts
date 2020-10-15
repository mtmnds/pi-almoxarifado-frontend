import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';


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
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.movimentacoes = [
      {
        localOrigem: "Prateleira 1",
        localDestino: "Prateleira 2",
        material: {
          codigo: "123574casd",
          nome: "Material de teste"
        },
        quantidade: 5,
        dataMovimentacao: "15/10/2020 00:52",
        usuario: {
          nome: "Matheus Mendes",
          cpfCnpj: "123456789-12"
        }
      },
      {
        localOrigem: "Prateleira 1",
        localDestino: "Prateleira 3",
        material: {
          codigo: "123574casd",
          nome: "Material de teste"
        },
        quantidade: 2,
        dataMovimentacao: "15/10/2020 00:12",
        usuario: {
          nome: "Matheus Mendes",
          cpfCnpj: "123456789-12"
        }
      },
      {
        localOrigem: "Prateleira 2",
        localDestino: "Prateleira 1",
        material: {
          codigo: "gdfg345546",
          nome: "Material de teste 2"
        },
        quantidade: 5,
        dataMovimentacao: "15/10/2020 23:12",
        usuario: {
          nome: "Bruna Taura",
          cpfCnpj: "987654321-12"
        }
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.movimentacoes);
    this.dataSource.paginator = this.paginator;
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.movimentacoes);
    this.table.renderRows();
  }


  public filtrarPorMaterial(material: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.material.nome.includes(filter) || data.material.codigo.includes(filter);
    };

    this.dataSource.filter = material.trim().toLocaleLowerCase();
  }


  public filtrarPorLocalOrigem(local: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.localOrigem.toString().includes(filter);
    };

    this.dataSource.filter = local.trim().toLocaleLowerCase();
  }


  public filtrarPorLocalDestino(local: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.localDestino.includes(filter);
    };

    this.dataSource.filter = local.trim().toLocaleLowerCase();
  }


  public filtrarPorDataMovimentacao(dataMovimentacao: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.dataMovimentacao.includes(filter);
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
      return data.usuario.nome.includes(filter) || data.usuario.cpfCnpj.includes(filter);
    };

    this.dataSource.filter = usuario.trim().toLocaleLowerCase();
  }


  public exportar() {
    console.log(this.dataSource.filteredData);
  }

}


export interface PeriodicElement {
  localOrigem: string,
  localDestino: string,
  material: {
    codigo: string,
    nome: string
  },
  quantidade: number,
  dataMovimentacao: string,
  usuario: {
    nome: string,
    cpfCnpj: string
  }
}
