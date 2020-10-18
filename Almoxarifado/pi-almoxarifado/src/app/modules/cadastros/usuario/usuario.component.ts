import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { PerfilAcessoService } from './perfil-acesso/perfil-acesso.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public usuarios;
  public perfisAcesso;
  public displayedColumns: string[] = ["codigo", "nome", "cpfCnpj", "email", "perfil", "alterar", "remover"];
  public dataSource;
  public cadastroUsuarioForm: FormGroup;
  
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private perfilAcessoService: PerfilAcessoService
  ) { }

  ngOnInit(): void {
    this.cadastroUsuarioForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      cpfCnpj: ["", [Validators.required]],
      email: ["", [Validators.required]],
      senha: ["", [Validators.required]],
      perfil: this.formBuilder.group({
        id: [null, [Validators.required]],
        descricao: ["", []]
      }),
      ativo: [true, [Validators.required]]
    });

    this.listarTodos();
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.usuarios);
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

  public filtrarPorEmail(email: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.email.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = email.trim().toLocaleLowerCase();
  }

  public filtrarPorPerfil(perfil: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.perfil.descricao.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = perfil.trim().toLocaleLowerCase();
  }


  public cadastrarOuAlterar() {
    if (this.cadastroUsuarioForm.valid) {
      if (this.cadastroUsuarioForm.get("id").value) {
        this.usuarioService.alterar(this.cadastroUsuarioForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
      else {
        this.usuarioService.cadastrar(this.cadastroUsuarioForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
    }
  }


  public alterar(element) {
    this.cadastroUsuarioForm.get("id").setValue(element.id);
    this.cadastroUsuarioForm.get("nome").setValue(element.nome);
    this.cadastroUsuarioForm.get("cpfCnpj").setValue(element.cpfCnpj);
    this.cadastroUsuarioForm.get("email").setValue(element.email);
    this.cadastroUsuarioForm.get("senha").setValue(element.senha);
    this.cadastroUsuarioForm.get("perfil").get("id").setValue(element.perfil.id);
    this.cadastroUsuarioForm.get("ativo").setValue(element.ativo);
  }


  public desativar(id: number) {
    this.usuarioService.desativar(id).subscribe(res => {
      this.listarTodos();
    }, err => {});
  }


  public buscar(id: number) {
    this.usuarioService.buscar(id).subscribe(res => {}, err => {});
  }


  public listarTodos() {
    this.usuarioService.listarTodos().subscribe((data: any[]) => {
      this.usuarios = data.filter(usuario => {
        if (usuario.ativo) {
          return usuario;
        }
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.usuarios);
      this.dataSource.paginator = this.paginator;
    });
    
    this.carregarDados();
  }


  public dismissModal() {
    document.getElementById("fecharModal").click();
  }


  public resetForm() {
    this.cadastroUsuarioForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      cpfCnpj: ["", [Validators.required]],
      email: ["", [Validators.required]],
      senha: ["", [Validators.required]],
      perfil: this.formBuilder.group({
        id: [null, [Validators.required]],
        descricao: ["", []]
      }),
      ativo: [true, [Validators.required]]
    });
  }


  public carregarDados() {
    this.perfilAcessoService.listarTodos().subscribe((data: any[]) => {
      this.perfisAcesso = data.filter(perfil => {
        if (perfil.ativo) {
          return perfil;
        }
      });
    });
  }


}

export interface PeriodicElement {
  id: number,
  nome: string,
  cpfCnpj: string,
  email: string,
  senha: string,
  perfil: {
    id: number,
    descricao: string
  }
}