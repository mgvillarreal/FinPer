import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaDatosComponent } from './edita-datos.component';

describe('EditaDatosComponent', () => {
  let component: EditaDatosComponent;
  let fixture: ComponentFixture<EditaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
