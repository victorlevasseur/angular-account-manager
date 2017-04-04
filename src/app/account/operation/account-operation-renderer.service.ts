import {
  Injectable,
  ComponentFactory,
  ComponentFactoryResolver,
  Type
} from '@angular/core';

import { AccountOperationRenderer } from './account-operation';

@Injectable()
export class AccountOperationRendererService {

  private factories = new Map<Type<AccountOperationRenderer>, ComponentFactory<AccountOperationRenderer>>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  getFactory(renderer: Type<AccountOperationRenderer>): ComponentFactory<AccountOperationRenderer> {
    if(!this.factories.has(renderer)) {
      this.factories.set(renderer, this.componentFactoryResolver.resolveComponentFactory(renderer));
    }
    return this.factories.get(renderer);
  }
};
