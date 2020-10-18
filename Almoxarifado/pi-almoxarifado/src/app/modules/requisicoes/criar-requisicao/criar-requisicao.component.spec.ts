import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarRequisicaoComponent } from './criar-requisicao.component';

describe('CriarRequisicaoComponent', () => {
  let component: CriarRequisicaoComponent;
  let fixture: ComponentFixture<CriarRequisicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarRequisicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarRequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
