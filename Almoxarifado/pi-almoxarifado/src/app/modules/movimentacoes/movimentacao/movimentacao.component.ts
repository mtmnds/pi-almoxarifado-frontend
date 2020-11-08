import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LocalEstoqueService } from '../../cadastros/local-estoque/local-estoque.service';
import { MaterialService } from '../../cadastros/material/material.service';
import { MovimentacaoService } from './movimentacao.service';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss']
})
export class MovimentacaoComponent implements OnInit {

  public materiais;
  public locaisEstoque;
  public locaisEstoqueDestino = [];
  public displayedColumns: string[] = ["localOrigem", "localDestino", "material", "quantidade", "remover"];
  public dataSource;
  public movimentacaoForm: FormGroup;
  public incluirMaterialForm: FormGroup;

  public desabilitarAdicionar: boolean;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private movimentacaoService: MovimentacaoService,
    private materialService: MaterialService,
    private localEstoqueService: LocalEstoqueService
  ) { }


  ngOnInit(): void {
    this.movimentacaoForm = this.formBuilder.group({
      dataMovimentacao: [new Date(), [Validators.required]],
      ativo: [true, [Validators.required]],
      usuarioMovimentacao: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      itens: [[], []]
    });

    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      idLocalOrigem: [null, [Validators.required]],
      idLocalDestino: [null, [Validators.required]],
      quantidade: [0, [Validators.required]]
    });

    this.desabilitarAdicionar = false;
    this.carregarDados();
  }

  public carregarDados() {
    this.materialService.listarTodos().subscribe((data: any[]) => {
      this.materiais = data.filter(material => {
        if (material.ativo) {
          return material;
        }
      });
    });

    this.localEstoqueService.listarTodos().subscribe((data: any[]) => {
      this.locaisEstoque = data.filter(localEstoque => {
        if (localEstoque.ativo && localEstoque.id !== 1 && localEstoque.id !== 3) {
          return localEstoque;
        }
      });
    });
  }

  public adicionarItemMovimentacao() {
    if (this.incluirMaterialForm.valid) {
      var material = null;
      var localOrigem = null;
      var localDestino = null;

      this.materiais.forEach(element => {
        if (element.id === Number(this.incluirMaterialForm.get("idMaterial").value)) {
          material = element;
        }
      });

      this.locaisEstoque.forEach(element => {
        if (element.id === Number(this.incluirMaterialForm.get("idLocalOrigem").value)) {
          localOrigem = element;
        }
      });

      this.locaisEstoqueDestino.forEach(element => {
        if (element.id === Number(this.incluirMaterialForm.get("idLocalDestino").value)) {
          localDestino = element;
        }
      });

      if (material && localOrigem && localDestino) {
        this.movimentacaoForm.get("itens").value.push(
          {
            material: material,
            localOrigem: localOrigem,
            localDestino: localDestino,
            quantidade: this.incluirMaterialForm.get("quantidade").value
          }
        ); 
      }

      this.resetFormIncluirMaterial();
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.movimentacaoForm.get("itens").value);
      this.desabilitarAdicionar = true;
    }
  }

  public filtrarLocaisDestino(idLocal: number) {
    this.locaisEstoqueDestino = [];
    this.locaisEstoque.forEach(localEstoque => {
      if (localEstoque.id != idLocal) {
        this.locaisEstoqueDestino.push(localEstoque);
      }   
    });
  }

  public resetFormIncluirMaterial() {
    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      idLocalOrigem: [null, [Validators.required]],
      idLocalDestino: [null, [Validators.required]],
      quantidade: [0, [Validators.required]]
    });
  }

  public removerItemMovimentacao(idMaterial: number, idLocalOrigem: number, idLocalDestino: number) {
    var arrayFiltrado = [];

    Array.prototype.forEach.call(this.movimentacaoForm.get("itens").value, element => {
      if (element.material.id !== idMaterial ||
          element.localOrigem.id !== idLocalOrigem ||
          element.localDestino.id !== idLocalDestino) {
        arrayFiltrado.push(element);
      };
    })

    this.movimentacaoForm.get("itens").setValue(arrayFiltrado);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.movimentacaoForm.get("itens").value);
    this.desabilitarAdicionar = false;
  }

  public resetForm() {
    this.movimentacaoForm = this.formBuilder.group({
      dataMovimentacao: [new Date(), [Validators.required]],
      ativo: [true, [Validators.required]],
      usuarioMovimentacao: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      itens: [[], []]
    });

    this.resetFormIncluirMaterial();

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.movimentacaoForm.get("itens").value);
    this.desabilitarAdicionar = false;
  }

  public enviarMovimentacao() {
    this.adicionarItemMovimentacao();

    if (sessionStorage.getItem("dadosUsuario")) {
      var dadosUsuario = JSON.parse(sessionStorage.getItem("dadosUsuario"));
      this.movimentacaoForm.get("usuarioMovimentacao.id").setValue(Number(dadosUsuario.id));
    }
    else {
      this.movimentacaoForm.get("usuarioMovimentacao.id").setValue(1);
    }

    if (this.movimentacaoForm.valid) {
      this.movimentacaoService.movimentarSaldo(this.montarObjeto(this.movimentacaoForm.value)).subscribe(res => {
        this.resetForm();
      });
    }
  }

  public montarObjeto(objeto: any) {
    var movimentacaoRequest = this.formBuilder.group({
      dataMovimentacao: objeto.dataMovimentacao,
      ativo: objeto.ativo,
      usuarioMovimentacao: this.formBuilder.group({
        id: objeto.usuarioMovimentacao.id
      }),
      material: objeto.itens[0].material,
      localOrigem: objeto.itens[0].localOrigem,
      localDestino: objeto.itens[0].localDestino,
      quantidade: objeto.itens[0].quantidade  
    });

    return movimentacaoRequest.value;
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
  localOrigem: {
    ativo: boolean,
    descricao: string,
    id: number,
    nome: string
  },
  localDestino: {
    ativo: boolean,
    descricao: string,
    id: number,
    nome: string
  },
  quantidade: number
}
