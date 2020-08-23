import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

  public marcas;
  public displayedColumns: string[] = ["descricao", "remover"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.marcas = [
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Marca 123"
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.marcas);
    this.dataSource.paginator = this.paginator;
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.marcas);
    this.table.renderRows();
  }

}


export interface PeriodicElement {
  id: string,
  descricao: string
}