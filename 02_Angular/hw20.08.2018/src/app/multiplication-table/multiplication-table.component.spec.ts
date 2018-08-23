import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicationTableComponent } from './multiplication-table.component';

describe('MultiplicationTableComponent', () => {
  let component: MultiplicationTableComponent;
  let fixture: ComponentFixture<MultiplicationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplicationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplicationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
