import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RequisicaoService } from './requisicao.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss']
})
export class RequisicaoComponent implements OnInit {

  public requisicoes;
  public displayedColumns: string[] = ["codigo", "status", "dataRequisicao", "solicitante", "dataAtendimento", "atendente", "detalhes"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private requisicaoService: RequisicaoService
  ) { }


  ngOnInit(): void {
    this.listarTodos();

    window.setInterval(() =>{
      this.listarTodos();
    }, 30000);
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.requisicoes);
    this.table.renderRows();
  }


  public filtrarPorNumero(numero: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.id.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = numero.trim().toLocaleLowerCase();
  }


  public filtrarPorSolicitante(solicitante: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.solicitante.nome.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = solicitante.trim().toLocaleLowerCase();
  }


  public filtrarPorAtendente(atendente: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.atendente ? data.atendente.nome.toString().toLocaleLowerCase().includes(filter) : false;
    };

    this.dataSource.filter = atendente.trim().toLocaleLowerCase();
  }


  public filtrarPorDataRequisicao(dataRequisicao: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.dataSolicitacao.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = dataRequisicao.trim().toLocaleLowerCase();
  }


  public filtrarPorStatus(statusRequisicao: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      if (statusRequisicao.trim().toLocaleLowerCase() === "todos") {
        return true;
      }
      else {
        return data.statusRequisicao.descricao.toString().toLocaleLowerCase().includes(filter);
      }
    };

    this.dataSource.filter = statusRequisicao.trim().toLocaleLowerCase();
  } 


  public listarTodos() {
    this.requisicaoService.listarTodos().subscribe((data: any[]) => {
      this.requisicoes = data.filter(requisicao => {
        if (requisicao.ativo) {
          return requisicao;
        }
      });

      this.dataSource = new MatTableDataSource<PeriodicElement>(this.requisicoes);
      this.dataSource.paginator = this.paginator;
    });
  }


  public abrirDetalhe(element) {}


  public formatarData(data: string) {
    const d = new Date(data);
    const ye = new Intl.DateTimeFormat('pt', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('pt', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('pt', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
  }


}


export interface PeriodicElement {
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
  dataAtendimento: string,
  dataSolicitacao: string,
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
  statusRequisicao: {
    ativo: boolean,
    descricao: string,
    id: number
  }
}