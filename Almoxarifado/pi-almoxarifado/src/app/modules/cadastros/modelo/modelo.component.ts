import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss']
})
export class ModeloComponent implements OnInit {

  public modelos;
  public displayedColumns: string[] = ["descricao", "marca", "remover"];
  public dataSource;
  
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.modelos = [
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Modelo ABC",
        marca: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Modelo ABC",
        marca: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Modelo ABC",
        marca: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Modelo ABC",
        marca: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Modelo ABC",
        marca: "Marca 123"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        descricao: "Modelo ABC",
        marca: "Marca 123"
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.modelos);
    this.dataSource.paginator = this.paginator;
  }

  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.modelos);
    this.table.renderRows();
  }

}

export interface PeriodicElement {
  id: string,
  descricao: string,
  marca: string
}