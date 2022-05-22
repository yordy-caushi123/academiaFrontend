import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAsistenciaComponent } from './tipo-asistencia.component';

describe('TipoAsistenciaComponent', () => {
  let component: TipoAsistenciaComponent;
  let fixture: ComponentFixture<TipoAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
