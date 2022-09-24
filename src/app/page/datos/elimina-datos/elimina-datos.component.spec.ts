import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaDatosComponent } from './elimina-datos.component';

describe('EliminaDatosComponent', () => {
  let component: EliminaDatosComponent;
  let fixture: ComponentFixture<EliminaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
