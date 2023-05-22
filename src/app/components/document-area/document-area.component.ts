import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../api/models/document';
import { Observable, takeUntil } from 'rxjs';
import { DestroyService } from '../../services/destroy.service';
import { UtilsService } from '../../utils/utils-service';
import { DocumentType } from '../../api/models/documentType';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModesEnum } from '../../api/models/modes.enum';
import { DocumentCreationDialogComponent } from '../document-creation-dialog/document-creation-dialog.component';

@Component({
  selector: 'app-document-area',
  templateUrl: './document-area.component.html',
  styleUrls: ['./document-area.component.scss'],
})
export class DocumentAreaComponent implements OnInit {
  private originalDocuments: Document[] = [];
  public documents: Document[] = [];
  public showArchive = false;
  public documentTypes!: Observable<DocumentType[]>;
  public searchForm!: FormGroup;
  private selectedDocument: Document | null = null;
  public disableButtons = true;
  public readonly ModesEnum = ModesEnum;
  constructor(
    private documentService: DocumentService,
    private destroy$: DestroyService,
    private dialog: MatDialog
  ) {
    this.createSearchForm();
  }

  ngOnInit(): void {
    this.loadDocuments();
    this.loadDocumentsTypes();
  }

  private createSearchForm(): void {
    this.searchForm = new FormGroup({
      documentType: new FormControl<DocumentType | null>(null),
      number: new FormControl<string>(''),
    });
  }

  public search(): void {
    const filteredDocuments = this.originalDocuments.filter((document) => {
      const documentType = this.searchForm.get('documentType')?.value;
      const number = this.searchForm.get('number')?.value;
      let result = true;

      if (documentType && document.documentType.name !== documentType.name) {
        result = false;
      }

      if (
        number &&
        document.number &&
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        document.number.match(new RegExp('^' + number + '*', 'ig'))?.[0] !==
          number
      ) {
        result = false;
      }

      return result;
    });
    this.setDocumentsWithinArchive(filteredDocuments);
  }

  public clear(): void {
    this.searchForm.reset({
      documentType: null,
      number: '',
    });
    this.setDocumentsWithinArchive(this.originalDocuments);
  }

  private loadDocuments(): void {
    this.documentService
      .getDocuments()
      .pipe(takeUntil(this.destroy$))
      .subscribe((documents) => {
        this.originalDocuments = documents;
        this.search();
      });
  }

  private loadDocumentsTypes(): void {
    this.documentTypes = this.documentService
      .getTypeOfDocuments()
      .pipe(takeUntil(this.destroy$));
  }

  public changeArchiveVisibility(): void {
    this.search();
  }

  private setDocumentsWithinArchive(documents: Document[]): void {
    if (this.showArchive) {
      this.documents = UtilsService.getCopyOfObject(documents);
    } else {
      const filteredDocuments = documents.filter(
        (document) => !document.isArchive
      );
      this.documents = UtilsService.getCopyOfObject(filteredDocuments);
    }
  }

  public selectDocument(document: Document): void {
    this.selectedDocument = document;
    this.disableButtons = false;
  }

  public changeDocument(mode: ModesEnum): void {
    switch (mode) {
      case ModesEnum.CREATE:
        // eslint-disable-next-line no-case-declarations
        const dialogRefCreate = this.dialog.open(
          DocumentCreationDialogComponent,
          {
            data: {
              document: null,
              documentTypes: this.documentTypes,
            },
          }
        );
        dialogRefCreate
          .afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            if (data) {
              this.documentService
                .createDocument(data as Document)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.loadDocuments());
            }
          });
        break;
      case ModesEnum.EDIT:
        // eslint-disable-next-line no-case-declarations
        const dialogRefEdit = this.dialog.open(
          DocumentCreationDialogComponent,
          {
            data: {
              document: this.selectedDocument,
              documentTypes: this.documentTypes,
            },
          }
        );
        dialogRefEdit
          .afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            if (data) {
              this.documentService
                .updateDocument(data as Document)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.loadDocuments());
            }
          });
        break;
      case ModesEnum.DELETE:
        this.documentService
          .deleteDocument(this.selectedDocument as Document)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => this.loadDocuments());
    }
  }
}
