import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonDuLieuComponent } from './chon-du-lieu.component';

describe('ChonDuLieuComponent', () => {
  let component: ChonDuLieuComponent;
  let fixture: ComponentFixture<ChonDuLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChonDuLieuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChonDuLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
