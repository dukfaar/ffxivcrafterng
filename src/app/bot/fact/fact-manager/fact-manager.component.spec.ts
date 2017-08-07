import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactManagerComponent } from './fact-manager.component';

describe('FactManagerComponent', () => {
  let component: FactManagerComponent;
  let fixture: ComponentFixture<FactManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
