import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesDetailsComponent } from './annonces-details.component';

describe('AnnoncesDetailsComponent', () => {
  let component: AnnoncesDetailsComponent;
  let fixture: ComponentFixture<AnnoncesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
