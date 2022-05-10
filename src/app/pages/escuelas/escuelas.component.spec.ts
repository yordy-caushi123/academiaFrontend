import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelasComponent } from './escuelas.component';

describe('EscuelasComponent', () => {
  let component: EscuelasComponent;
  let fixture: ComponentFixture<EscuelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
