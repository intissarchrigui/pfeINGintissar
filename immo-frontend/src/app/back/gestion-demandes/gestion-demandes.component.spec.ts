import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDemandesComponent } from './gestion-demandes.component';

describe('GestionDemandesComponent', () => {
  let component: GestionDemandesComponent;
  let fixture: ComponentFixture<GestionDemandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDemandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
