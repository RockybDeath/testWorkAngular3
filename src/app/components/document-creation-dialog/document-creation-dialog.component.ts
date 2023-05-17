import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentType } from '../../api/models/documentType';
import { Organization } from '../../api/models/organization';
import { DocumentService } from '../../services/document.service';
import { DestroyService } from '../../services/destroy.service';
import { Observable, takeUntil } from 'rxjs';
import { DialogData } from '../../api/models/dialogData';
import { Document } from '../../api/models/document';

@Component({
  selector: 'app-document-creation-dialog',
  templateUrl: './document-creation-dialog.component.html',
  styleUrls: ['./document-creation-dialog.component.scss'],
})
export class DocumentCreationDialogComponent implements OnInit {
  public form!: FormGroup;
  public organizations!: Observable<Organization[]>;
  public documentTypes!: Observable<DocumentType[]>;
  public mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DocumentCreationDialogComponent>,
    private documentService: DocumentService,
    private destroy$: DestroyService
  ) {
    this.createForm();
    this.patchForm();
    this.documentTypes = data.documentTypes;
  }

  private createForm(): void {
    this.form = new FormGroup({
      documentType: new FormControl<DocumentType | null>(
        null,
        Validators.required
      ),
      series: new FormControl<string>(''),
      number: new FormControl<string>('', Validators.required),
      organization: new FormControl<Organization | null>(null),
      dateOfIssue: new FormControl<Date | null>(null),
      divisionCode: new FormControl<string>(''),
      isArchive: new FormControl<boolean>(false),
      isMain: new FormControl<boolean>(false),
    });
    this.setTouchedForm();
  }

  public compareDocumentType(t1: DocumentType, t2: DocumentType): boolean {
    return t1 && t2 && t1.id === t2.id;
  }

  private patchForm(): void {
    if (this.data.document) {
      this.form.patchValue(this.data.document);
    }
  }

  private setTouchedForm(): void {
    this.form.get('number')?.markAsTouched();
    this.form.get('documentType')?.markAsTouched();
  }

  public loadOrganizations(): void {
    this.organizations = this.documentService
      .getOrganizations()
      .pipe(takeUntil(this.destroy$));
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    if (
      this.form.get('number')?.valid &&
      this.form.get('documentType')?.valid
    ) {
      const result = this.form.value as Document;
      this.dialogRef.close(result);
    }
  }

  ngOnInit(): void {
    this.loadOrganizations();
  }
}
