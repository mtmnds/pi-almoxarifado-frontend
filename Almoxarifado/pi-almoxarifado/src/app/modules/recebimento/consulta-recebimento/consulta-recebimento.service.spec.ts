import { TestBed } from '@angular/core/testing';

import { ConsultaRecebimentoService } from './consulta-recebimento.service';

describe('ConsultaRecebimentoService', () => {
  let service: ConsultaRecebimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaRecebimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
