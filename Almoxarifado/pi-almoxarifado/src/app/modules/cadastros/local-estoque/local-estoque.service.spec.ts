import { TestBed } from '@angular/core/testing';

import { LocalEstoqueService } from './local-estoque.service';

describe('LocalEstoqueService', () => {
  let service: LocalEstoqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalEstoqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
