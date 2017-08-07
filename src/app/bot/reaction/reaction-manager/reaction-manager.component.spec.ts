import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionManagerComponent } from './reaction-manager.component';

describe('ReactionManagerComponent', () => {
  let component: ReactionManagerComponent;
  let fixture: ComponentFixture<ReactionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
