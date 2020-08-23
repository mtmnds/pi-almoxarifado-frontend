import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-local-estoque',
  templateUrl: './local-estoque.component.html',
  styleUrls: ['./local-estoque.component.scss']
})
export class LocalEstoqueComponent implements OnInit {

  public locais;
  public displayedColumns: string[] = ["descricao", "remover"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.locais = [
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Prateleira 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Prateleira 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Prateleira 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Prateleira 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Prateleira 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Prateleira 123"
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.locais);
    this.dataSource.paginator = this.paginator;
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.locais);
    this.table.renderRows();
  }

}


export interface PeriodicElement {
  id: string,
  descricao: string
}