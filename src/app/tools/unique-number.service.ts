import { Injectable } from '@angular/core';

@Injectable()
export class UniqueNumberService {
  nextNumber = 0;

  constructor() {

  }

  getUniqueNumber(): number {
    var num = this.nextNumber;
    this.nextNumber++;
    return num;
  }
};
