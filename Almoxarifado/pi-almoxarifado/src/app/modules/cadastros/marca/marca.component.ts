import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MarcaService } from './marca.service';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

  public marcas;
  public displayedColumns: string[] = ["nome", "alterar", "remover"];
  public dataSource;
  public cadastroMarcaForm: FormGroup;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService
  ) { }


  ngOnInit(): void {
    this.cadastroMarcaForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      ativo: [true, [Validators.required]]
    });

    this.listarTodos();
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.marcas);
    this.table.renderRows();
  }


  public filtrarPorNome(nome: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = nome.trim().toLocaleLowerCase();
  }


  public cadastrarOuAlterar() {
    if (this.cadastroMarcaForm.valid) {
      if (this.cadastroMarcaForm.get("id").value) {
        this.marcaService.alterar(this.cadastroMarcaForm.value).subscribe(res => {
          console.log("Sucesso: ", res);
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {
          console.log("Erro: ", err)
        });
      }
      else {
        this.marcaService.cadastrar(this.cadastroMarcaForm.value).subscribe(res => {
          console.log("Sucesso: ", res);
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {
          console.log("Erro: ", err)
        });
      }
    }
  }


  public alterar(element) {
    this.cadastroMarcaForm.get("id").setValue(element.id);
    this.cadastroMarcaForm.get("nome").setValue(element.nome);
    this.cadastroMarcaForm.get("ativo").setValue(element.ativo);
  }


  public desativar(id: number) {
    this.marcaService.desativar(id).subscribe(res => {
      console.log("Sucesso: ", res);
      this.listarTodos();
    }, err => {
      console.log("Erro: ", err)
    });
  }


  public buscar(id: number) {
    this.marcaService.buscar(id).subscribe(res => {
      console.log("Sucesso: ", res);
    }, err => {
      console.log("Erro: ", err)
    });
  }


  public listarTodos() {
    this.marcaService.listarTodos().subscribe((data: any[]) => {
      this.marcas = data.filter(marca => {
        if (marca.ativo) {
          return marca;
        }
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.marcas);
      this.dataSource.paginator = this.paginator;
    });
  }


  public dismissModal() {
    document.getElementById("fecharModal").click();
  }


  public resetForm() {
    this.cadastroMarcaForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      ativo: [true, [Validators.required]]
    });
  }


}


export interface PeriodicElement {
  id: string,
  nome: string,
  ativo: boolean
}