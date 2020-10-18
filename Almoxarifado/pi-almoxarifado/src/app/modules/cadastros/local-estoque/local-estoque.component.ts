import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalEstoqueService } from './local-estoque.service';


@Component({
  selector: 'app-local-estoque',
  templateUrl: './local-estoque.component.html',
  styleUrls: ['./local-estoque.component.scss']
})
export class LocalEstoqueComponent implements OnInit {

  public locaisEstoque;
  public displayedColumns: string[] = ["nome", "descricao", "alterar", "remover"];
  public dataSource;
  public cadastroLocalEstoqueForm: FormGroup;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private localEstoqueService: LocalEstoqueService
  ) { }


  ngOnInit(): void {
    this.cadastroLocalEstoqueForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      descricao: ["", [Validators.required]],
      ativo: [true, [Validators.required]]
    });

    this.listarTodos();
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.locaisEstoque);
    this.table.renderRows();
  }


  /*public filtrarPorNome(nome: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = nome.trim().toLocaleLowerCase();
  }*/

  public filtrarPorDescricao(descricao: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.descricao.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = descricao.trim().toLocaleLowerCase();
  }


  public cadastrarOuAlterar() {
    if (this.cadastroLocalEstoqueForm.valid) {
      if (this.cadastroLocalEstoqueForm.get("id").value) {
        this.localEstoqueService.alterar(this.cadastroLocalEstoqueForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
      else {
        this.localEstoqueService.cadastrar(this.cadastroLocalEstoqueForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
    }
  }


  public alterar(element) {
    this.cadastroLocalEstoqueForm.get("id").setValue(element.id);
    this.cadastroLocalEstoqueForm.get("nome").setValue(element.nome);
    this.cadastroLocalEstoqueForm.get("descricao").setValue(element.descricao);
    this.cadastroLocalEstoqueForm.get("ativo").setValue(element.ativo);
  }


  public desativar(id: number) {
    this.localEstoqueService.desativar(id).subscribe(res => {
      this.listarTodos();
    }, err => {});
  }


  public buscar(id: number) {
    this.localEstoqueService.buscar(id).subscribe(res => {}, err => {});
  }


  public listarTodos() {
    this.localEstoqueService.listarTodos().subscribe((data: any[]) => {
      this.locaisEstoque = data.filter(fornecedor => {
        if (fornecedor.ativo) {
          return fornecedor;
        }
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.locaisEstoque);
      this.dataSource.paginator = this.paginator;
    });
  }


  public dismissModal() {
    document.getElementById("fecharModal").click();
  }


  public resetForm() {
    this.cadastroLocalEstoqueForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      descricao: ["", [Validators.required]],
      ativo: [true, [Validators.required]]
    });
  }


}


export interface PeriodicElement {
  id: string,
  nome: string,
  descricao: string
}