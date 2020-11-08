import { TestBed } from '@angular/core/testing';

import { DetalheInventarioService } from './detalhe-inventario.service';

describe('DetalheInventarioService', () => {
  let service: DetalheInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalheInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
