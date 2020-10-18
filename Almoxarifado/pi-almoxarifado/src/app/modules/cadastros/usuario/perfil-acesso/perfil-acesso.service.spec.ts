import { TestBed } from '@angular/core/testing';

import { PerfilAcessoService } from './perfil-acesso.service';

describe('PerfilAcessoService', () => {
  let service: PerfilAcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilAcessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
