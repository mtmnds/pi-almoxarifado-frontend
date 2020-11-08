import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AcompanhamentoInventarioService } from './acompanhamento-inventario.service';

@Component({
  selector: 'app-acompanhamento-inventario',
  templateUrl: './acompanhamento-inventario.component.html',
  styleUrls: ['./acompanhamento-inventario.component.scss']
})
export class AcompanhamentoInventarioComponent implements OnInit {

  public dataSource;
  public displayedColumns: string[] = ["descricao", "status", "usuarioCriacao", "dataInicio", "dataFim", "detalhes"];
  public inventarios;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    private acompanhamentoInventarioService: AcompanhamentoInventarioService
  ) { }

  ngOnInit(): void {
    this.listarTodos();

    window.setInterval(() =>{
      this.listarTodos();
    }, 30000);
  }

  public filtrarPorDescricao(descricao: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.descricao.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = descricao.trim().toLocaleLowerCase();
  }

  public filtrarPorDataInicio(dataInicio: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.dataInicio.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = dataInicio.trim().toLocaleLowerCase();
  }

  public filtrarPorDataFim(dataFim: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.dataFim.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = dataFim.trim().toLocaleLowerCase();
  }

  public filtrarPorStatus(statusInventario: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      if (statusInventario.trim().toLocaleLowerCase() === "todos") {
        return true;
      }
      else {
        return data.statusInventario.descricao.toString().toLocaleLowerCase().includes(filter);
      }
    };

    this.dataSource.filter = statusInventario.trim().toLocaleLowerCase();
  } 

  public formatarData(data: string) {
    const d = new Date(data);
    const ye = new Intl.DateTimeFormat('pt', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('pt', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('pt', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
  }

  public abrirDetalhe(idInventario, idStatusInventario) {
    if (Number(idStatusInventario) === 1) {
      this.router.navigate([`/contagem/${ idInventario }`]);
    }
    else {
      this.router.navigate([`/detalhe-inventario/${ idInventario }`]);
    }
  }

  public listarTodos() {
    this.acompanhamentoInventarioService.listarTodos().subscribe((data: any[]) => {
      this.inventarios = data.filter(inventario => {
          return inventario;
      });

      this.dataSource = new MatTableDataSource<PeriodicElement>(this.inventarios);
      this.dataSource.paginator = this.paginator;
    });
  }
  
}

export interface PeriodicElement {
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
  solicitante: {
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
