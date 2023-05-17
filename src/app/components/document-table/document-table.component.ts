import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Document } from '../../api/models/document';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentTableComponent {
  @Input()
  public dataSource: Document[] = [];

  @Output()
  public selectedDocument: EventEmitter<Document> =
    new EventEmitter<Document>();

  public displayedColumns: string[] = [
    'isMain',
    'documentType',
    'series',
    'number',
    'dateOfIssue',
  ];

  public selectDocument(row: Document): void {
    this.unSelectAllRows();
    row.isSelected = true;
    this.selectedDocument.emit(row);
  }

  private unSelectAllRows(): void {
    this.dataSource.forEach((e) => (e.isSelected = false));
  }
}
