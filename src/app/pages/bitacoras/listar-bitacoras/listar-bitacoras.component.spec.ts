import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBitacorasComponent } from './listar-bitacoras.component';

describe('ListarBitacorasComponent', () => {
  let component: ListarBitacorasComponent;
  let fixture: ComponentFixture<ListarBitacorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBitacorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBitacorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
