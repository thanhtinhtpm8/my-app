import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoSanhDuLieuComponent } from './so-sanh-du-lieu.component';

describe('SoSanhDuLieuComponent', () => {
  let component: SoSanhDuLieuComponent;
  let fixture: ComponentFixture<SoSanhDuLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoSanhDuLieuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoSanhDuLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
