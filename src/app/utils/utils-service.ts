export class UtilsService {
  public static getCopyOfObject(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}
