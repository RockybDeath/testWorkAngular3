import { Injectable } from '@angular/core';
import { DocumentConnectorService } from '../api/connectors/document-connector.service';
import { Observable } from 'rxjs';
import { Document } from '../api/models/document';
import { DocumentType } from '../api/models/documentType';
import { Organization } from '../api/models/organization';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private connector: DocumentConnectorService) {}

  public getDocuments(): Observable<Document[]> {
    return this.connector.getListDocuments();
  }

  public getTypeOfDocuments(): Observable<DocumentType[]> {
    return this.connector.getTypeOfDocuments();
  }

  public getOrganizations(): Observable<Organization[]> {
    return this.connector.getOrganizations();
  }

  public updateDocument(document: Document): Observable<any> {
    return this.connector.updateDocument(document);
  }

  public createDocument(document: Document): Observable<any> {
    return this.connector.createDocument(document);
  }

  public deleteDocument(document: Document): Observable<any> {
    return this.connector.deleteDocument(document);
  }
}
