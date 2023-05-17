import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document';
import { DocumentType } from '../models/documentType';
import { Organization } from '../models/organization';

@Injectable({
  providedIn: 'root',
})
export class DocumentConnectorService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getListDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.baseUrl + '/documents');
  }

  public getTypeOfDocuments(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(this.baseUrl + '/documentTypes');
  }

  public getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.baseUrl + '/organizations');
  }

  public updateDocument(document: Document): Observable<any> {
    return this.http.put(this.baseUrl + '/update', document);
  }

  public createDocument(document: Document): Observable<any> {
    return this.http.post(this.baseUrl + '/create', document);
  }

  public deleteDocument(document: Document): Observable<any> {
    return this.http.post(this.baseUrl + '/delete', document);
  }
}
