import { AccountOperation } from './operation/account-operation';

export class Account {
  name = "";
  operations = new Array<AccountOperation>();
}
