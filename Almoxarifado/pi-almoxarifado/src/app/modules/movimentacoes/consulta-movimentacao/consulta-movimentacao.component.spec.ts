import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMovimentacaoComponent } from './consulta-movimentacao.component';

describe('ConsultaMovimentacaoComponent', () => {
  let component: ConsultaMovimentacaoComponent;
  let fixture: ComponentFixture<ConsultaMovimentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaMovimentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
