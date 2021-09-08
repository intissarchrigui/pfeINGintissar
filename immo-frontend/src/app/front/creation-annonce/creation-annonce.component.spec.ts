import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationAnnonceComponent } from './creation-annonce.component';

describe('CreationAnnonceComponent', () => {
  let component: CreationAnnonceComponent;
  let fixture: ComponentFixture<CreationAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
