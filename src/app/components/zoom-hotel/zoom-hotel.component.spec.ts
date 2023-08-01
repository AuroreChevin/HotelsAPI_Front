import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomHotelComponent } from './zoom-hotel.component';

describe('ZoomHotelComponent', () => {
  let component: ZoomHotelComponent;
  let fixture: ComponentFixture<ZoomHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoomHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
