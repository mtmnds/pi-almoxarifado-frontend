import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  public fornecedores;
  public displayedColumns: string[] = ["cpfCnpj", "nome", "remover"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.fornecedores = [
      {
        id: "fddg-32df-g345434-hhfgdh",
        cpfCnpj: "456.456.789.15",
        nome: "Casas Bahia"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        cpfCnpj: "456.456.789.15",
        nome: "Casas Bahia"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        cpfCnpj: "456.456.789.15",
        nome: "Casas Bahia"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        cpfCnpj: "456.456.789.15",
        nome: "Casas Bahia"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        cpfCnpj: "456.456.789.15",
        nome: "Casas Bahia"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        cpfCnpj: "456.456.789.15",
        nome: "Casas Bahia"
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.fornecedores);
    this.dataSource.paginator = this.paginator;
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.fornecedores);
    this.table.renderRows();
  }

}


export interface PeriodicElement {
  id: string,
  cpfCnpj: string,
  nome: string
}
