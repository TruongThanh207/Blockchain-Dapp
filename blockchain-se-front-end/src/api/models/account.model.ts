import {BaseModel} from "./base.model";

export class AccountModel extends BaseModel {
  email: string;
  role: string;

  constructor(email: string, role: string) {
    super();
    this.email = email;
    this.role = role;
  }
}