import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public usuarios;
  public displayedColumns: string[] = [
    "codigo", 
    "nome", 
    "cpfCnpj", 
    "email", 
    "perfil", 
    "remover"
  ];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usuarios = [
      {
        codigo: "BruTG20",
        nome: "Bruna Taura",
        cpfCnpj: "568.456.845-25",
        email: "bruna.taura@hotmail.com",
        perfil: "admin"
      },
      {
        codigo: "BruTG20",
        nome: "Bruna Taura",
        cpfCnpj: "568.456.845-25",
        email: "bruna.taura@hotmail.com",
        perfil: "admin"
      },
      {
        codigo: "BruTG20",
        nome: "Bruna Taura",
        cpfCnpj: "568.456.845-25",
        email: "bruna.taura@hotmail.com",
        perfil: "admin"
      },
      {
        codigo: "BruTG20",
        nome: "Bruna Taura",
        cpfCnpj: "568.456.845-25",
        email: "bruna.taura@hotmail.com",
        perfil: "admin"
      },
      {
        codigo: "BruTG20",
        nome: "Bruna Taura",
        cpfCnpj: "568.456.845-25",
        email: "bruna.taura@hotmail.com",
        perfil: "admin"
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.usuarios);
    this.dataSource.paginator = this.paginator;
  }

  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.usuarios);
    this.table.renderRows();
  }

}

export interface PeriodicElement {
  codigo: string,
  nome: string,
  cpfCnpj: string,
  email: string,
  perfil: string
}