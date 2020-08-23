import { TestBed } from '@angular/core/testing';

import { CriarRequisicaoService } from './criar-requisicao.service';

describe('CriarRequisicaoService', () => {
  let service: CriarRequisicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarRequisicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
