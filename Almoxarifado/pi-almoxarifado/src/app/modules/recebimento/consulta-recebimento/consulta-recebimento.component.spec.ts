import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRecebimentoComponent } from './consulta-recebimento.component';

describe('ConsultaRecebimentoComponent', () => {
  let component: ConsultaRecebimentoComponent;
  let fixture: ComponentFixture<ConsultaRecebimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaRecebimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaRecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
