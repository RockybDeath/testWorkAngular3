import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreationDialogComponent } from './document-creation-dialog.component';

describe('DocumentCreationDialogComponent', () => {
  let component: DocumentCreationDialogComponent;
  let fixture: ComponentFixture<DocumentCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCreationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
