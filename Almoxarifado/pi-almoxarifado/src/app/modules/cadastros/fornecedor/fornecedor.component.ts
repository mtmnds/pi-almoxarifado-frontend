import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from './fornecedor.service';


@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  public fornecedores;
  public displayedColumns: string[] = ["codigo", "nome", "cpfCnpj", "endereco", "telefone", "celular", "email", "alterar", "remover"];
  public dataSource;
  public cadastroFornecedorForm: FormGroup;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService
  ) { }


  ngOnInit(): void {
    this.cadastroFornecedorForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      cpfCnpj: ["", [Validators.required]],
      endereco: ["", [Validators.required]],
      telefone: ["", []],
      celular: ["", []],
      email: ["", []],
      ativo: [true, [Validators.required]]
    });

    this.listarTodos();
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.fornecedores);
    this.table.renderRows();
  }


  public filtrarPorCodigo(codigo: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.id.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = codigo.trim().toLocaleLowerCase();
  }

  public filtrarPorNome(nome: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = nome.trim().toLocaleLowerCase();
  }

  public filtrarPorCpfCnpj(cpfCnpj: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.cpfCnpj.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = cpfCnpj.trim().toLocaleLowerCase();
  }

  public filtrarPorEndereco(endereco: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.endereco.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = endereco.trim().toLocaleLowerCase();
  }

  public filtrarPorContato(contato: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.telefone.toLocaleLowerCase().includes(filter)
        || data.celular.toLocaleLowerCase().includes(filter)
        || data.email.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = contato.trim().toLocaleLowerCase();
  }


  public cadastrarOuAlterar() {
    if (this.cadastroFornecedorForm.valid) {
      if (this.cadastroFornecedorForm.get("id").value) {
        this.fornecedorService.alterar(this.cadastroFornecedorForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
      else {
        this.fornecedorService.cadastrar(this.cadastroFornecedorForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
    }
  }


  public alterar(element) {
    this.cadastroFornecedorForm.get("id").setValue(element.id);
    this.cadastroFornecedorForm.get("nome").setValue(element.nome);
    this.cadastroFornecedorForm.get("cpfCnpj").setValue(element.cpfCnpj);
    this.cadastroFornecedorForm.get("endereco").setValue(element.endereco);
    this.cadastroFornecedorForm.get("telefone").setValue(element.telefone);
    this.cadastroFornecedorForm.get("celular").setValue(element.celular);
    this.cadastroFornecedorForm.get("email").setValue(element.email);
    this.cadastroFornecedorForm.get("ativo").setValue(element.ativo);
  }


  public desativar(id: number) {
    this.fornecedorService.desativar(id).subscribe(res => {
      this.listarTodos();
    }, err => {});
  }


  public buscar(id: number) {
    this.fornecedorService.buscar(id).subscribe(res => {}, err => {});
  }


  public listarTodos() {
    this.fornecedorService.listarTodos().subscribe((data: any[]) => {
      this.fornecedores = data.filter(fornecedor => {
        if (fornecedor.ativo) {
          return fornecedor;
        }
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.fornecedores);
      this.dataSource.paginator = this.paginator;
    });
  }


  public dismissModal() {
    document.getElementById("fecharModal").click();
  }


  public resetForm() {
    this.cadastroFornecedorForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      cpfCnpj: ["", [Validators.required]],
      endereco: ["", [Validators.required]],
      telefone: ["", []],
      celular: ["", []],
      email: ["", []],
      ativo: [true, [Validators.required]]
    });
  }


}


export interface PeriodicElement {
  id: number,
  nome: string,
  cpfCnpj: string,
  endereco: string,
  telefone: string,
  celular: string,
  email: string
}
