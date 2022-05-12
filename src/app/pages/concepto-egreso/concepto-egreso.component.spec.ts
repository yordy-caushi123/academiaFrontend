import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoEgresoComponent } from './concepto-egreso.component';

describe('ConceptoEgresoComponent', () => {
  let component: ConceptoEgresoComponent;
  let fixture: ComponentFixture<ConceptoEgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptoEgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptoEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
