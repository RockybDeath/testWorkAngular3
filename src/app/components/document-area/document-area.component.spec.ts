import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAreaComponent } from './document-area.component';

describe('DocumentAreaComponent', () => {
  let component: DocumentAreaComponent;
  let fixture: ComponentFixture<DocumentAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
