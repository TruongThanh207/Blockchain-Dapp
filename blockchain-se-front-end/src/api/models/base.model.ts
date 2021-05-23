export class BaseModel {
  isActive;
  lastAccessedDate;

  constructor() {
    this.isActive = true;
    this.lastAccessedDate = new Date();
  }

}