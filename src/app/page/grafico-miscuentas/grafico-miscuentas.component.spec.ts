import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoMiscuentasComponent } from './grafico-miscuentas.component';

describe('GraficoMiscuentasComponent', () => {
  let component: GraficoMiscuentasComponent;
  let fixture: ComponentFixture<GraficoMiscuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoMiscuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoMiscuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
