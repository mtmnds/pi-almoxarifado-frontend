import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-consulta-recebimento',
  templateUrl: './consulta-recebimento.component.html',
  styleUrls: ['./consulta-recebimento.component.scss']
})
export class ConsultaRecebimentoComponent implements OnInit {

  public notasFiscaisRecebidas;
  public displayedColumns: string[] = ["numero", "serie", "fornecedor", "dataRecebimento", "material", "quantidade"];
  public dataSource;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.notasFiscaisRecebidas = [
      {
        numero: 12345,
        serie: 1,
        dataRecebimento: "15/10/2020 00:31",
        fornecedor: {
          nome: "Fornecedor de teste 1",
          cpfCnpj: "123456789-12"
        },
        material:
          {
            codigo: "276534",
            nome: "Teste",
            quantidade: 3
          }
      },
      {
        numero: 46475,
        serie: 2,
        dataRecebimento: "15/10/2020 00:40",
        fornecedor: {
          nome: "Fornecedor de teste 2",
          cpfCnpj: "758468321-98"
        },
        material:
          {
            codigo: "5436455",
            nome: "Material qualquer",
            quantidade: 3
          }
      },
      {
        numero: 12345,
        serie: 1,
        dataRecebimento: "14/10/2020 00:21",
        fornecedor: {
          nome: "Fornecedor de teste 1",
          cpfCnpj: "123456789-12"
        },
        material:
          {
            codigo: "353245",
            nome: "Material",
            quantidade: 2
          }
      },
      {
        numero: 12345,
        serie: 1,
        dataRecebimento: "14/10/2020 00:31",
        fornecedor: {
          nome: "Fornecedor de teste 2",
          cpfCnpj: "123456789-12"
        },
        material:
          {
            codigo: "8989089",
            nome: "Material 123",
            quantidade: 7
          }
      },
      {
        numero: 12345,
        serie: 1,
        dataRecebimento: "14/10/2020 00:31",
        fornecedor: {
          nome: "Fornecedor de teste 3",
          cpfCnpj: "74184657-41"
        },
        material:
          {
            codigo: "13556845",
            nome: "Material abc",
            quantidade: 3
          }
      },
      {
        numero: 12345,
        serie: 1,
        dataRecebimento: "15/10/2020 00:31",
        fornecedor: {
          nome: "Fornecedor de teste 1",
          cpfCnpj: "123456789-12"
        },
        material:
          {
            codigo: "276534",
            nome: "Teste",
            quantidade: 3
          }
      },
      {
        numero: 12345,
        serie: 1,
        dataRecebimento: "15/10/2020 00:31",
        fornecedor: {
          nome: "Fornecedor de teste 1",
          cpfCnpj: "123456789-12"
        },
        material:
          {
            codigo: "276534",
            nome: "Teste",
            quantidade: 3
          }
      },
      {
        numero: 12345,
        serie: 1,
        dataRecebimento: "15/10/2020 00:31",
        fornecedor: {
          nome: "Fornecedor de teste 1",
          cpfCnpj: "123456789-12"
        },
        material:
          {
            codigo: "276534",
            nome: "Teste",
            quantidade: 3
          }
      }
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.notasFiscaisRecebidas);
    this.dataSource.paginator = this.paginator;
  }


  private renderTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.notasFiscaisRecebidas);
    this.table.renderRows();
  }


  public filtrarPorNumero(numero: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.numero.toString().includes(filter);
    };

    this.dataSource.filter = numero;
  }


  public filtrarPorSerie(serie: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.serie.toString().includes(filter);
    };

    this.dataSource.filter = serie;
  }


  public filtrarPorDataRecebimento(dataRecebimento: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.dataRecebimento.includes(filter);
    };

    this.dataSource.filter = dataRecebimento.trim().toLocaleLowerCase();
  }


  public filtrarPorMaterial(material: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.material.nome.includes(filter) || data.material.codigo.includes(filter);
    };

    this.dataSource.filter = material.trim().toLocaleLowerCase();
  }


  public filtrarPorFornecedor(fornecedor: string) {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.fornecedor.nome.includes(filter) || data.fornecedor.cpfCnpj.includes(filter);
    };

    this.dataSource.filter = fornecedor.trim().toLocaleLowerCase();
  }

}


export interface PeriodicElement {
  numero: number,
  serie: number,
  dataRecebimento: string,
  fornecedor: {
    nome: string,
    cpfCnpj: string
  },
  material: {
      codigo: string,
      nome: string,
      quantidade: number
  }
}

