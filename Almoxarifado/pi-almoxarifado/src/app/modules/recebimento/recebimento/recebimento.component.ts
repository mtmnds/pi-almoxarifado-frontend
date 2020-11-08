import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FornecedorService } from '../../cadastros/fornecedor/fornecedor.service';
import { MaterialService } from '../../cadastros/material/material.service';
import { RecebimentoService } from './recebimento.service';

@Component({
  selector: 'app-recebimento',
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.scss']
})
export class RecebimentoComponent implements OnInit {

  public materiais;
  public fornecedores;
  public displayedColumns: string[] = ["codigo", "nome", "quantidade", "remover"];
  public dataSource;
  public recebimentoForm: FormGroup;
  public incluirMaterialForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private recebimentoService: RecebimentoService,
    private materialService: MaterialService,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.recebimentoForm = this.formBuilder.group({
      numero: [null, [Validators.required]],
      serie: [null, [Validators.required]],
      fornecedor: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      usuario: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataRecebimento: [new Date(), [Validators.required]],
      ativo: [true, [Validators.required]],
      itens: [[], []]
    });

    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      quantidade: [0, [Validators.required]]
    });

    this.carregarDados();
  }

  public enviarRecebimento() {
    if (sessionStorage.getItem("dadosUsuario")) {
      var dadosUsuario = JSON.parse(sessionStorage.getItem("dadosUsuario"));
      this.recebimentoForm.get("usuario.id").setValue(Number(dadosUsuario.id));
    }
    else {
      this.recebimentoForm.get("usuario.id").setValue(1);
    }

    if (this.recebimentoForm.valid) {
      this.recebimentoService.gerar(this.recebimentoForm.value).subscribe(res => {
        this.resetForm();
      });
    }
  }

  public adicionarItemRecebimento() {
    if (this.incluirMaterialForm.valid) {
      var material = null;

      this.materiais.forEach(element => {
        if (element.id === Number(this.incluirMaterialForm.get("idMaterial").value)) {
          material = element;
        }
      });

      if (material) {
        var materialJaInserido = false;

        if (this.recebimentoForm.get("itens").value.length > 0) {
          Array.prototype.forEach.call(this.recebimentoForm.get("itens").value, element => {
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
          this.recebimentoForm.get("itens").value.push(
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

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.recebimentoForm.get("itens").value);
  }

  public resetFormIncluirMaterial() {
    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      quantidade: [0, [Validators.required]]
    });
  }

  public resetForm() {
    this.recebimentoForm = this.formBuilder.group({
      numero: [null, [Validators.required]],
      serie: [null, [Validators.required]],
      fornecedor: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      usuario: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataRecebimento: [new Date(), [Validators.required]],
      ativo: [true, [Validators.required]],
      itens: [[], []]
    });

    this.resetFormIncluirMaterial();

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.recebimentoForm.get("itens").value);
  }

  public removerItemRecebimento(id: number) {
    var arrayFiltrado = [];

    Array.prototype.forEach.call(this.recebimentoForm.get("itens").value, element => {
      if (element.material.id !== id) {
        arrayFiltrado.push(element);
      };
    })

    this.recebimentoForm.get("itens").setValue(arrayFiltrado);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.recebimentoForm.get("itens").value);
  }

  public carregarDados() {
    this.materialService.listarTodos().subscribe((data: any[]) => {
      this.materiais = data.filter(material => {
        if (material.ativo) {
          return material;
        }
      });
    });

    this.fornecedorService.listarTodos().subscribe((data: any[]) => {
      this.fornecedores = data.filter(fornecedor => {
        if (fornecedor.ativo) {
          return fornecedor;
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