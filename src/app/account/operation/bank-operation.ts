import { AccountOperation, AccountOperationRenderer } from './account-operation';
import { BankOperationComponent } from './bank-operation.component';

export class BankOperation extends AccountOperation {
  get collected(): boolean {
    return this._collected;
  }

  set collected(val: boolean) {
    this._collected = val;
    this.setValueChanged();
  }

  get credit(): number {
    return this._credit;
  }

  set credit(val: number) {
    this._credit = val;
    this.setValueChanged();
  }

  get debit(): number {
    return this._debit;
  }

  set debit(val: number) {
    this._debit = val;
    this.setValueChanged();
  }

  constructor(private _collected: boolean, private date: Date, private type: string, private description: string, private _credit: number, private _debit: number) {
    super();
  }

  getValue(): number {
    return this.credit - this.debit;
  }

  getCollectedValue(): number {
    return this.collected ? this.getValue() : 0;
  }

  getComponentClass(): { new(...args: any[]): AccountOperationRenderer; } {
    return BankOperationComponent;
  }
}
