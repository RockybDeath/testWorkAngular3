import { Document } from './document';
import { Observable } from 'rxjs';
import { DocumentType } from './documentType';

export interface DialogData {
  document: Document;
  documentTypes: Observable<DocumentType[]>;
}
