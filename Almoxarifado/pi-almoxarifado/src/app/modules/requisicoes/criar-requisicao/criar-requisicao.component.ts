import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MaterialService } from '../../cadastros/material/material.service';
import { CriarRequisicaoService } from './criar-requisicao.service';

@Component({
  selector: 'app-criar-requisicao',
  templateUrl: './criar-requisicao.component.html',
  styleUrls: ['./criar-requisicao.component.scss']
})
export class CriarRequisicaoComponent implements OnInit {

  public materiais;
  public displayedColumns: string[] = ["codigo", "nome", "quantidade", "remover"];
  public dataSource;
  public requisicaoForm: FormGroup;
  public incluirMaterialForm: FormGroup;
  
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private criarRequisicaoService: CriarRequisicaoService,
    private materialService: MaterialService
  ) { }

  ngOnInit(): void {
    this.requisicaoForm = this.formBuilder.group({
      statusRequisicao: [1, [Validators.required]],
      solicitante: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataSolicitacao: [new Date(), [Validators.required]],
      atendente: this.formBuilder.group({
        id: [null, [Validators.required]],
        nome: [null, []]
      }),
      dataAtendimento: [null, []],
      ativo: [true, [Validators.required]],
      //itens: [[], [Validators.required]]
      itens: [[], []]
    });

    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      quantidade: [0, [Validators.required]]
    });

    this.carregarDados();
    /*this.dataSource = new MatTableDataSource<PeriodicElement>(this.requisicaoForm.get("itens").value);
    this.table.renderRows();*/
  }


  /*public filtrarPorNome(nome: string) {
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
  }*/


  public removerItemRequisicao(id: number) {
    var arrayFiltrado = [];

    Array.prototype.forEach.call(this.requisicaoForm.get("itens").value, element => {
      if (element.material.id !== id) {
        arrayFiltrado.push(element);
      };
    })

    this.requisicaoForm.get("itens").setValue(arrayFiltrado);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.requisicaoForm.get("itens").value);
  }


  public enviarRequisicao() {
    console.log(this.requisicaoForm);
  }


  public adicionarItemRequisicao() {
    if (this.incluirMaterialForm.valid) {
      var material = null;

      this.materiais.forEach(element => {
        if (element.id === Number(this.incluirMaterialForm.get("idMaterial").value)) {
          material = element;
        }
      });

      if (material) {
        var materialJaInserido = false;

        if (this.requisicaoForm.get("itens").value.length > 0) {
          Array.prototype.forEach.call(this.requisicaoForm.get("itens").value, element => {
            if (element.material.id === Number(this.incluirMaterialForm.get("idMaterial").value)) {
              element.quantidade += this.incluirMaterialForm.get("quantidade").value;
              
              if (element.quantidade < 0) {
                element.quantidade = 0;
              }
              
              materialJaInserido = true;
            }
          });
        }

        if (!materialJaInserido) {
          this.requisicaoForm.get("itens").value.push(
            {
              material: material,
              quantidade: this.incluirMaterialForm.get("quantidade").value
            }
          );
        }
      }
    }

    this.resetFormIncluirMaterial();

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.requisicaoForm.get("itens").value);
  }


  public resetForm() {
    this.requisicaoForm = this.formBuilder.group({
      statusRequisicao: [1, [Validators.required]],
      solicitante: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataSolicitacao: [new Date(), [Validators.required]],
      atendente: this.formBuilder.group({
        id: [null, [Validators.required]],
        nome: [null, []]
      }),
      dataAtendimento: [null, []],
      ativo: [true, [Validators.required]],
      itens: [[], []]
    });

    this.resetFormIncluirMaterial();

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.requisicaoForm.get("itens").value);
  }


  public resetFormIncluirMaterial() {
    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      quantidade: [0, [Validators.required]]
    });
  }


  public carregarDados() {
    this.materialService.listarTodos().subscribe((data: any[]) => {
      this.materiais = data.filter(material => {
        if (material.ativo) {
          return material;
        }
      });
    });
  }


}

export interface PeriodicElement {
  material: {
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
  },
  quantidade: number
}
