import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConsultaRecebimentoService } from './consulta-recebimento.service';


@Component({
  selector: 'app-consulta-recebimento',
  templateUrl: './consulta-recebimento.component.html',
  styleUrls: ['./consulta-recebimento.component.scss']
})
export class ConsultaRecebimentoComponent implements OnInit {

  public notasFiscaisRecebidas;
  public gridRecebimento = [];
  public displayedColumns: string[] = ["numero", "serie", "fornecedor", "dataRecebimento", "material", "quantidade"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder,
    private recebimentoService: ConsultaRecebimentoService
  ) { }


  ngOnInit(): void {
    this.listarTodos();

    window.setInterval(() => {
      this.listarTodos();
    }, 30000);


    this.dataSource = new MatTableDataSource<PeriodicElement>(this.gridRecebimento);
    this.dataSource.paginator = this.paginator;
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.gridRecebimento);
    this.table.renderRows();
  }


  public filtrarPorNumero(numero: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.numero.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = numero;
  }


  public filtrarPorSerie(serie: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.serie.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = serie;
  }


  public filtrarPorDataRecebimento(dataRecebimento: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.dataRecebimento.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = dataRecebimento.trim().toLocaleLowerCase();
  }


  public filtrarPorMaterial(material: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.item.nome.toLocaleLowerCase().includes(filter) || data.item.codigo.toString().toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = material.trim().toLocaleLowerCase();
  }


  public filtrarPorFornecedor(fornecedor: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.fornecedor.nome.toLocaleLowerCase().includes(filter) || data.fornecedor.cpfCnpj.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.filter = fornecedor.trim().toLocaleLowerCase();
  }

  public listarTodos() {
    this.recebimentoService.listarTodos().subscribe((data: any[]) => {
      this.notasFiscaisRecebidas = data.filter(notaFiscal => {
        if (notaFiscal.ativo) {

          notaFiscal.itens.forEach(element => {
            let varObjeto =
            {
              dataRecebimento: this.formatarData(notaFiscal.dataRecebimento),
              fornecedor: {
                nome: notaFiscal.fornecedor.nome,
                cpfCnpj: notaFiscal.fornecedor.cpfCnpj,
              },
              item: {
                codigo: element.material.codigo,
                nome: element.material.nome,
                quantidade: element.quantidade
              },
              numero: notaFiscal.numero,
              serie: notaFiscal.serie
            }

            this.gridRecebimento.push(varObjeto);
          });
        }
      });

      this.dataSource = new MatTableDataSource<PeriodicElement>(this.gridRecebimento);
      this.dataSource.paginator = this.paginator;
    });
  }

  public formatarData(data: string) {
    const d = new Date(data);
    const ye = new Intl.DateTimeFormat('pt', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('pt', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('pt', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
  }

}

export interface PeriodicElement {
  dataRecebimento: string,
  fornecedor: {
    nome: string,
    cpfCnpj: string,
  },
  item: {
    codigo: number,
    nome: string,
    quantidade: number
  },
  numero: number,
  serie: number
}