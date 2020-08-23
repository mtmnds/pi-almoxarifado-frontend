import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';


@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {

  public estoque;
  public displayedColumns: string[] = ["codigo", "nome", "marca", "modelo", "local", "quantidade"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.estoque = [
      {
        codigo: "1",
        nome: "Teste",
        marca: "Marca 1",
        modelo: "Modelo 1",
        local: "abc123",
        quantidade: 0
      },
      {
        codigo: "2",
        nome: "Teste",
        marca: "Marca 2",
        modelo: "Modelo 2",
        local: "abc123",
        quantidade: 0
      },
      {
        codigo: "3",
        nome: "Teste",
        marca: "Marca 3",
        modelo: "Modelo 3",
        local: "abc123",
        quantidade: 0
      },
      {
        codigo: "4",
        nome: "Teste",
        marca: "Marca 4",
        modelo: "Modelo 4",
        local: "abc123",
        quantidade: 0
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.estoque);
    this.dataSource.paginator = this.paginator;
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.estoque);
    this.table.renderRows();
  }

}


export interface PeriodicElement {
  codigo: string,
  nome: string,
  marca: string,
  modelo: string,
  local: string,
  quantidade: number
}
