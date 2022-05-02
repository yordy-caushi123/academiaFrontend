import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosBibliograficosComponent } from './movimientos-bibliograficos.component';

describe('PrestamosComponent', () => {
  let component: MovimientosBibliograficosComponent;
  let fixture: ComponentFixture<MovimientosBibliograficosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosBibliograficosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosBibliograficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
