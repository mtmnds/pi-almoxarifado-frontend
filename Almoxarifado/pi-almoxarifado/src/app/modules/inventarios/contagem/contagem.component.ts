import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MaterialService } from '../../cadastros/material/material.service';
import { InventarioService } from '../inventario/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimentacaoService } from '../../movimentacoes/movimentacao/movimentacao.service';
import { LocalEstoqueService } from '../../cadastros/local-estoque/local-estoque.service';




@Component({
  selector: 'app-contagem',
  templateUrl: './contagem.component.html',
  styleUrls: ['./contagem.component.scss']
})
export class ContagemComponent implements OnInit {

  public materiais;
  public locaisEstoque;
  public displayedColumns: string[] = ["codigo", "nome", "quantidade","localEstoque", "remover"];
  public dataSource;
  public contagemForm: FormGroup;
  public incluirMaterialForm: FormGroup;
  public itensInventario;
  public inventario;
  public movimentacoes = {};

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private materialService: MaterialService,
    private localEstoqueService: LocalEstoqueService,
    private route: ActivatedRoute,
    private router: Router,
    private movimentacaoService: MovimentacaoService,
  ) { }

  ngOnInit(): void {
    this.contagemForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      statusInventario: [{id: 1}, [Validators.required]],
      tipoInventario: [{id: 1}, [Validators.required]],
      
      usuarioCriacao: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataInicio: [new Date(), [Validators.required]],
      ativo: [true, [Validators.required]],
      itens: [[], []]
    });

    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      quantidade: [0, [Validators.required]],
      idLocalEstoque: [null, [Validators.required]]
    });

    var idInventario = Number(this.route.snapshot.paramMap.get("idInventario"));
    this.inventarioService.buscar(idInventario).subscribe(data => {
      this.inventario = data;
      this.itensInventario = this.inventario.itens;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.itensInventario);
     
    });

    this.carregarDados();
  }

  public formatarData(data: string) {
    const d = new Date(data);
    const ye = new Intl.DateTimeFormat('pt', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('pt', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('pt', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
  }
  public removerItemContagem(id: number) {
    var arrayFiltrado = [];

    Array.prototype.forEach.call(this.contagemForm.get("itens").value, element => {
      if (element.material.id !== id) {
        arrayFiltrado.push(element);
      };
    })

    this.contagemForm.get("itens").setValue(arrayFiltrado);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.contagemForm.get("itens").value);
  }


  public enviarContagem() {
       this.contagemForm.get("id").setValue(Number(this.inventario.id));
       this.contagemForm.get("dataInicio").setValue(this.inventario.dataInicio);
       this.contagemForm.get("descricao").setValue(this.inventario.descricao);
       this.contagemForm.get("usuarioCriacao.id").setValue(Number(this.inventario.usuarioCriacao.id));
     
    if (this.contagemForm.valid) {
      this.inventarioService.alterar(this.contagemForm.value).subscribe(res => {
        this.resetForm();
      });
    }
  }


  public adicionarItemContagem() {
    if (this.incluirMaterialForm.valid) {
      var material = null;
      var localEstoque = null;

      this.materiais.forEach(element => {
        if (element.id === Number(this.incluirMaterialForm.get("idMaterial").value)) {
          material = element;
        }
      });

      this.locaisEstoque.forEach(element => {
        if (element.id === Number(this.incluirMaterialForm.get("idLocalEstoque").value)) {
          localEstoque = element;
        }
      });

      if (material) {
        var materialJaInserido = false;

        if (this.contagemForm.get("itens").value.length > 0) {
          Array.prototype.forEach.call(this.contagemForm.get("itens").value, element => {
            if (element.material.id === Number(this.incluirMaterialForm.get("idMaterial").value) &&
                element.localEstoque.id === Number(this.incluirMaterialForm.get("idLocalEstoque").value)
            ) {
              element.quantidade += this.incluirMaterialForm.get("quantidade").value;
              
              if (element.quantidade < 0) {
                element.quantidade = 0;
              }
              
              materialJaInserido = true;
            }
          });
        }

        if (!materialJaInserido) {
          this.contagemForm.get("itens").value.push(
            {
              material: material,
              quantidade: this.incluirMaterialForm.get("quantidade").value,
              localEstoque: localEstoque,
              ativo: true
            }
          );
        }
      }
    }

    this.resetFormIncluirMaterial();

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.contagemForm.get("itens").value);
  }


  public resetForm() {
    this.contagemForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      statusInventario: [{id: 1}, [Validators.required]],
      tipoInventario: [{id: 1}, [Validators.required]],
    
      usuarioCriacao: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataInicio: [new Date(), [Validators.required]],
      dataFim: [new Date(), [Validators.required]],
      ativo: [true, [Validators.required]],
      itens: [[], []]
    });

    this.resetFormIncluirMaterial();

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.contagemForm.get("itens").value);
  }


  public resetFormIncluirMaterial() {
    this.incluirMaterialForm = this.formBuilder.group({
      idMaterial: [null, [Validators.required]],
      quantidade: [0, [Validators.required]],
      idLocalEstoque: [null, [Validators.required]]
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
    this.localEstoqueService.listarTodos().subscribe((data: any[]) => {
      this.locaisEstoque = data.filter(localEstoque => {
        if (localEstoque.ativo) {
          return localEstoque;
        }
      });
    });
  }

  public voltarPagina() {
    this.router.navigate([`/acompanhamento-inventario`]);
  }

  public aprovarInventario() {
    var aprovacaoInventarioDto = {
      idInventario: this.inventario.id,
    };

    this.inventarioService.aprovar(aprovacaoInventarioDto).subscribe(dados => {
      this.router.navigate([`/acompanhamento-inventario`]);
    });

  }

  public reprovarInventario() {

    var aprovacaoInventarioDto = {
      idInventario: this.inventario.id,
    };

    this.inventarioService.reprovar(aprovacaoInventarioDto).subscribe(dados => {
      this.router.navigate([`/acompanhamento-inventario`]);
    });

  }
}

export interface PeriodicElement {
  inventario: {  
    descricao: string,
    usuarioCriacao: {
      ativo: boolean,
      cpfCnpj: string,
      email: string,
      id: number,
      nome: string,
      perfil: {
        ativo: boolean,
        descricao: string,
        id: number
      },
      senha: string
    },
    ativo: boolean,
    dataInicio: string,
    dataFim: string,
    itens: [
      {
        ativo: boolean,
        id: number,
        material: {
          ativo: boolean,
          codigo: string,
          id: number,
          modelo: {
            ativo: boolean,
            id: number,
            marca: {
              ativo: boolean,
              id: number,
              nome: string
            },
            nome: string
          },
          nome: string
        },
        quantidade: number
      }
    ],
    
    statusInventario: {
      ativo: boolean,
      descricao: string,
      id: number
    }
  };
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
  quantidade: number;
  localEstoque: {
    id: string,
    nome: string,
    descricao: string
  }
}
