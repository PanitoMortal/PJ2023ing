import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajemodComponent } from './mensajemod.component';

describe('MensajemodComponent', () => {
  let component: MensajemodComponent;
  let fixture: ComponentFixture<MensajemodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajemodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajemodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
