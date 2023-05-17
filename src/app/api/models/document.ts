import { DocumentType } from './documentType';

export type Document = {
  id: number;
  documentType: DocumentType;
  series: string;
  number: string;
  dateOfIssue: Date;
  isArchive: boolean;
  isMain: boolean;
  isSelected: boolean;
  divisionCode: string;
};
