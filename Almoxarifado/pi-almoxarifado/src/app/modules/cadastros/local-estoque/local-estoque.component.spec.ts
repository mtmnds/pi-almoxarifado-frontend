import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalEstoqueComponent } from './local-estoque.component';

describe('LocalEstoqueComponent', () => {
  let component: LocalEstoqueComponent;
  let fixture: ComponentFixture<LocalEstoqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalEstoqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
