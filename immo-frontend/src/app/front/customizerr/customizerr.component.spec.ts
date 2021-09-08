import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizerrComponent } from './customizerr.component';

describe('CustomizerrComponent', () => {
  let component: CustomizerrComponent;
  let fixture: ComponentFixture<CustomizerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
