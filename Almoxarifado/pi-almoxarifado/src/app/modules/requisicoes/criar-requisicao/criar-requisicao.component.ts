import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MaterialService } from '../../cadastros/material/material.service';
import { RequisicaoService } from '../requisicao.service';

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
    private requisicaoService: RequisicaoService,
    private materialService: MaterialService
  ) { }

  ngOnInit(): void {
    this.requisicaoForm = this.formBuilder.group({
      statusRequisicao: [{id: 1}, [Validators.required]],
      solicitante: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataSolicitacao: [new Date(), [Validators.required]],
      ativo: [true, [Validators.required]],
      itens: [[], []]
    });

    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      quantidade: [0, [Validators.required]]
    });

    this.carregarDados();
  }


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
    if (sessionStorage.getItem("dadosUsuario")) {
      var dadosUsuario = JSON.parse(sessionStorage.getItem("dadosUsuario"));
      this.requisicaoForm.get("solicitante.id").setValue(Number(dadosUsuario.id));
    }
    else {
      this.requisicaoForm.get("solicitante.id").setValue(1);
    }

    if (this.requisicaoForm.valid) {
      this.requisicaoService.criar(this.requisicaoForm.value).subscribe(res => {
        this.resetForm();
      });
    }
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
              quantidade: this.incluirMaterialForm.get("quantidade").value,
              ativo: true
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
      statusRequisicao: [{id: 1}, [Validators.required]],
      solicitante: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataSolicitacao: [new Date(), [Validators.required]],
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
