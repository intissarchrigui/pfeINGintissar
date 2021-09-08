import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationProComponent } from './reclamation-pro.component';

describe('ReclamationProComponent', () => {
  let component: ReclamationProComponent;
  let fixture: ComponentFixture<ReclamationProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
