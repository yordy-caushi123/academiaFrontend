import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadBancariaComponent } from './entidad-bancaria.component';

describe('EntidadBancariaComponent', () => {
  let component: EntidadBancariaComponent;
  let fixture: ComponentFixture<EntidadBancariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntidadBancariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
