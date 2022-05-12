import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedenciasComponent } from './procedencias.component';

describe('ProcedenciasComponent', () => {
  let component: ProcedenciasComponent;
  let fixture: ComponentFixture<ProcedenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
