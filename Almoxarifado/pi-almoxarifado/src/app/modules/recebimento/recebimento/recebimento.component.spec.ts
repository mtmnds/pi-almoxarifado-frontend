import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecebimentoComponent } from './recebimento.component';

describe('RecebimentoComponent', () => {
  let component: RecebimentoComponent;
  let fixture: ComponentFixture<RecebimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecebimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
