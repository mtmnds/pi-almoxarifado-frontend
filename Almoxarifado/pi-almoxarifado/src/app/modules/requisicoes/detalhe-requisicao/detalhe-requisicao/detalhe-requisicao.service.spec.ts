import { TestBed } from '@angular/core/testing';

import { DetalheRequisicaoService } from './detalhe-requisicao.service';

describe('DetalheRequisicaoService', () => {
  let service: DetalheRequisicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalheRequisicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
