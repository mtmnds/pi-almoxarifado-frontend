import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '../../inventario/inventario.service';

@Component({
  selector: 'app-detalhe-inventario',
  templateUrl: './detalhe-inventario.component.html',
  styleUrls: ['./detalhe-inventario.component.scss']
})
export class DetalheInventarioComponent implements OnInit {

  public itensInventario;
  public displayedColumns: string[] = ["codigoMaterial", "nomeMaterial", "marcaMaterial", "modeloMaterial", "localEstoqueMaterial","quantidade"];
  public dataSource;
  public inventario;
  public locaisEstoque;
  public movimentacoes = {};
  public localEstoqueDestino;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private route: ActivatedRoute,
    private inventarioService: InventarioService,
    private router: Router
  ) { }


  ngOnInit(): void {
    var idInventario = Number(this.route.snapshot.paramMap.get("idInventario"));

    this.inventarioService.buscar(idInventario).subscribe(data => {
      this.inventario = data;
      this.itensInventario = this.inventario.itens;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.itensInventario);
    });
  }

  public formatarData(data: string) {
    const d = new Date(data);
    const ye = new Intl.DateTimeFormat('pt', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('pt', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('pt', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
  }

  public voltarPagina() {
    this.router.navigate([`/acompanhamento-inventario`]);
  }

}

export interface PeriodicElement {
  descricao: string,
  atendente: {
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
  id: number,
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
      quantidade: number,
      localestoque: {
        nome: string,
        descricao: string,
      }
    }
  ],
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
  statusInventario: {
    ativo: boolean,
    descricao: string,
    id: number
  }
}

