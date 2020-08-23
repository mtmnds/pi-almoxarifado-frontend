import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanhamentoInventarioComponent } from './acompanhamento-inventario.component';

describe('AcompanhamentoInventarioComponent', () => {
  let component: AcompanhamentoInventarioComponent;
  let fixture: ComponentFixture<AcompanhamentoInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcompanhamentoInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanhamentoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
