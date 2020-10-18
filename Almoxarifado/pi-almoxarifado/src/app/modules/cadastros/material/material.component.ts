import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from '../modelo/modelo.service';
import { MarcaService } from '../marca/marca.service';
import { MaterialService } from './material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  public materiais;
  public modelos;
  public modelosFiltrados = [];
  public marcas = [];
  public displayedColumns: string[] = [
    "codigo",
    "nome",
    "marca",
    "modelo",
    "alterar",
    "remover"
  ];
  public dataSource;
  public cadastroMaterialForm: FormGroup;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private modeloService: ModeloService,
    private materialService: MaterialService
  ) { }

  ngOnInit(): void {
    this.cadastroMaterialForm = this.formBuilder.group({
      id: [null, []],
      codigo: ["", [Validators.required]],
      nome: ["", [Validators.required]],
      modelo: this.formBuilder.group({
        id: [null, []],
        nome: ["", []],
        marca: this.formBuilder.group({
          id: [null, [Validators.required]]
        }),
        ativo: [null, []]
      }),
      ativo: [true, [Validators.required]]
    });

    this.listarTodos();
  }

  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.materiais);
    this.table.renderRows();
  }


  public filtrarPorCodigo(codigo: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.codigo.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = codigo.trim().toLocaleLowerCase();
  }


  public filtrarPorNome(nome: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = nome.trim().toLocaleLowerCase();
  }


  public filtrarPorMarca(marca: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.modelo.marca.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = marca.trim().toLocaleLowerCase();
  }


  public filtrarPorModelo(modelo: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.modelo.nome.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = modelo.trim().toLocaleLowerCase();
  }


  public filtrarModelos(idMarca: number) {
    this.modelosFiltrados = this.modelos.filter(modelo => {
      if (modelo.marca.id === Number(idMarca)) {
        return modelo;
      }
    });
  }


  public cadastrarOuAlterar() {
    if (this.cadastroMaterialForm.valid) {
      if (this.cadastroMaterialForm.get("id").value) {
        this.materialService.alterar(this.cadastroMaterialForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
      else {
        this.materialService.cadastrar(this.cadastroMaterialForm.value).subscribe(res => {
          this.listarTodos();
          this.resetForm();
          this.dismissModal();
        }, err => {});
      }
    }
  }


  public alterar(element) {
    this.cadastroMaterialForm.get("id").setValue(element.id);
    this.cadastroMaterialForm.get("codigo").setValue(element.codigo);
    this.cadastroMaterialForm.get("nome").setValue(element.nome);
    this.cadastroMaterialForm.get("modelo").get("marca").get("id").setValue(element.modelo.marca.id);

    this.filtrarModelos(element.modelo.marca.id);

    this.cadastroMaterialForm.get("modelo").get("id").setValue(element.modelo.id);
    this.cadastroMaterialForm.get("ativo").setValue(element.ativo);
  }


  public desativar(id: number) {
    this.materialService.desativar(id).subscribe(res => {
      this.listarTodos();
    }, err => {});
  }


  public buscar(id: number) {
    this.materialService.buscar(id).subscribe(res => {}, err => {});
  }


  public listarTodos() {
    this.materialService.listarTodos().subscribe((data: any[]) => {
      this.materiais = data.filter(material => {
        if (material.ativo) {
          return material;
        }
      });

      this.dataSource = new MatTableDataSource<PeriodicElement>(this.materiais);
      this.dataSource.paginator = this.paginator;
    });

    this.carregarDados();
  }


  public dismissModal() {
    document.getElementById("fecharModal").click();
  }


  public resetForm() {
    this.cadastroMaterialForm = this.formBuilder.group({
      id: [null, []],
      codigo: ["", [Validators.required]],
      nome: ["", [Validators.required]],
      modelo: this.formBuilder.group({
        id: [null, []],
        nome: ["", []],
        marca: this.formBuilder.group({
          id: [null, [Validators.required]]
        }),
        ativo: [true, []]
      }),
      ativo: [true, [Validators.required]]
    });
  }


  public carregarDados() {    
    this.modeloService.listarTodos().subscribe((data: any[]) => {
      this.modelos = data.filter(modelo => {
        if (modelo.ativo) {
          return modelo;
        }
      });

      data.forEach(modelo => {
        var idsMarcas = this.marcas.map(marca => {
          return marca.id;
        });

        if (!idsMarcas.includes(modelo.marca.id)) {
          this.marcas.push(modelo.marca);
        }
      });
    });
  }

}


export interface PeriodicElement {
  id: number,
  codigo: string,
  nome: string,
  modelo: {
    id: string,
    nome: string,
    marca: {
      id: number,
      nome: string
    }
  }
}