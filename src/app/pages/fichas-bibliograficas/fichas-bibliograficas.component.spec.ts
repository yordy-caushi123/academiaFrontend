import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasBibliograficasComponent } from './fichas-bibliograficas.component';

describe('FichasBibliograficasComponent', () => {
  let component: FichasBibliograficasComponent;
  let fixture: ComponentFixture<FichasBibliograficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichasBibliograficasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichasBibliograficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
