import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsModuleComponent } from './questions-module.component';

describe('QuestionsModuleComponent', () => {
  let component: QuestionsModuleComponent;
  let fixture: ComponentFixture<QuestionsModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
