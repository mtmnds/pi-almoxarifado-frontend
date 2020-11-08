import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheInventarioComponent } from './detalhe-inventario.component';

describe('DetalheInventarioComponent', () => {
  let component: DetalheInventarioComponent;
  let fixture: ComponentFixture<DetalheInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
