import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeinsertComponent } from './mensajeinsert.component';

describe('MensajeinsertComponent', () => {
  let component: MensajeinsertComponent;
  let fixture: ComponentFixture<MensajeinsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeinsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
