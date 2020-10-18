import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from './modelo.service';
import { MarcaService } from '../marca/marca.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss']
})
export class ModeloComponent implements OnInit {

  public modelos;
  public marcas;
  public displayedColumns: string[] = ["nome", "marca", "alterar", "remover"];
  public dataSource;
  public cadastroModeloForm: FormGroup;
  
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private modeloService: ModeloService,
    private marcaService: MarcaService
  ) { }

  ngOnInit(): void {
    this.cadastroModeloForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      marca: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      ativo: [true, [Validators.required]]
    });

    this.listarTodos();
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.modelos);
    this.table.renderRows();
  }


  public filtrarPorNome(nome: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = nome.trim().toLocaleLowerCase();
  }


  public filtrarPorMarca(marca: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.marca.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = marca.trim().toLocaleLowerCase();
  }


  public cadastrarOuAlterar() {
    if (this.cadastroModeloForm.valid) {
      if (this.cadastroModeloForm.get("id").value) {
        this.modeloService.alterar(this.cadastroModeloForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
      else {
        this.modeloService.cadastrar(this.cadastroModeloForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
    }
  }


  public alterar(element) {
    this.cadastroModeloForm.get("id").setValue(element.id);
    this.cadastroModeloForm.get("nome").setValue(element.nome);
    this.cadastroModeloForm.get("marca").get("id").setValue(element.marca.id);
    this.cadastroModeloForm.get("ativo").setValue(element.ativo);
  }


  public desativar(id: number) {
    this.modeloService.desativar(id).subscribe(res => {
      this.listarTodos();
    }, err => {});
  }


  public buscar(id: number) {
    this.modeloService.buscar(id).subscribe(res => {}, err => {});
  }


  public listarTodos() {
    this.modeloService.listarTodos().subscribe((data: any[]) => {
      this.modelos = data.filter(modelo => {
        if (modelo.ativo) {
          return modelo;
        }
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.modelos);
      this.dataSource.paginator = this.paginator;
    });
    this.carregarDados();
  }


  public dismissModal() {
    document.getElementById("fecharModal").click();
  }


  public resetForm() {
    this.cadastroModeloForm = this.formBuilder.group({
      id: [null, []],
      nome: ["", [Validators.required]],
      marca: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      ativo: [true, [Validators.required]]
    });
  }


  public carregarDados() {
    this.marcaService.listarTodos().subscribe((data: any[]) => {
      this.marcas = data.filter(marca => {
        if (marca.ativo) {
          return marca;
        }
      });
    });
  }


}

export interface PeriodicElement {
  id: string,
  nome: string,
  marca: {
    id: number,
    nome: string
  }
}