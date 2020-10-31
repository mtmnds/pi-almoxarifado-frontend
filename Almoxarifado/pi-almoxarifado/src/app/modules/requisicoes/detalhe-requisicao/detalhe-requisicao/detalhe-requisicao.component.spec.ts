import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheRequisicaoComponent } from './detalhe-requisicao.component';

describe('DetalheRequisicaoComponent', () => {
  let component: DetalheRequisicaoComponent;
  let fixture: ComponentFixture<DetalheRequisicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheRequisicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheRequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
