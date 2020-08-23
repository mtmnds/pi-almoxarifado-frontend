import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss']
})
export class AcessoComponent implements OnInit {

  public acessos;
  public displayedColumns: string[] = ["perfil", "menu", "remover"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder
  ) { }

  
  ngOnInit(): void {
    this.acessos = [
      {
        perfil: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Admin"
        },
        menu: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Cadastro de acessos"
        }
      },
      {
        perfil: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Admin"
        },
        menu: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Cadastro de fornecedores"
        }
      },
      {
        perfil: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Admin"
        },
        menu: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Cadastro de locais de estoque"
        }
      },
      {
        perfil: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Admin"
        },
        menu: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Cadastro de marcas"
        }
      },
      {
        perfil: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Admin"
        },
        menu: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Cadastro de materiais"
        }
      },
      {
        perfil: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Admin"
        },
        menu: {
          id: "fddg-32df-g345434-hhfgdh",
          nome: "Cadastro de menus"
        }
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.acessos);
    this.dataSource.paginator = this.paginator;
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.acessos);
    this.table.renderRows();
  }

}


export interface PeriodicElement {
  perfil: {
    id: string,
    nome: string
  },
  menu: {
    id: string,
    nome: string
  }
}