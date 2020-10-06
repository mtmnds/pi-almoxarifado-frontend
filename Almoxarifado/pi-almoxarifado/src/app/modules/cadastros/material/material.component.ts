import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  public material;
  public displayedColumns: string[] = [
    "codigo",
    "descricao",
    "marca",
    "modelo", 
    "remover"
  ];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.material = [
      {
        id: "fddg-32df-g345434-hhfgdh",
        codigo: "XPTO123",
        descricao: "Parafuso",
        marca: "Jomarca",
        modelo: "35mm"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        codigo: "XPTO123",
        descricao: "Parafuso",
        marca: "Jomarca",
        modelo: "35mm"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        codigo: "XPTO123",
        descricao: "Parafuso",
        marca: "Jomarca",
        modelo: "35mm"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        codigo: "XPTO123",
        descricao: "Parafuso",
        marca: "Jomarca",
        modelo: "35mm"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        codigo: "XPTO123",
        descricao: "Parafuso",
        marca: "Jomarca",
        modelo: "35mm"
      },
      {
        id: "fddg-32df-g345434-hhfgdh",
        codigo: "XPTO123",
        descricao: "Parafuso",
        marca: "Jomarca",
        modelo: "35mm"
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.material);
    this.dataSource.paginator = this.paginator;
  }

  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.material);
    this.table.renderRows();
  }

}

export interface PeriodicElement {
  id: string,
  descricao: string
}