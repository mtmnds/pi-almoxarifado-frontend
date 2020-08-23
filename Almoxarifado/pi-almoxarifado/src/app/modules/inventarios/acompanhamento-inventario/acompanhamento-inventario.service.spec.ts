import { TestBed } from '@angular/core/testing';

import { AcompanhamentoInventarioService } from './acompanhamento-inventario.service';

describe('AcompanhamentoInventarioService', () => {
  let service: AcompanhamentoInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcompanhamentoInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
