import { TestBed } from '@angular/core/testing';

import { ConsultaMovimentacaoService } from './consulta-movimentacao.service';

describe('ConsultaMovimentacaoService', () => {
  let service: ConsultaMovimentacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaMovimentacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
