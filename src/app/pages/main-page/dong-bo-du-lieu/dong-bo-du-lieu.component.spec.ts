import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DongBoDuLieuComponent } from './dong-bo-du-lieu.component';

describe('DongBoDuLieuComponent', () => {
  let component: DongBoDuLieuComponent;
  let fixture: ComponentFixture<DongBoDuLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DongBoDuLieuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DongBoDuLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
