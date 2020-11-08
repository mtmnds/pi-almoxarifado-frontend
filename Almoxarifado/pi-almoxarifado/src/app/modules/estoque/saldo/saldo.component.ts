import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SaldoService } from './saldo.service';


@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {

  public estoques;
  public displayedColumns: string[] = ["codigo", "nome", "marca", "modelo", "local", "quantidade"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder,
    private saldoService: SaldoService
  ) { }


  ngOnInit(): void {
    this.listarTodos();

    window.setInterval(() =>{
      this.listarTodos();
    }, 30000);
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.estoques);
    this.table.renderRows();
  }


  public filtrarPorCodigo(codigo: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.material.codigo.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = codigo.trim().toLocaleLowerCase();
  }


  public filtrarPorNome(nome: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.material.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = nome.trim().toLocaleLowerCase();
  }


  public filtrarPorQuantidade(quantidade: number) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: number) => {
      return data.quantidade == filter;
    };

    this.dataSource.filter = quantidade;
  }

  public listarTodos() {
    this.saldoService.listarTodos().subscribe((data: any[]) => {
      this.estoques = data.filter(estoque => {       
        if (estoque.ativo && estoque.localEstoque.id !== 1) {
          return estoque;
        }
      });

      this.dataSource = new MatTableDataSource<PeriodicElement>(this.estoques);
      this.dataSource.paginator = this.paginator;
    });
  }

}


export interface PeriodicElement {
  ativo: boolean,
  id: number,
  localEstoque: {
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
  quantidade: number
}
